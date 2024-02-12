// SubmitProjectRepo.js

import React, { useState } from 'react';
import './SubmitProjectRepo.css';

const SubmitProjectRepo = () => {
  const [repoLink, setRepoLink] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRepoSubmit = (e) => {
    e.preventDefault();

    // Implement your project submission logic here
    // For example, you might send the repository link to your server
    setIsSubmitting(true);

    // Simulating a submission delay (replace with your actual submission logic)
    setTimeout(() => {
      // Reset the loading state after the submission is complete (or failed)
      setIsSubmitting(false);
      // Clear the form field
      setRepoLink('');
    }, 2000);
  };

  return (
    <div className="submit-project-repo">
      <h2>Submit Your Project Repository</h2>
      <form onSubmit={handleRepoSubmit}>
        <label>
          Repository Link:
          <input
            type="text"
            value={repoLink}
            onChange={(e) => setRepoLink(e.target.value)}
            placeholder="https://github.com/your-username/your-repo"
            required
          />
        </label>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit Project'}
        </button>
      </form>
    </div>
  );
};

export default SubmitProjectRepo;
