import React from 'react';
import { Link } from 'react-router-dom';
import './AboutDetails.css';
// import profile_img from '../assets/profile_img.png';// Replace with your profile image
import profile_img from '../assets/about.png';// Replace with your profile image




const AboutDetails = () => {
  return (
    <div className="about-details">
      <div className="about-details-content">
        <div className="profile-section">
          <img src={profile_img} alt="Profile" className="profile-image" />
          <h1 className="animate-title">More About Me</h1>
        </div>
        <div className="bio-section">
          <p className="animate-text">
            Hi, I'm [Your Name], a passionate [your profession, e.g., web developer, designer, or entrepreneur] dedicated to creating impactful and innovative solutions. With a background in [your field, e.g., computer science, design], I specialize in crafting user-friendly experiences that blend creativity with functionality.
          </p>
          <p className="animate-text">
            My journey began [e.g., "with a curiosity for coding at a young age"], and over the years, I’ve honed my skills in [list skills, e.g., React, UI/UX design, project management]. I thrive on challenges and love turning ideas into reality, whether it’s building responsive websites or designing intuitive interfaces.
          </p>
          <p className="animate-text">
            When I’m not [e.g., coding], you can find me [personal interest, e.g., exploring new technologies, hiking]. I believe in lifelong learning and am excited to take on projects that push my boundaries.
          </p>
        </div>
        <div className="skills-section">
          <h2 className="animate-title">My Skills</h2>
          <ul className="skills-list">
            <li className="skill-item animate-text">Front-End</li>
            <li className="skill-item animate-text">Back-End</li>
            <li className="skill-item animate-text">Responsive Web Development</li>
            <li className="skill-item animate-text">Project Management</li>
          </ul>
        </div>
        <div className="about-details-buttons">
          <Link to="/#contact" className="connect-button">Connect with Me</Link>
          <Link to="/" className="back-button">Back to Home</Link>
        </div>
      </div>
    </div>
  );
};

export default AboutDetails;