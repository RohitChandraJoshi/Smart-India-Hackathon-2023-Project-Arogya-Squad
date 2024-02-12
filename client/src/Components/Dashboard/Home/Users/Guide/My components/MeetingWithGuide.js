// MeetingWithGuide.js

import React, { useState } from 'react';
import './MeetingWithGuide.css';

const MeetingWithGuide = () => {
  const [meetingDate, setMeetingDate] = useState('');
  const [meetingTime, setMeetingTime] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleMeetingSubmit = (e) => {
    e.preventDefault();

    // Implement your meeting submission logic here
    // For example, you might send a meeting request to your server
    setIsSubmitting(true);

    // Simulating a submission delay (replace with your actual submission logic)
    setTimeout(() => {
      // Reset the loading state after the submission is complete (or failed)
      setIsSubmitting(false);
      // Clear the form fields
      setMeetingDate('');
      setMeetingTime('');
    }, 2000);
  };

  return (
    <div className="meeting-with-guide">
      <h2>Schedule a Meeting with Your Guide</h2>
      <form onSubmit={handleMeetingSubmit}>
        <label>
          Date:
          <input
            type="date"
            value={meetingDate}
            onChange={(e) => setMeetingDate(e.target.value)}
            required
          />
        </label>
        <label>
          Time:
          <input
            type="time"
            value={meetingTime}
            onChange={(e) => setMeetingTime(e.target.value)}
            required
          />
        </label>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit Request'}
        </button>
      </form>
    </div>
  );
};

export default MeetingWithGuide;
