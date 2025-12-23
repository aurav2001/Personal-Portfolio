import React from 'react';
import profile_img from '../../assets/profile_img.png';
import resume from '../../assets/resume.pdf';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import { useScrollReveal } from '../../hooks/useAnimations';

const Hero = () => {
  const [ref, isVisible] = useScrollReveal();

  return (
    <div 
      id='home' 
      className="relative min-h-screen flex items-center justify-center pt-20 px-6 overflow-hidden"
      ref={ref}
    >
      {/* Background Elements */}
      <div className="absolute top-20 left-1/4 w-72 h-72 bg-primary/20 rounded-full blur-[100px] -z-10 animate-pulse"></div>
      <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[100px] -z-10 animate-pulse delay-700"></div>

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center z-10 w-full">
        
        {/* Text Content - New Clean Layout */}
        <div className={`space-y-8 text-center md:text-left transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h1 className="text-5xl md:text-7xl font-bold leading-tight tracking-tight">
            I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Gaurav Pandey</span>,
            <br />
            <span className="text-white">Full Stack Developer.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-400 font-light max-w-lg mx-auto md:mx-0 leading-relaxed">
            Crafting high-performance digital experiences with cutting-edge technology. Based in India, building for the world.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center md:justify-start items-center">
            <AnchorLink 
              className="px-8 py-4 rounded-full bg-gradient-to-r from-primary to-accent text-white font-bold text-lg shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto text-center" 
              offset={100} 
              href='#contact'
            >
              Let's Talk
            </AnchorLink>
            
            <a 
              href={resume} 
              download 
              className="px-8 py-4 rounded-full border border-white/20 hover:border-white/50 bg-white/5 backdrop-blur-sm text-white font-bold text-lg hover:-translate-y-1 hover:bg-white/10 transition-all duration-300 w-full sm:w-auto text-center"
            >
              My Resume
            </a>
          </div>
        </div>
        
        {/* Visual - Clean Floating Image */}
        <div className={`flex justify-center relative transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
           {/* Decorative Ring */}
           <div className="absolute inset-0 border-2 border-dashed border-white/10 rounded-full animate-[spin_10s_linear_infinite] w-[450px] h-[450px] hidden md:block"></div>
           
           <img 
             src={profile_img} 
             alt="Gaurav Pandey" 
             className="w-full max-w-sm md:max-w-md relative z-10 drop-shadow-2xl hover:scale-105 transition-transform duration-500"
           />
        </div>

      </div>
    </div>
  );
};

export default Hero;