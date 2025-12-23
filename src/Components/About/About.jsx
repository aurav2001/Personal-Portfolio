import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './About.css';
import theme_pattern from '../../assets/theme_pattern.svg';
import profile_img from '../../assets/about.png';

const About = () => {
  const [isVisible, setIsVisible] = useState({
    title: false,
    image: false,
    text: false,
    skills: false,
    achievements: false,
  });

  const aboutRef = useRef(null);
  const titleRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);
  const skillsRef = useRef(null);
  const achievementsRef = useRef(null);

  const [counters, setCounters] = useState({
    experience: 0,
    projects: 0,
    clients: 0,
  });

  useEffect(() => {
    const observerOptions = {
      threshold: 0.2,
      rootMargin: '0px',
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const targetName = entry.target.dataset.section;
          setIsVisible((prev) => ({ ...prev, [targetName]: true }));

          if (targetName === 'achievements') {
            const animateCounter = (key, target, duration) => {
              let start = 0;
              const increment = target / (duration / 16);
              const timer = setInterval(() => {
                start += increment;
                if (start >= target) {
                  start = target;
                  clearInterval(timer);
                }
                setCounters((prev) => ({ ...prev, [key]: Math.floor(start) }));
              }, 16);
            };

            animateCounter('experience', 1, 1000);
            animateCounter('projects', 11, 1000);
            animateCounter('clients', 6, 1000);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    if (titleRef.current) observer.observe(titleRef.current);
    if (imageRef.current) observer.observe(imageRef.current);
    if (textRef.current) observer.observe(textRef.current);
    if (skillsRef.current) observer.observe(skillsRef.current);
    if (achievementsRef.current) observer.observe(achievementsRef.current);

    return () => observer.disconnect();
  }, []);

  const skills = [
    { 
      name: 'HTML & CSS', 
      level: 85, 
      description: 'Expert in crafting responsive layouts and styling with modern CSS techniques.' 
    },
    { 
      name: 'React Js', 
      level: 60, 
      description: 'Proficient in building dynamic SPAs with React and state management.' 
    },
    { 
      name: 'JavaScript', 
      level: 70, 
      description: 'Skilled in ES6+ features and asynchronous programming.' 
    },
    { 
      name: 'Next Js', 
      level: 50, 
      description: 'Experienced with server-side rendering and static site generation.' 
    },
    { 
      name: 'Node.js', 
      level: 65, 
      description: 'Building scalable backend applications and RESTful APIs.' 
    },
    { 
      name: 'JAVA', 
      level: 80, 
      description: 'Strong expertise in object-oriented programming and Java ecosystems.' 
    },
    { 
      name: 'WebLogic Server', 
      level: 95, 
      description: 'Advanced skills in deploying and managing applications on WebLogic.' 
    },
    { 
      name: 'Spring Boot', 
      level: 50, 
      description: 'Familiar with building microservices and RESTful APIs.' 
    },
    { 
      name: 'Hibernate', 
      level: 40, 
      description: 'Knowledgeable in ORM and database connectivity.' 
    },
    { 
      name: 'MySQL', 
      level: 60, 
      description: 'Proficient in designing and querying relational databases.' 
    },
  ];

  return (
    <div id="about" className="about" ref={aboutRef}>
      <div
        className={`about-title ${isVisible.title ? 'fade-in-up' : ''}`}
        ref={titleRef}
        data-section="title"
      >
        <h1>About Me</h1>
        <img src={theme_pattern} alt="" />
      </div>

      <div className="about-section">
        <div
          className={`about-left ${isVisible.image ? 'slide-in-left' : ''}`}
          ref={imageRef}
          data-section="image"
        >
          <img src={profile_img} alt="" />
        </div>

        <div className="about-right">
          <div
            className={`about-para ${isVisible.text ? 'fade-in-right' : ''}`}
            ref={textRef}
            data-section="text"
          >
            <p>I'm a passionate Java Full Stack Developer with a strong focus on building scalable web applications using modern technologies.</p>
            <p>As a Full Stack Java Developer, I work with both frontend and backend technologies to create complete end-to-end solutions.</p>
            <p>I specialize in developing robust applications using Java, Spring Boot, React, and MySQL.</p>
            <p>I have hands-on experience in RESTful APIs, database integration, and responsive UI design. My goal is to deliver efficient, maintainable, and user-friendly software solutions.</p>
          </div>

          <div
            className={`about-skills ${isVisible.skills ? 'skills-visible' : ''}`}
            ref={skillsRef}
            data-section="skills"
          >
            {skills.map((skill, index) => (
              <div
                key={index}
                className="about-skill"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <p className="skill-name" data-tooltip={skill.description}>
                  {skill.name}
                </p>
                <div className="skill-bar-container">
                  <div
                    className="skill-bar-fill"
                    style={{ '--skill-width': `${skill.level}%` }}
                  >
                    <span className="skill-percentage">{skill.level}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="about-button">
            <Link to="/about-details" className="learn-more-button">
              Learn More
            </Link>
          </div>
        </div>
      </div>

      <div
        className={`about-achievements ${isVisible.achievements ? 'achievements-visible' : ''}`}
        ref={achievementsRef}
        data-section="achievements"
      >
        <div className="about-achievement" style={{ animationDelay: '0s' }}>
          <h1>{counters.experience}+</h1>
          <p>YEARS OF EXPERIENCE</p>
        </div>
        <hr />

        <div className="about-achievement" style={{ animationDelay: '0.2s' }}>
          <h1>{counters.projects}+</h1>
          <p>PROJECTS COMPLETED</p>
        </div>
        <hr />

        <div className="about-achievement" style={{ animationDelay: '0.4s' }}>
          <h1>{counters.clients}+</h1>
          <p>HAPPY CLIENTS</p>
        </div>
      </div>
    </div>
  );
};

export default About;