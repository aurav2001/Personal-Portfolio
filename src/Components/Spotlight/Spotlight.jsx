import React from 'react';
import { useScrollReveal } from '../../hooks/useAnimations';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import project1_img from '../../assets/project_1.svg'; // Assuming we have this or similar

const Spotlight = () => {
  const [ref, isVisible] = useScrollReveal();

  return (
    <div id='spotlight' className="py-24 px-6 max-w-7xl mx-auto" ref={ref}>
      <div className={`mb-16 text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <h4 className="text-accent text-sm font-semibold tracking-widest uppercase mb-3">Feature of the Month</h4>
        <h2 className="text-4xl md:text-5xl font-bold text-white inline-block relative z-10">
          Spotlight
          <span className="absolute -bottom-2 left-0 w-full h-3 bg-primary/30 -z-10 skew-x-12"></span>
        </h2>
      </div>

      {/* Featured Project Card - Highlighting One Major Work */}
      <div className={`
         relative w-full rounded-3xl overflow-hidden bg-white/5 border border-white/10 shadow-2xl
         grid lg:grid-cols-2 gap-0 transition-all duration-700 delay-200
         ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
      `}>
         
         {/* Visual Side */}
         <div className="relative h-80 lg:h-auto overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-transparent to-transparent z-10 opacity-60"></div>
            <img 
               src="https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=2070&auto=format&fit=crop" 
               alt="Spotlight Project" 
               className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Floating Tag */}
            <div className="absolute top-6 left-6 z-20 bg-primary/90 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-lg">
               Latest Build
            </div>
         </div>

         {/* Content Side */}
         <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center relative bg-gradient-to-br from-white/5 to-transparent">
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 blur-[80px] -z-10"></div>

            <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
               AI-Powered <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Finance Tracker</span>
            </h3>
            
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
               A comprehensive financial dashboard that uses Machine Learning to predict spending habits. Built with React, Python, and TensorFlow.
            </p>

            <div className="flex flex-wrap gap-3 mb-10">
               {['React', 'Python', 'TensorFlow', 'FastAPI'].map((tech) => (
                  <span key={tech} className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-sm text-gray-300">
                     {tech}
                  </span>
               ))}
            </div>

            <div className="flex gap-4">
               <button className="px-8 py-3 rounded-full bg-white text-black font-bold hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:scale-105 transition-all duration-300">
                  View Case Study
               </button>
               <button className="px-8 py-3 rounded-full border border-white/20 text-white font-bold hover:bg-white/10 transition-all duration-300">
                  Live Demo
               </button>
            </div>
         </div>

      </div>
    </div>
  );
};

export default Spotlight;
