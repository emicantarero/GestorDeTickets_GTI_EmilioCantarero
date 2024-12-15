import React, { useState } from 'react';
import axios from 'axios';

const CreateIssueForm = () => {
  const [formData, setFormData] = useState({
    projectId: '',
    subject: '',
    description: '',
    trackerId: '',
    statusId: '',
    priorityId: '',
  });

  const [responseMessage, setResponseMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      issue: {
        project_id: formData.projectId,
        subject: formData.subject,
        description: formData.description,
        tracker_id: parseInt(formData.trackerId),
        status_id: parseInt(formData.statusId),
        priority_id: parseInt(formData.priorityId),
      },
    };

    try {
      const response = await axios.post('http://localhost:5000/issues', payload, {
        headers: { 'Content-Type': 'application/json' },
      });

      setResponseMessage(`Issue creado con ID: ${response.data.issue.id}`);
    } catch (error) {
      setResponseMessage(
        `Error: ${error.response?.data?.error || error.message}`
      );
    }
  };

  return (
    <div>
      <h1>Crear un Issue</h1>
      <form onSubmit={handleSubmit}>
        <label>ID del Proyecto:</label>
        <input
          type="text"
          name="projectId"
          value={formData.projectId}
          onChange={handleChange}
          required
        />

        <label>Asunto:</label>
        <input
          type="text"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          required
        />

        <label>Descripción:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        ></textarea>

        <label>ID del Tracker:</label>
        <input
          type="number"
          name="trackerId"
          value={formData.trackerId}
          onChange={handleChange}
          required
        />

        <label>ID del Status:</label>
        <input
          type="number"
          name="statusId"
          value={formData.statusId}
          onChange={handleChange}
          required
        />

        <label>ID de la Prioridad:</label>
        <input
          type="number"
          name="priorityId"
          value={formData.priorityId}
          onChange={handleChange}
          required
        />

        <button type="submit">Crear Issue</button>
      </form>
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
};

export default CreateIssueForm;
