import React, { useRef } from 'react';
import { useScrollReveal } from '../../hooks/useAnimations';
import { Link } from 'react-router-dom';
import GalaxySkills from './GalaxySkills';

const About = () => {
  const [ref, isVisible] = useScrollReveal();

  const milestones = [
    { year: "The Beginning", title: "Started Coding", desc: "Curiosity led to HTML & CSS.", icon: "🌱" },
    { year: "Mid Journey", title: "Frontend Mastery", desc: "React, Next.js & UI/UX.", icon: "⚡" },
    { year: "Advanced", title: "Full Stack", desc: "Node.js, Databases, Architect.", icon: "🚀" },
    { year: "Present", title: "Innovating", desc: "Web3, AI & Agents.", icon: "⭐" }
  ];

  return (
    <div id='about' className="py-24 px-6 max-w-7xl mx-auto" ref={ref}>
      
      {/* Section Header */}
      <div className={`mb-16 text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
         <h4 className="text-accent text-sm font-semibold tracking-widest uppercase mb-3">Introduction</h4>
         <h2 className="text-4xl md:text-5xl font-bold text-white inline-block relative">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Me</span>
            <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-primary to-transparent"></span>
         </h2>
      </div>

      {/* Summary Content */}
      <div className={`grid md:grid-cols-2 gap-12 items-center transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
         
         <div className="space-y-6">
            <h3 className="text-3xl font-bold text-white leading-tight">
               Hello, I'm <span className="text-primary">Gaurav</span>. <br />
               Creative Developer & Tech Enthusiast.
            </h3>
            <p className="text-gray-400 text-lg leading-relaxed">
               I am a passionate Full Stack Developer with over a decade of experience crafting immersive digital experiences. My journey is driven by a blend of technical precision and creative exploration.
            </p>
            <p className="text-gray-400 text-lg leading-relaxed">
               I believe in clean code, user-centric design, and constantly pushing the boundaries of what's possible in the browser.
            </p>
            
            <div className="pt-4">
               <Link 
                 to="/about" 
                 className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-white/5 border border-white/10 text-white font-semibold hover:bg-primary hover:border-primary transition-all duration-300 group"
               >
                 Read More
                 <span className="group-hover:translate-x-1 transition-transform">→</span>
               </Link>
            </div>
         </div>

         <div className="grid grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-sm text-center hover:-translate-y-1 transition-transform duration-300">
               <h4 className="text-4xl font-bold text-accent mb-2">10+</h4>
               <p className="text-sm text-gray-400 uppercase tracking-widest">Years Exp.</p>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-sm text-center hover:-translate-y-1 transition-transform duration-300">
               <h4 className="text-4xl font-bold text-primary mb-2">90+</h4>
               <p className="text-sm text-gray-400 uppercase tracking-widest">Projects</p>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-sm text-center hover:-translate-y-1 transition-transform duration-300 col-span-2">
               <h4 className="text-4xl font-bold text-white mb-2">15+</h4>
               <p className="text-sm text-gray-400 uppercase tracking-widest">Happy Clients</p>
            </div>
         </div>
      </div>

      {/* SECTION 1.5: GALAXY SKILLS */}
      <div className={`mt-20 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
         <GalaxySkills />
      </div>

      {/* SECTION 2: MY JOURNEY (Responsive) */}
      <div className={`mt-32 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="mb-20 text-center">
            <h4 className="text-accent text-sm font-semibold tracking-widest uppercase mb-3">Milestones</h4>
            <h2 className="text-4xl md:text-5xl font-bold text-white inline-block">
            My Journey
            </h2>
            {/* Scroll Hint Removed from here */}
        </div>

        {/* --- JOURNEY (Horizontal Zig-Zag for ALL Screens) --- */}
        <div className="relative w-full overflow-x-auto pb-16 hide-scrollbar cursor-grab active:cursor-grabbing">
           {/* Increased min-width to ensure the curve looks good even on mobile scroll */}
           <div className="min-w-[1400px] px-20 relative h-[450px] flex items-center mx-auto">
              
              <svg className="absolute top-0 left-0 w-full h-full pointer-events-none" style={{ minWidth: '1400px' }}>
                <defs>
                  <linearGradient id="journey-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#a855f7" stopOpacity="0.2" />
                    <stop offset="50%" stopColor="#ec4899" />
                    <stop offset="100%" stopColor="#a855f7" stopOpacity="0.2" />
                  </linearGradient>
                </defs>
                 
                <path 
                  d="M 50 225 C 200 50, 350 225, 400 225 S 600 400, 750 225 S 950 50, 1100 225 S 1300 400, 1350 225"
                  fill="none" 
                  stroke="#ec4899" 
                  strokeWidth="8"
                  strokeOpacity="0.1"
                  className="blur-md"
                />
                
                {/* Animated Dash Path */}
                <path 
                  d="M 50 225 C 200 50, 350 225, 400 225 S 600 400, 750 225 S 950 50, 1100 225 S 1300 400, 1350 225"
                  fill="none" 
                  stroke="url(#journey-gradient)" 
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray="20 10"
                  className="animate-dash" // Custom animation check index.css
                />
              </svg>
              
              {milestones.map((item, index) => {
                 const leftPos = 225 + (index * 350); 
                 const isTop = index % 2 === 0;
                 return (
                   <div 
                     key={index}
                     className="absolute w-64 transform -translate-x-1/2"
                     style={{ 
                       left: `${leftPos}px`, 
                       top: isTop ? '15%' : 'auto', 
                       bottom: isTop ? 'auto' : '15%' 
                     }}
                   >
                      <div className={`flex flex-col items-center text-center group ${isTop ? 'flex-col-reverse' : 'flex-col'}`}>
                         
                         {/* Card */}
                         <div className={`
                            glass-panel p-5 rounded-2xl border border-white/10 w-full transition-all duration-500
                            hover:border-accent/80 hover:bg-white/15 hover:shadow-[0_0_30px_rgba(236,72,153,0.3)] 
                            hover:-translate-y-3 relative z-20 group-hover:scale-105
                            ${isTop ? 'mb-8' : 'mt-8'}
                         `}>
                             <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                             <div className="w-12 h-12 mx-auto bg-black/40 rounded-full flex items-center justify-center text-2xl mb-4 border border-white/10 group-hover:bg-accent/20 group-hover:scale-110 transition-all duration-300 shadow-lg">
                               {item.icon}
                             </div>
                             <h4 className="text-xl font-bold text-white mb-1 group-hover:text-accent transition-colors">{item.title}</h4>
                             <p className="text-xs text-primary font-bold tracking-wider mb-2 uppercase">{item.year}</p>
                             <p className="text-sm text-gray-400 leading-relaxed font-light">{item.desc}</p>
                         </div>

                         {/* Connector */}
                         <div className="relative z-10">
                            <div className="w-5 h-5 rounded-full bg-dark-bg border-4 border-accent shadow-[0_0_20px_#ec4899] relative z-10 group-hover:scale-150 transition-transform duration-300"></div>
                            <div className="absolute inset-0 bg-accent rounded-full animate-ping opacity-75"></div>
                         </div>
                         <div className={`w-0.5 h-12 bg-gradient-to-b from-accent/50 to-transparent ${isTop ? 'mb-0 bg-gradient-to-t' : 'mt-0'}`}></div>
                      </div>
                   </div>
                 );
               })}
           </div>
        </div>

        {/* Swipe Right Hint for Mobile - Below Zigzag */}
        <div className="md:hidden mt-8 flex flex-col items-center justify-center gap-3 text-gray-300">
           <div className="flex items-center gap-2 animate-pulse">
             <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="animate-[slide-right_1.5s_ease-in-out_infinite]">
               <line x1="5" y1="12" x2="19" y2="12"></line>
               <polyline points="12 5 19 12 12 19"></polyline>
             </svg>
             <span className="text-base font-semibold tracking-wide">Swipe Right to Explore</span>
             <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="animate-[slide-right_1.5s_ease-in-out_infinite_0.2s]">
               <line x1="5" y1="12" x2="19" y2="12"></line>
               <polyline points="12 5 19 12 12 19"></polyline>
             </svg>
           </div>
        </div>

      </div>

    </div>
  );
};

export default About;