import React from 'react';
import './Hero.css';
import profile_img from '../../assets/profile_img.png';
import resume from '../../assets/resume.pdf'; // Import your resume file
import AnchorLink from 'react-anchor-link-smooth-scroll';

const Hero = () => {
  return (
    <div id='home' className='hero'>
      <img src={profile_img} alt="" />
      <h1><span>I'm Gaurav Pandey</span>, Full Stack developer in India.</h1>
      <p>I am a Full Stack Developer from Ducate.</p>
      <div className='hero-action'>
        <div className="hero-connect">
          <AnchorLink className='anchor-link' offset={50} href='#contact'>Connect with me</AnchorLink>
        </div>
        <div className="hero-resume">
          <a href={resume} download className='anchor-link'>My Resume</a>
        </div>
      </div>
    </div>
  );
};

export default Hero;