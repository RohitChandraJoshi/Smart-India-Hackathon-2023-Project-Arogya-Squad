
import React, { useState, useEffect } from 'react';
import { compareTwoStrings } from 'string-similarity';
import axios from 'axios';
import Modal from 'react-modal';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import './App.css'; 
import Sidebar from "G:/Projects/SIH 2023/SIH1341_16581_Arogya_Squad/SIH1341_16581_Arogya_Squad/client/src/Components/Dashboard/Home/Sidebar.js"

function App() {
  const [fetchedTopic, setFetchedTopic] = useState('');
  const [enteredTopic, setEnteredTopic] = useState('');
  const [selectedGuide, setSelectedGuide] = useState('');
  const [similarity, setSimilarity] = useState(null);
  const [similarTopics, setSimilarTopics] = useState([]);
  const [topicSubmitted, setTopicSubmitted] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:3000/get-random-topic')
      .then((response) => {
        setFetchedTopic(response.data.topic);
        setTopicSubmitted(false);
      })
      .catch((error) => {
        console.error('Error fetching topic from the server:', error);
      });
  }, []);

  const handleCompare = () => {
    axios.get('http://localhost:3000/get-topics')
      .then((response) => {
        const existingTopics = response.data.topics;
        let highestSimilarity = 0;
        let similarTopicsList = [];

        for (const existingTopic of existingTopics) {
          const similarityValue = compareTwoStrings(enteredTopic, existingTopic.topic);

          if (similarityValue > highestSimilarity) {
            highestSimilarity = similarityValue;
            similarTopicsList = [existingTopic.topic];
          } else if (similarityValue === highestSimilarity) {
            similarTopicsList.push(existingTopic.topic);
          }
        }

        const similarityPercentage = highestSimilarity * 100;
        setSimilarity(similarityPercentage);

        if (similarityPercentage >= 70) {
          setTopicSubmitted(false);
          setSimilarTopics(similarTopicsList);
          setModalIsOpen(true);
        } else {
          axios.post('http://localhost:3000/submit-topic', { topic: enteredTopic, guide: selectedGuide })
            .then((response) => {
              if (response.data.success) {
                console.log('Topic added to the database');
                setSimilarity(null);
                setSimilarTopics([]);
                setTopicSubmitted(true);
              } else {
                console.error('Failed to add topic:', response.data.message);
                setSimilarity(null);
                setSimilarTopics([]);
                setTopicSubmitted(false);
              }
            })
            .catch((error) => {
              console.error('Error adding topic:', error);
              setSimilarity(null);
              setSimilarTopics([]);
              setTopicSubmitted(false);
            });
        }
      })
      .catch((error) => {
        console.error('Error fetching existing topics:', error);
      });
  };

  return (
    <div className="container">
      <Sidebar />
      <h3 className="display-4">Submit your Unique Topic</h3>
      <div className="form-group">
        <label htmlFor="topicInput">Enter Topic:</label>
        <input
          type="text"
          className="form-control"
          id="topicInput"
          value={enteredTopic}
          onChange={(e) => setEnteredTopic(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="guideSelect">Select Guide:</label>
        <select
          className="form-control"
          id="guideSelect"
          value={selectedGuide}
          onChange={(e) => setSelectedGuide(e.target.value)}
        >
          <option value="" disabled>Select a Guide</option>
          <option value="Dr Sandeep Kumar">Dr Sandeep Kumar</option>
          <option value="Dr Vishal Jain">Dr Vishal Jain</option>
          <option value="Ms Akanksha">Ms Akanksha</option>
          <option value="Ms Kanika">Ms Kanika</option>
          <option value="Ms Preeti Dubey">Ms Preeti Dubey</option>
        </select>
      </div>
      <button className="btn btn-primary" onClick={handleCompare}>
        Compare
      </button>
      {similarity !== null && (
        <div>
          <p>Similarity: {similarity.toFixed(2)}%</p>
        </div>
      )}
      {topicSubmitted && (
        <div>
          <p>Topic submitted successfully!</p>
        </div>
      )}
      
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
      >
        <h2>Topic similarity is too high!</h2>
        {similarity !== null && (
          <div>
            <p>Similarity: {similarity.toFixed(2)}%</p>
          </div>
        )}
        <p>Please choose a different topic.</p>
        <p>Similar Topics:</p>
        <ul>
          {similarTopics.map((topic, index) => (
            <li key={index}>{topic}</li>
          ))}
        </ul>
        <button className="btn btn-secondary" onClick={() => setModalIsOpen(false)}>
          Close
        </button>
      </Modal>
    </div>
  );
}

export default App;
