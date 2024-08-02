import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [jobs, setJobs] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await axios.get('http://localhost:5000/jobs');
      setJobs(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddJob = async () => {
    try {
      const response = await axios.post('http://localhost:5000/jobs', { title, description });
      setJobs([...jobs, response.data]);
      setTitle('');
      setDescription('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <h1>Job Portal</h1>
      <div className="form">
        <input
          type="text"
          placeholder="Job Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Job Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <button onClick={handleAddJob}>Add Job</button>
      </div>
      <div className="jobs-list">
        <h2>Available Jobs</h2>
        <ul>
          {jobs.map(job => (
            <li key={job.id}>
              <h3>{job.title}</h3>
              <p>{job.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
