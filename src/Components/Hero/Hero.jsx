import React from 'react';
import './Hero.css';
import profile_img from '../../assets/profile_img.png';
import resume from '../../assets/resume.pdf';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import { useScrollReveal } from '../../hooks/useAnimations';

const Hero = () => {
  // Use custom animation hook
  const [ref, isVisible] = useScrollReveal();

  return (
    <div id='home' className='hero' ref={ref}>
      <div className={`hero-content ${isVisible ? 'fade-in-up' : 'opacity-0'}`}>
        <h1><span>I'm Gaurav Pandey</span>,<br />Full Stack Developer.</h1>
        <p>Building high-performance web applications with modern architecture and premium user experiences. Based in India.</p>
        
        <div className='hero-action'>
          <AnchorLink className='hero-connect' offset={100} href='#contact'>
            Let's Talk
          </AnchorLink>
          <a href={resume} download className='hero-resume'>
            Resume
          </a>
        </div>
      </div>
      
      <div className={`hero-visual ${isVisible ? 'fade-in-up' : 'opacity-0'}`} style={{ transitionDelay: '0.2s' }}>
        <img src={profile_img} alt="Gaurav Pandey" />
      </div>
    </div>
  );
};

export default Hero;