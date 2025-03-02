// Progress.jsx
import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import '../styles/Progress.css';

const Progress = () => {
  const [progressData, setProgressData] = useState([]);

  useEffect(() => {
    const fetchProgress = async () => {
      const response = await fetch('/api/progress/${userId}');
      const data = await response.json();
      setProgressData(data);
    };
    fetchProgress();
  }, []);

  return (
    <div className="progress-container">
      <h2>Growth Trajectory</h2>
      <LineChart width={600} height={300} data={progressData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="timestamp" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="score" stroke="#8884d8" />
      </LineChart>
    </div>
  );
};

export default Progress;