import React, { useRef } from 'react';
import { useScrollReveal } from '../../hooks/useAnimations';
import { Link } from 'react-router-dom';

const About = () => {
  const [ref, isVisible] = useScrollReveal();

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
         
         {/* Simple Bio */}
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

         {/* Stats / Visual Summary */}
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

    </div>
  );
};

export default About;