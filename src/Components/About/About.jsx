import React from 'react';
import profile_img from '../../assets/profile_img.png';
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

  return (
    <div id='about' className="py-24 px-6 max-w-7xl mx-auto" ref={ref}>
      
      {/* Heading - New Modern Style */}
      <div className={`mb-16 text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500 inline-block">
          The Story So Far.
        </h2>
        <div className="h-1 w-24 bg-primary mx-auto mt-4 rounded-full"></div>
      </div>

      <div className="grid md:grid-cols-12 gap-12">
        
        {/* Left: Bio Card (Span 7) */}
        <div className={`md:col-span-7 space-y-8 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
           <div className="glass-panel p-8 rounded-3xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10 group-hover:bg-primary/20 transition-all duration-500"></div>
              
              <h3 className="text-2xl font-semibold mb-6 text-white flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-accent"></span>
                Who I Am
              </h3>
              
              <div className="space-y-4 text-gray-300 leading-relaxed text-lg">
                <p>
                  I am a passionate <span className="text-white font-medium">Full Stack Developer</span> with over a decade of experience crafting digital solutions. My journey began with a simple curiosity about how things work on the web, which evolved into a career building robust applications for global clients.
                </p>
                <p>
                  I believe in clean code, user-centric design, and constantly pushing the boundaries of what's possible in the browser.
                </p>
              </div>

              {/* Stats Row */}
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

        {/* Right: Skills & Tech (Span 5) */}
        <div className={`md:col-span-5 space-y-6 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
           
           {/* Tech Stack Card */}
           <div className="glass-panel p-8 rounded-3xl h-full border-t border-white/10">
              <h3 className="text-2xl font-semibold mb-6 text-white flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-primary"></span>
                Tech Arsenal
              </h3>

              <div className="flex flex-wrap gap-3">
                {skills.map((skill, i) => (
                  <span 
                    key={i} 
                    className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm font-medium hover:bg-primary hover:border-primary transition-all duration-300 cursor-default"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
           </div>

        </div>

      </div>
    </div>
  );
};

export default About;