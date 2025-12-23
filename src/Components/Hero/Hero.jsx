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
      className="relative min-h-screen flex items-center justify-center pt-32 pb-20 px-6 overflow-hidden"
      ref={ref}
    >
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] -z-10 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px] -z-10 animate-pulse delay-1000"></div>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center z-10 w-full">
        
        {/* Text Side */}
        <div className={`space-y-8 text-center lg:text-left transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          
          {/* Status Badge */}
          {/* Status Badge Removed per user feedback */}

          <h1 className="text-5xl md:text-7xl font-bold leading-tight tracking-tight">
            Building the <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent relative">
               Digital Future
               {/* Underline decoration */}
               <svg className="absolute w-full h-3 -bottom-2 left-0 text-accent opacity-50" viewBox="0 0 100 10" preserveAspectRatio="none">
                 <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="2" fill="none" />
               </svg>
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-400 font-light max-w-lg mx-auto lg:mx-0 leading-relaxed">
            I'm <strong className="text-white font-semibold">Gaurav Pandey</strong>, a Full Stack Developer turning complex problems into elegant, pixel-perfect solutions.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start items-center pt-4">
            <AnchorLink 
              className="px-8 py-4 rounded-full bg-white text-black font-bold text-lg hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:scale-105 transition-all duration-300 w-full sm:w-auto text-center" 
              offset={100} 
              href='#contact'
            >
              Start a Project
            </AnchorLink>
            
            <a 
              href={resume} 
              download 
              className="px-8 py-4 rounded-full border border-white/20 hover:border-accent text-white font-bold text-lg hover:bg-white/5 transition-all duration-300 w-full sm:w-auto text-center flex items-center justify-center gap-2 group"
            >
              <span>Download CV</span>
              <svg className="w-4 h-4 group-hover:translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
            </a>
          </div>
        </div>
        
        {/* Visual Side: "The Cosmic Portal" */}
        <div className={`flex justify-center relative transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
           
           <div className="relative w-[400px] h-[500px] md:w-[450px] md:h-[550px]">
              
              {/* Layer 1: The Portal Ring (Spinning) */}
              <div className="absolute inset-0 m-auto w-[110%] h-[90%] rounded-[40%_60%_70%_30%/40%_50%_60%_50%] border border-primary/30 animate-[spin_15s_linear_infinite] blur-[1px]"></div>
              
              {/* Layer 2: The Reverse Ring (Spinning Reverse) */}
              <div className="absolute inset-0 m-auto w-[110%] h-[90%] rounded-[60%_40%_30%_70%/60%_30%_70%_40%] border border-accent/30 animate-[spin_20s_linear_infinite_reverse] blur-[1px]"></div>

              {/* Layer 3: The Glow Backdrop */}
              <div className="absolute inset-4 bg-gradient-to-b from-primary/20 to-accent/20 rounded-full blur-2xl"></div>

              {/* Layer 4: The Tech Grid (Optional Texture) */}
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay rounded-full"></div>

              {/* Layer 5: The Image Container */}
              <div className="relative h-full w-full rounded-b-full overflow-hidden flex items-end justify-center z-10 transition-transform duration-500 hover:scale-105">
                 {/* Glass Card Behind Image Body */}
                 <div className="absolute bottom-0 w-full h-3/4 bg-white/5 backdrop-blur-sm border-t border-white/10 rounded-t-[200px] -z-10"></div>
                 
                 <img 
                   src={profile_img} 
                   alt="Gaurav Pandey" 
                   className="relative z-10 w-full h-auto object-cover drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] mask-image-gradient"
                 />
              </div>

              {/* Floating Orbitals */}
              <div className="absolute -top-10 -right-10 w-20 h-20 bg-accent/20 rounded-full blur-xl animate-bounce delay-700"></div>
              <div className="absolute -bottom-5 -left-10 w-16 h-16 bg-primary/20 rounded-full blur-xl animate-bounce"></div>
              
              {/* Tech Badge Floating */}
              <div className="absolute top-20 -right-4 glass-panel px-4 py-2 rounded-xl border border-white/20 animate-pulse hidden md:block">
                 <span className="text-xs font-bold text-accent">React Expert</span>
              </div>

           </div>

        </div>

      </div>
    </div>
  );
};

export default Hero;