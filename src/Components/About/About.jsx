import React, { useRef } from 'react';
import { useScrollReveal } from '../../hooks/useAnimations';
import { Link } from 'react-router-dom';

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

      {/* SECTION 2: MY JOURNEY (Zig-Zag Enhanced) */}
      <div className={`mt-32 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="mb-20 text-center">
            <h4 className="text-accent text-sm font-semibold tracking-widest uppercase mb-3">Milestones</h4>
            <h2 className="text-4xl md:text-5xl font-bold text-white inline-block">
            My Journey
            </h2>
        </div>

        {/* Scroll Container */}
        {/* Scroll Container */}
        <div className="grid md:grid-cols-4 gap-6">
           {milestones.map((item, index) => (
             <div 
               key={index}
               className="group relative p-8 rounded-3xl bg-white/5 border border-white/5 hover:border-accent/50 hover:bg-white/10 transition-all duration-500 hover:-translate-y-2"
             >
                <div className="absolute top-0 right-0 w-24 h-24 bg-accent/20 blur-[50px] -z-10 rounded-full group-hover:bg-accent/40 transition-all"></div>
                
                <div className="text-4xl mb-6 bg-dark-bg w-16 h-16 rounded-2xl flex items-center justify-center border border-white/10 shadow-lg group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>

                <div className="mb-4">
                  <span className="text-xs font-bold text-accent tracking-widest uppercase">{item.year}</span>
                  <h3 className="text-xl font-bold text-white mt-1 group-hover:text-primary transition-colors">{item.title}</h3>
                </div>
                
                <p className="text-gray-400 text-sm leading-relaxed border-t border-white/5 pt-4 group-hover:border-white/20">
                  {item.desc}
                </p>
             </div>
           ))}
        </div>
      </div>

    </div>
  );
};

export default About;