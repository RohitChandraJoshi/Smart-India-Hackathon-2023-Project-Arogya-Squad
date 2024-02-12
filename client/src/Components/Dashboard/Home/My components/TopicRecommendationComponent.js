// TopicRecommendationComponent.js

import React, { useState } from 'react';
import './TopicRecommendationComponent.css';

const TopicRecommendationComponent = () => {
  const [interests, setInterests] = useState('');
  const [recommendations, setRecommendations] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateRecommendations = (e) => {
    e.preventDefault();

    // Implement your topic recommendation logic here
    // For example, you might send the user's interests to your server
    setIsGenerating(true);

    // Simulating a recommendation generation delay (replace with your actual logic)
    setTimeout(() => {
      // Reset the loading state after the recommendations are generated (or failed)
      setIsGenerating(false);

      // Mock recommendations (replace with your actual recommendations)
      setRecommendations(['Web Development', 'Machine Learning', 'Data Science']);
    }, 2000);
  };

  return (
    <div className="topic-recommendation">
      <h2>Topic Recommendation</h2>
      <form onSubmit={handleGenerateRecommendations}>
        <label>
          Interests:
          <input
            type="text"
            value={interests}
            onChange={(e) => setInterests(e.target.value)}
            placeholder="Enter your interests, separated by commas"
            required
          />
        </label>
        <button type="submit" disabled={isGenerating}>
          {isGenerating ? 'Generating...' : 'Generate Recommendations'}
        </button>
      </form>
      {recommendations.length > 0 && (
        <div className="recommendations">
          <h3>Recommended Topics:</h3>
          <ul>
            {recommendations.map((topic, index) => (
              <li key={index}>{topic}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TopicRecommendationComponent;
