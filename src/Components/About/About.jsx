import React, { useEffect, useRef, useState } from 'react'
import './About.css'
import theme_pattern from '../../assets/theme_pattern.svg'
import profile_img from '../../assets/about.png'

const About = () => {
  const [isVisible, setIsVisible] = useState({
    title: false,
    image: false,
    text: false,
    skills: false,
    achievements: false
  });

  const aboutRef = useRef(null);
  const titleRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);
  const skillsRef = useRef(null);
  const achievementsRef = useRef(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.2,
      rootMargin: '0px'
    };

    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const targetName = entry.target.dataset.section;
          setIsVisible(prev => ({ ...prev, [targetName]: true }));
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
    { name: "HTML & CSS", level: 85 },
    { name: "React Js", level: 60 },
    { name: "JavaScript", level: 70 },
    { name: "Next Js", level: 50 },
    { name: "Bootstrap", level: 69 },
    { name: "JAVA", level: 80 },
    { name: "WebLogic Server", level: 95 },
    { name: "Spring Boot", level: 50 },
    { name: "Hibernate", level: 40 },
    { name: "MySQL", level: 60 }
  ];

  return (
    <div id='about' className='about' ref={aboutRef}>
      <div 
        className={`about-title ${isVisible.title ? 'fade-in-up' : ''}`}
        ref={titleRef}
        data-section="title"
      >
        <h1>About Me</h1>
        <img src={theme_pattern} alt='' />
      </div>

      <div className="about-section">
        <div 
          className={`about-left ${isVisible.image ? 'slide-in-left' : ''}`}
          ref={imageRef}
          data-section="image"
        >
          <img src={profile_img} alt='' />
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
                <p>{skill.name}</p>
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
        </div>
      </div>

      <div 
        className={`about-achievements ${isVisible.achievements ? 'achievements-visible' : ''}`}
        ref={achievementsRef}
        data-section="achievements"
      >
        <div className="about-achievement" style={{ animationDelay: '0s' }}>
          <h1>1+</h1>
          <p>YEARS OF EXPERIENCE</p>
        </div>
        <hr />

        <div className="about-achievement" style={{ animationDelay: '0.2s' }}>
          <h1>11+</h1>
          <p>PROJECTS COMPLETED</p>
        </div>
        <hr />

        <div className="about-achievement" style={{ animationDelay: '0.4s' }}>
          <h1>6+</h1>
          <p>HAPPY CLIENTS</p>
        </div>
      </div>
    </div>
  )
}

export default About