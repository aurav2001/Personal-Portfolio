import React from 'react';
import { useScrollReveal } from '../../hooks/useAnimations';

const About = () => {
  const [ref, isVisible] = useScrollReveal();

  const skills = [
    { name: "React JS", level: 90 },
    { name: "Next JS", level: 85 },
    { name: "Node JS", level: 80 },
    { name: "Tailwind CSS", level: 95 },
    { name: "Typescript", level: 75 },
    { name: "GraphQL", level: 70 }
  ];

  const milestones = [
    {
      year: "The Beginning",
      title: "Spark of Curiosity",
      desc: "Started my journey with a deep curiosity for how the web works.",
      icon: "🌱"
    },
    {
      year: "Early Career",
      title: "Frontend Mastery",
      desc: "Focused purely on React ecosystem, mastering hooks and state.",
      icon: "⚡"
    },
    {
      year: "Mid-Level",
      title: "Full Stack Expansion",
      desc: "Ventured into backend with Node.js and Databases.",
      icon: "🚀"
    },
    {
      year: "Present",
      title: "Architecting Solutions",
      desc: "Leading teams and building scalable applications.",
      icon: "⭐"
    }
  ];

  return (
    <div id='about' className="py-20 px-6 max-w-7xl mx-auto space-y-32" ref={ref}>
      
      {/* SECTION 1: ABOUT ME (Bio & Skills) */}
      <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="mb-12 text-center">
          <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500 inline-block">
            About Me
          </h2>
          <div className="h-1 w-24 bg-primary mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-12 gap-12">
          {/* Bio Card */}
          <div className="md:col-span-7">
             <div className="glass-panel p-8 rounded-3xl relative overflow-hidden group h-full">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10 group-hover:bg-primary/20 transition-all duration-500"></div>
                <h3 className="text-2xl font-semibold mb-6 text-white flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-accent"></span>
                  Who I Am
                </h3>
                <div className="space-y-4 text-gray-300 leading-relaxed text-lg">
                  <p>
                    I am a passionate <span className="text-white font-medium">Full Stack Developer</span> with over a decade of experience crafting digital solutions. My journey began with a simple curiosity about how things work on the web.
                  </p>
                  <p>
                    I believe in clean code, user-centric design, and constantly pushing the boundaries of what's possible in the browser.
                  </p>
                </div>
                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-white/10">
                  <div className="text-center">
                    <h4 className="text-3xl font-bold text-primary">10+</h4>
                    <p className="text-xs uppercase tracking-wider text-gray-500 mt-1">Years Exp.</p>
                  </div>
                  <div className="text-center">
                    <h4 className="text-3xl font-bold text-accent">90+</h4>
                    <p className="text-xs uppercase tracking-wider text-gray-500 mt-1">Projects</p>
                  </div>
                  <div className="text-center">
                    <h4 className="text-3xl font-bold text-white">15+</h4>
                    <p className="text-xs uppercase tracking-wider text-gray-500 mt-1">Clients</p>
                  </div>
                </div>
             </div>
          </div>

          {/* Tech Arsenal */}
          <div className="md:col-span-5">
             <div className="glass-panel p-8 rounded-3xl h-full border-t border-white/10">
                <h3 className="text-2xl font-semibold mb-6 text-white flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-primary"></span>
                  Tech Arsenal
                </h3>
                <div className="flex flex-wrap gap-3">
                  {skills.map((skill, i) => (
                    <span key={i} className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm font-medium hover:bg-primary hover:border-primary transition-all duration-300 cursor-default">
                      {skill.name}
                    </span>
                  ))}
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: MY JOURNEY (Horizontal Zig-Zag) */}
      <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="mb-16 text-center">
           <h2 className="text-4xl md:text-5xl font-bold text-white inline-block relative">
            My Journey
            <span className="block h-1 w-full bg-gradient-to-r from-transparent via-primary to-transparent mt-4"></span>
          </h2>
        </div>

        {/* Horizontal Scroll Container */}
        <div className="relative overflow-x-auto pb-12 hide-scrollbar">
           <div className="min-w-[1000px] px-10 relative h-[400px] flex items-center">
              
              {/* Zig-Zag SVG Connector */}
              <svg className="absolute top-0 left-0 w-full h-full pointer-events-none" style={{ minWidth: '1000px' }}>
                <path 
                  d="M 50 200 Q 150 50 250 200 T 450 200 T 650 200 T 850 200" 
                  fill="none" 
                  stroke="url(#gradient-line)" 
                  strokeWidth="4"
                  className="blur-[2px]"
                />
                 {/* Better Path Calculation for alternating items */}
                 <path 
                  d="M 100 200 C 100 200, 200 50, 300 200 C 300 200, 400 350, 500 200 C 500 200, 600 50, 700 200 C 700 200, 800 350, 900 200"
                  fill="none" 
                  stroke="url(#gradient-line)" 
                  strokeWidth="3"
                />
                <defs>
                  <linearGradient id="gradient-line" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#a855f7" />
                    <stop offset="50%" stopColor="#ec4899" />
                    <stop offset="100%" stopColor="#a855f7" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Milestones */}
              <div className="absolute top-0 left-0 w-full h-full flex justify-between px-10">
                 {milestones.map((item, index) => {
                   // Alternate Top/Bottom positions
                   // Index 0: Center? Let's do Zig Zag: 
                   // Even = Top (flex-start), Odd = Bottom (flex-end) relative to center line
                   // Actually, let's position them absolutely based on the path logic
                   const isTop = index % 2 === 0;
                   const topPos = isTop ? "20px" : "auto";
                   const bottomPos = isTop ? "auto" : "20px";
                   const leftPos = `${100 + (index * 200)}px`; // Spacing based on path nodes

                   return (
                     <div 
                       key={index}
                       className="absolute w-64 transform -translate-x-1/2"
                       style={{ left: leftPos, top: topPos, bottom: bottomPos }}
                     >
                        <div className={`flex flex-col items-center text-center group ${isTop ? 'flex-col-reverse' : 'flex-col'}`}>
                           
                           {/* Content Box */}
                           <div className={`glass-panel p-5 rounded-xl border border-white/10 hover:border-accent/50 transition-all duration-300 w-full ${isTop ? 'mb-8' : 'mt-8'}`}>
                              <h4 className="text-xl font-bold text-white mb-1 group-hover:text-accent transition-colors">{item.title}</h4>
                              <p className="text-sm text-primary font-semibold mb-2">{item.year}</p>
                              <p className="text-xs text-gray-400 leading-relaxed">{item.desc}</p>
                           </div>

                           {/* Node Connection Point (The "Fruit") */}
                           <div className="w-4 h-4 rounded-full bg-white shadow-[0_0_15px_white] relative z-10">
                              <div className="absolute inset-0 bg-accent rounded-full animate-ping opacity-20"></div>
                           </div>

                           {/* Line to Path (Visual Connector) */}
                           <div className={`w-0.5 h-8 bg-gradient-to-b from-accent to-transparent opacity-50 ${isTop ? 'mb-0' : 'mt-0'}`}></div>
                        </div>
                     </div>
                   );
                 })}
              </div>

           </div>
        </div>
      </div>

    </div>
  );
};

export default About;