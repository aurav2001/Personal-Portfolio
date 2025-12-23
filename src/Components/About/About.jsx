import React from 'react';
import { useScrollReveal } from '../../hooks/useAnimations';

const About = () => {
  const [ref, isVisible] = useScrollReveal();

  const milestones = [
    {
      year: "The Beginning",
      title: "Spark of Curiosity",
      desc: "Started my journey with a deep curiosity for how the web works, building simple HTML/CSS pages.",
      icon: "🌱" // Will replace later if needed, but using emoji as placeholder for now or SVG if available
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
      desc: "Venutured into backend with Node.js and Databases, becoming a true problem solver across the stack.",
      icon: "🚀"
    },
    {
      year: "Present",
      title: "Architecting Solutions",
      desc: "Leading teams and building scalable, high-performance applications for global clients.",
      icon: "⭐"
    }
  ];

  return (
    <div id='about' className="py-24 px-6 max-w-7xl mx-auto relative overflow-hidden" ref={ref}>
      
      {/* Background Decor */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px] -z-10"></div>

      <div className={`mb-20 text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <h2 className="text-4xl md:text-5xl font-bold text-white inline-block relative">
          My Journey
          <span className="block h-1 w-full bg-gradient-to-r from-transparent via-primary to-transparent mt-4"></span>
        </h2>
        <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
          A story of continuous learning, growth, and passion for technology.
        </p>
      </div>

      <div className="relative">
        {/* Tree Branch / Timeline Line */}
        <div className="timeline-line hidden md:block"></div>
        <div className="absolute left-5 top-0 bottom-0 w-1 bg-gradient-to-b from-primary/50 to-accent/50 md:hidden"></div>

        <div className="space-y-12 md:space-y-24">
          {milestones.map((item, index) => (
            <div 
              key={index} 
              className={`relative flex flex-col md:flex-row gap-8 items-center justify-between
                          ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}
                          transition-all duration-1000 delay-${index * 200}
                          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
            >
               
               {/* Timeline Node (The "Fruit/Leaf" of the branch) */}
               <div className="absolute left-5 md:left-1/2 transform -translate-x-1/2 w-12 h-12 bg-dark-bg border-4 border-primary rounded-full flex items-center justify-center z-10 shadow-[0_0_20px_rgba(168,85,247,0.5)]">
                 <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
               </div>

               {/* Content Card */}
               <div className={`w-full md:w-5/12 ml-12 md:ml-0 ${index % 2 === 0 ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'}`}>
                  <span className="inline-block py-1 px-3 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-bold mb-3">
                    {item.year}
                  </span>
                  <div className="glass-panel p-6 rounded-2xl hover:border-primary/50 transition-colors duration-300 group">
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-primary transition-colors">{item.title}</h3>
                    <p className="text-gray-400 leading-relaxed">{item.desc}</p>
                  </div>
               </div>

               {/* Empty Space for the other side */}
               <div className="hidden md:block w-5/12"></div>

            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default About;