import React, { useState } from 'react';
import axios from 'axios';

const ListIssues = () => {
  const [projectId, setProjectId] = useState('');
  const [issues, setIssues] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const handleListIssues = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(`http://localhost:5000/issues?project_id=${projectId}`);
      setIssues(response.data.issues || []);
      setErrorMessage('');
    } catch (error) {
      setIssues([]);
      setErrorMessage(
        `Error: ${error.response?.data?.error || error.message}`
      );
    }
  };

  return (
    <div>
      <h1>Listar Issues por Proyecto</h1>
      <form onSubmit={handleListIssues}>
        <label>ID del Proyecto:</label>
        <input
          type="text"
          value={projectId}
          onChange={(e) => setProjectId(e.target.value)}
          required
        />
        <button type="submit">Listar Issues</button>
      </form>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <ul>
        {issues.map((issue) => (
          <li key={issue.id}>
            ID: {issue.id}, Asunto: {issue.subject}, Status: {issue.status.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListIssues;
