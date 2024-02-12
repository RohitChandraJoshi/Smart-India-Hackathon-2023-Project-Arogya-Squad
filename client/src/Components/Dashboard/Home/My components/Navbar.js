import React from 'react';
import { Link } from 'react-router-dom'; // If using React Router
// import './Navbar.css';
const Navbar = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/track-progress">Track Progress</Link></li>
        <li><Link to="/result">Result</Link></li>
        <li><Link to="/topic-recommendation">Topic Recommendation</Link></li>
        <li><Link to="/submit-project">Submit Your Project</Link></li>
        <li><Link to="/connect-with-guide">Connect with Your Guide</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
