import React from 'react';
import { Link } from 'react-router-dom';
import './AboutDetails.css';
import profile_img from '../assets/about.png';

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
            Hi, I'm Gaurav Pandey, a passionate Full Stack Developer dedicated to creating impactful and innovative solutions. With a background in Computer Science Engineering, I specialize in crafting user-friendly experiences that blend creativity with functionality.
          </p>
          <p className="animate-text">
            My journey began with a curiosity for coding at a young age, and over the years, I’ve honed my skills in React JS, Next JS, JavaScript, SpringBoot, Hibernate, WeblogicServer. I thrive on challenges and love turning ideas into reality, whether it’s building responsive websites or designing intuitive interfaces.
          </p>
          <p className="animate-text">
            When I’m not coding, you can find me exploring new technology like IoT. I believe in lifelong learning and am excited to take on projects that push my boundaries.
          </p>
        </div>
        <div className="skills-section">
          <h2 className="animate-title">My Skills</h2>
          <ul className="skills-list">
            <li className="skill-item animate-text">Front-End</li>
            <li className="skill-item animate-text">Back-End</li>
            <li className="skill-item animate-text">Mysql</li>
            <li className="skill-item animate-text">Responsive Web Development</li>
            <li className="skill-item animate-text">Project Management</li>
          </ul>
        </div>
        <div className="about-details-buttons">
          <a href="https://www.linkedin.com/in/gaurav-pandey-7090a8319" className="connect-button" target="_blank" rel="noopener noreferrer">Connect with Me</a>
          <Link to="/" className="back-button">Back to Home</Link>
        </div>
      </div>
    </div>
  );
};

export default AboutDetails;