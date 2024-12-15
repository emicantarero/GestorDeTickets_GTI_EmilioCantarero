import React from 'react';
import CreateIssueForm from './components/CreateIssueForm';
import ListIssues from './components/ListIssues';

const App = () => {
  return (
    <div className="App">
      <CreateIssueForm />
      <hr />
      <ListIssues />
    </div>
  );
};

export default App;
