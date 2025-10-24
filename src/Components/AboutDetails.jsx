import React from 'react';
import { Link } from 'react-router-dom';
import './AboutDetails.css';

const AboutDetails = () => {
  return (
    <div className="about-details">
        
      <h1>More About Me</h1>
      <p>This is the detailed About page. Add more content here!</p>
      <Link to="/" className="back-button">Back to Home</Link>
    </div>
  );
};

export default AboutDetails;