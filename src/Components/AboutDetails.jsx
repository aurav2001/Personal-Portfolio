import React, { useState, useEffect, useRef } from 'react';
import { useScrollReveal } from '../hooks/useAnimations';
import { Link } from 'react-router-dom';

// --- Components ---

const SpotlightCard = ({ children, className = "" }) => {
  const divRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    if (!divRef.current) return;
    const div = divRef.current;
    const rect = div.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden ${className}`}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(168,85,247,0.15), transparent 40%)`,
        }}
      />
      <div 
         className="pointer-events-none absolute -inset-px rounded-[inherit] opacity-0 transition duration-300"
         style={{
            opacity,
            background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255,255,255,0.2), transparent 40%)`,
         }}
      ></div>
      {children}
    </div>
  );
};

const Counter = ({ end, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.ceil(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, end, duration]);

  return <span ref={ref}>{count}</span>;
};

// --- Main Component ---

const AboutDetails = () => {
  // Use scroll reveal or just animate on mount
  const [ref, isVisible] = useScrollReveal();

  useEffect(() => {
      window.scrollTo(0, 0);
  }, []);

  const skills = [
    { name: "React JS", level: 90 },
    { name: "Next JS", level: 85 },
    { name: "Node JS", level: 80 },
    { name: "Tailwind CSS", level: 95 },
    { name: "Typescript", level: 75 },
    { name: "GraphQL", level: 70 },
    { name: "Framer Motion", level: 65 },
    { name: "PostgreSQL", level: 70 }
  ];

  const milestones = [
    {
      year: "The Beginning",
      title: "Spark of Curiosity",
      desc: "Started my journey with a deep curiosity for how the web works, experimenting with HTML & CSS.",
      icon: "🌱"
    },
    {
      year: "Early Career",
      title: "Frontend Mastery",
      desc: "Focused purely on React ecosystem, mastering hooks, state management, and component architecture.",
      icon: "⚡"
    },
    {
      year: "Mid-Level",
      title: "Full Stack Expansion",
      desc: "Ventured into backend with Node.js, Express, and Databases to build complete, scalable applications.",
      icon: "🚀"
    },
    {
      year: "Present",
      title: "Architecting Solutions",
      desc: "Leading teams and building complex systems. Passionate about clean code and performance.",
      icon: "⭐"
    }
  ];

  return (
    <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto space-y-40 relative min-h-screen" ref={ref}>
      
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -z-10"></div>
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px] -z-10"></div>

      {/* SECTION 1: ADVANCED ABOUT ME */}
      <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="mb-16 text-center relative">
          <h4 className="text-accent text-sm font-semibold tracking-widest uppercase mb-3">My Story</h4>
          <h2 className="text-5xl md:text-6xl font-bold text-white tracking-tight">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Me</span>
          </h2>
          <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* Spotlight Bio Card */}
          <div className="lg:col-span-7">
            <SpotlightCard className="h-full rounded-[2.5rem] bg-white/5 border border-white/10 p-8 md:p-10">
                
                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                   <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-2xl shadow-lg shadow-primary/20">
                     👋
                   </div>
                   <div>
                      <h3 className="text-3xl font-bold text-white leading-none">Hello, I'm Gaurav.</h3>
                      <p className="text-primary text-sm font-medium tracking-wide mt-1">CREATIVE DEVELOPER</p>
                   </div>
                </div>

                {/* Content */}
                <div className="space-y-6 text-gray-300 leading-relaxed text-lg relative z-10">
                  <p>
                    I am a passionate <span className="text-white font-semibold relative inline-block">
                        Full Stack Developer
                        <span className="absolute bottom-0 left-0 w-full h-1 bg-accent/30 -z-10"></span>
                    </span> with a knack for building immersive digital experiences. My journey is driven by a blend of technical precision and creative exploration.
                  </p>
                  <p>
                     Whether it's optimizing backend performance or crafting pixel-perfect UIs, I thrive on turning complex problems into elegant solutions.
                  </p>
                  <p>
                      I believe in the power of code to transform ideas into reality. From the early days of debugging CSS to architecting scalable cloud-native applications, my path has been one of continuous learning and evolution.
                  </p>
                </div>

                {/* Animated Stats */}
                <div className="grid grid-cols-3 gap-6 mt-10 pt-10 border-t border-white/5">
                  <div className="text-center group/stat hover:-translate-y-1 transition-transform duration-300">
                    <h4 className="text-4xl font-bold text-white mb-1"><Counter end={10} />+</h4>
                    <p className="text-xs uppercase tracking-widest text-gray-500 group-hover/stat:text-primary transition-colors">Years Exp.</p>
                  </div>
                  <div className="text-center group/stat hover:-translate-y-1 transition-transform duration-300">
                    <h4 className="text-4xl font-bold text-white mb-1"><Counter end={90} />+</h4>
                    <p className="text-xs uppercase tracking-widest text-gray-500 group-hover/stat:text-accent transition-colors">Projects</p>
                  </div>
                  <div className="text-center group/stat hover:-translate-y-1 transition-transform duration-300">
                    <h4 className="text-4xl font-bold text-white mb-1"><Counter end={15} />+</h4>
                    <p className="text-xs uppercase tracking-widest text-gray-500 group-hover/stat:text-white transition-colors">Clients</p>
                  </div>
                </div>
            </SpotlightCard>
          </div>

          {/* Tech Arsenal Grid */}
          <div className="lg:col-span-5">
             <div className="glass-panel p-8 rounded-[2.5rem] h-full relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 rounded-full blur-2xl -z-10"></div>
                
                <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                  <span className="w-1.5 h-8 bg-primary rounded-full"></span>
                  Tech Arsenal
                </h3>
                
                <div className="flex flex-wrap gap-3">
                  {skills.map((skill, i) => (
                    <div 
                      key={i} 
                      className="group relative px-5 py-2.5 bg-white/5 border border-white/5 rounded-2xl text-sm font-medium hover:bg-white/10 transition-all duration-300 overflow-hidden cursor-default"
                    >
                      <span className="relative z-10 text-gray-300 group-hover:text-white transition-colors">{skill.name}</span>
                      <div 
                        className="absolute left-0 top-0 h-full bg-gradient-to-r from-primary/20 to-accent/20 transition-all duration-500 w-0 group-hover:w-full"
                      ></div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 p-4 bg-black/20 rounded-2xl border border-white/5">
                  <p className="text-xs text-gray-400 italic">
                    "Always learning, always exploring. Currently diving deep into <span className="text-primary not-italic">AI Agents</span> and <span className="text-accent not-italic">Web3</span>."
                  </p>
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: MY JOURNEY */}
      <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="mb-20 text-center">
          <h4 className="text-accent text-sm font-semibold tracking-widest uppercase mb-3">The Path</h4>
           <h2 className="text-4xl md:text-5xl font-bold text-white inline-block">
            My Journey
          </h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            A timeline of my evolution as a developer.
          </p>
        </div>

        {/* Scroll Container */}
        <div className="relative w-full overflow-x-auto pb-16 hide-scrollbar cursor-grab active:cursor-grabbing">
           <div className="min-w-[1400px] px-20 relative h-[450px] flex items-center mx-auto">
              {/* SVG PATH */}
              <svg className="absolute top-0 left-0 w-full h-full pointer-events-none" style={{ minWidth: '1400px' }}>
                <defs>
                  <linearGradient id="gradient-line" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#a855f7" stopOpacity="0.2" />
                    <stop offset="20%" stopColor="#a855f7" />
                    <stop offset="50%" stopColor="#ec4899" />
                    <stop offset="80%" stopColor="#a855f7" />
                    <stop offset="100%" stopColor="#a855f7" stopOpacity="0.2" />
                  </linearGradient>
                </defs>
                <path 
                  d="M 50 225 C 200 50, 350 225, 400 225 S 600 400, 750 225 S 950 50, 1100 225 S 1300 400, 1350 225"
                  fill="none" 
                  stroke="#ec4899" 
                  strokeWidth="6"
                  strokeOpacity="0.3"
                  className="blur-md"
                />
                <path 
                  d="M 50 225 C 200 50, 350 225, 400 225 S 600 400, 750 225 S 950 50, 1100 225 S 1300 400, 1350 225"
                  fill="none" 
                  stroke="url(#gradient-line)" 
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
              
              {milestones.map((item, index) => {
                 const leftPos = 225 + (index * 350); 
                 const isTop = index % 2 === 0; 
                 return (
                   <div 
                     key={index}
                     className="absolute w-72 transform -translate-x-1/2"
                     style={{ 
                       left: `${leftPos}px`, 
                       top: isTop ? '15%' : 'auto', 
                       bottom: isTop ? 'auto' : '15%' 
                     }}
                   >
                      <div className={`flex flex-col items-center text-center group ${isTop ? 'flex-col-reverse' : 'flex-col'}`}>
                         <div className={`
                            glass-panel p-6 rounded-2xl border border-white/10 w-full transition-all duration-500
                            hover:border-accent/50 hover:shadow-[0_0_30px_rgba(236,72,153,0.15)] hover:-translate-y-1
                            ${isTop ? 'mb-8' : 'mt-8'}
                         `}>
                            <div className="w-10 h-10 mx-auto bg-white/5 rounded-full flex items-center justify-center text-xl mb-3 border border-white/10 group-hover:bg-accent/10 transition-colors">
                              {item.icon}
                            </div>
                            <h4 className="text-xl font-bold text-white mb-1">{item.title}</h4>
                            <p className="text-sm text-primary font-semibold mb-3">{item.year}</p>
                            <p className="text-sm text-gray-400 leading-relaxed">{item.desc}</p>
                         </div>
                         <div className="relative z-10">
                            <div className="w-4 h-4 rounded-full bg-dark-bg border-2 border-accent shadow-[0_0_15px_#ec4899] relative z-10 group-hover:scale-125 transition-transform duration-300"></div>
                            <div className="absolute inset-0 bg-accent rounded-full animate-ping opacity-50"></div>
                         </div>
                         <div className={`w-0.5 h-12 bg-gradient-to-b from-accent/50 to-transparent ${isTop ? 'mb-0 bg-gradient-to-t' : 'mt-0'}`}></div>
                      </div>
                   </div>
                 );
               })}
           </div>
        </div>
      </div>
      
      {/* Back Link */}
      <div className="text-center mt-12">
        <Link to="/" className="text-gray-400 hover:text-white underline decoration-primary underline-offset-4 transition-colors">
            ← Back to Home
        </Link>
      </div>

    </div>
  );
};

export default AboutDetails;