import React, { useState } from 'react';
import { compareTwoStrings } from 'string-similarity';
import axios from 'axios';
import Modal from 'react-modal';
import styles from  'G:/Projects/SIH 2023/SIH1341_16581_Arogya_Squad/SIH1341_16581_Arogya_Squad/client/src/css/topic.module.css';
import Sidebar from "G:/Projects/SIH 2023/SIH1341_16581_Arogya_Squad/SIH1341_16581_Arogya_Squad/client/src/Components/Dashboard/Home/Sidebar.js"
function Topic() {
  const [enteredTopic, setEnteredTopic] = useState('');
  const [selectedGuide, setSelectedGuide] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState('');
  const [similarity, setSimilarity] = useState(null);
  const [similarTopics, setSimilarTopics] = useState([]);
  const [topicSubmitted, setTopicSubmitted] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleCompare = () => {
    axios
      .get(`https://sih-topic-duplicacy-checker.onrender.com/get-google-scholar-results?topic=${encodeURIComponent(enteredTopic)}`)
      .then((response) => {
        const googleScholarResults = response.data.results;

        const existingTopics = googleScholarResults.map((result) => result.title);
        const links = googleScholarResults.map((result) => result.link);
        let highestSimilarity = 0;
        let similarTopicsList = [];

        for (let i = 0; i < existingTopics.length; i++) {
          const existingTopic = existingTopics[i];
          const similarityValue = compareTwoStrings(enteredTopic, existingTopic);

          if (similarityValue >= 0.6) {
            similarTopicsList.push({ topic: existingTopic, link: links[i] });
          }

          if (similarityValue > highestSimilarity) {
            highestSimilarity = similarityValue;
          }
        }

        const similarityPercentage = highestSimilarity * 100;
        setSimilarity(similarityPercentage);

        if (similarTopicsList.length > 0) {
          setTopicSubmitted(false);
          setSimilarTopics(similarTopicsList);
          setModalIsOpen(true);
        } else {
          axios
            .post('https://sih-topic-duplicacy-checker.onrender.com/submit-topic', {
              topic: enteredTopic,
              guide: selectedGuide,
              specialization: selectedSpecialization,
            })
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
        console.error('Error fetching Google Scholar results:', error);
      });
  };

  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.backgroundBox}>
        <h2 className={styles.header}>Topic Duplicacy Checker</h2>
        <h3 className={styles.subheader}>Check Plagiarism in Your Research Topic</h3>
      </div>
      
      <div className={styles.appContainer}>
        <h3 className={styles.appHeader}>Submit your Unique Topic</h3>
        <div className={styles.formGroup}>
          <label htmlFor="topicInput" className={styles.formLabel}>Enter Topic:</label>
          <input
            type="text"
            className={styles.formControl}
            id="topicInput"
            value={enteredTopic}
            onChange={(e) => setEnteredTopic(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="guideSelect" style={{fontSize:'17px'}}>Select Guide:</label>
          <select
            className={styles.formControl}
            id="guideSelect"
            value={selectedGuide}
            onChange={(e) => setSelectedGuide(e.target.value)}
          >
            <option value="" disabled>Select a Guide</option>
            <option value="Dr Mohit Agrawal">Dr Mohit Agrawal</option>
            <option value="Dr Sandeep Kumar">Dr Sandeep Kumar</option>
            <option value="Dr Vishal Jain">Dr Vishal Jain</option>
            <option value="Dr Anil Kumar">Dr Anil Kumar</option>
            <option value="Ms Rani Astya">Ms Rani Astya</option>
            <option value="Ms Kanika">Ms Kanika</option>
            <option value="Ms Preeti Dubey">Ms Preeti Dubey</option>
          </select>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="specializationSelect" className={styles.formLabel}>Select Specialization:</label>
          <select
            className={styles.formControl}
            id="specializationSelect"
            value={selectedSpecialization}
            onChange={(e) => setSelectedSpecialization(e.target.value)}
          >
            <option value="" disabled>Select a Specialization</option>
            <option value="Biophysics">Biophysics</option>
            <option value="Community Medicine">Community Medicine</option>
            <option value="Dental Surgery">Dental Surgery</option>
            <option value="Emergency Medicine">Emergency Medicine</option>
          </select>
        </div>
        <div className={styles.compareBtnContainer}>
          <button className={styles.compareBtn} onClick={handleCompare}>Submit</button>
        </div>
        {similarity !== null && (
          <div>
            <p className={styles.resultText}>Similarity: {similarity.toFixed(2)}%</p>
          </div>
        )}
        {topicSubmitted && (
          <div>
            <p className={styles.resultText} style={{ color: 'green' }}>Similarity is less than 60%, Topic submitted successfully!</p>
          </div>
        )}
        <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} className={styles.customModal} overlayClassName={styles.customOverlay}>
          <h2 className={styles.modalHeader}>😟 Topic similarity is too high! </h2>
          {similarity !== null && (
            <div>
              <p className={styles.resultText} style={{ color: 'red' }}>Similarity: {similarity.toFixed(2)}%</p>
            </div>
          )}
          <p className={styles.modalText}>Following are the similar topics, you can follow the links and get detailed information about articles.</p>
          <ul className={styles.modalList}>
            {similarTopics.map((item, index) => (
              <li key={index}>
                <p>Topic: {item.topic}</p>
                <p>
                  Link: <a href={item.link} target="_blank" rel="noopener noreferrer">{item.link}</a>
                </p>
              </li>
            ))}
          </ul>
          <p className={styles.modalText}>
            Explore more topics on Google Scholar:{' '}
            <a href={`https://scholar.google.com/scholar?q=${enteredTopic}`} target="_blank" rel="noopener noreferrer">
              Go to Google Scholar
            </a>
          </p>
          <div className={styles.compareBtnContainer}>
            <button className={styles.closeBtn} onClick={() => setModalIsOpen(false)}>Close</button>
          </div>
        </Modal>
      </div>
    </div>
  );
  
}

export default Topic;