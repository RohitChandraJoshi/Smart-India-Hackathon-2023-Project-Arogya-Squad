// LeaderboardComponent.js

import React, { useState } from 'react';
import './LeaderboardComponent.css';

const LeaderboardComponent = () => {
  const [leaderboardData, setLeaderboardData] = useState([
    { id: 1, name: 'John Doe', score: 95, submissionTime: '2023-04-15 10:30 AM', projectLink: 'https://github.com/johndoe/project' },
    { id: 2, name: 'Jane Smith', score: 89, submissionTime: '2023-04-15 11:45 AM', projectLink: 'https://github.com/janesmith/project' },
    // Add more data as needed
  ]);

  return (
    <div className="leaderboard">
      <h2>Leaderboard</h2>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Score</th>
            <th>Submission Time</th>
            <th>Project Link</th>
          </tr>
        </thead>
        <tbody>
          {leaderboardData.map((student, index) => (
            <tr key={student.id}>
              <td>{index + 1}</td>
              <td>{student.name}</td>
              <td>{student.score}</td>
              <td>{student.submissionTime}</td>
              <td>
                <a href={student.projectLink} target="_blank" rel="noopener noreferrer">
                  <button>
                  View Project
                  </button>
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeaderboardComponent;
