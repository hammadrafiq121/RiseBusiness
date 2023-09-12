import React, { useState, useEffect } from "react";
import axios from "axios";

const LogViewer = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    axios.get('/api/logs')
      .then(response => {
        setLogs(response.data);
      })
      .catch(error => {
        console.error('Error fetching logs:', error);
      });
  }, []);

  return (
    <div>
      <h1>Logged User Actions</h1>
      <ul>
        {logs.map((log, index) => (
          <li key={index}>
            {log.actionType} by {log.userId} at {log.timestamp}
          </li>
        ))}
      </ul>
    </div>
  );
}


export default LogViewer;
