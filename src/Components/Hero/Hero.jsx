import React from 'react';
import hero_profile from '../../assets/about.jpg';
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

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 sm:gap-16 items-center z-10 w-full">

        {/* Text Side (Order 2 on Mobile, Order 1 on Desktop) */}
        <div className={`space-y-8 text-center lg:text-left transition-all duration-1000 order-2 lg:order-1 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>

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

        {/* Visual Side: "The Cosmic Capsule Portal" (Order 1 on Mobile, Order 2 on Desktop) */}
        <div className={`flex justify-center relative transition-all duration-1000 delay-300 order-1 lg:order-2 mb-8 lg:mb-0 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>

          <div className="relative w-[320px] h-[420px] sm:w-[360px] sm:h-[480px] flex items-center justify-center">

            {/* Layer 1: The Outer Dashed Portal Capsule Ring (Spinning) */}
            <div className="absolute inset-0 m-auto w-[100%] h-[100%] rounded-[180px] border-2 border-dashed border-primary/40 animate-[spin_30s_linear_infinite]"></div>

            {/* Layer 2: The Inner Reverse Capsule Ring */}
            <div className="absolute inset-0 m-auto w-[110%] h-[108%] rounded-[190px] border border-accent/40 animate-[spin_25s_linear_infinite_reverse]"></div>

            {/* Layer 3: Neon Glow Backdrop */}
            <div className="absolute inset-6 bg-gradient-to-tr from-primary/30 via-accent/20 to-primary/30 rounded-[160px] blur-3xl -z-10"></div>

            {/* Layer 4: Capsule Photo Avatar Frame */}
            <div className="relative w-[280px] h-[380px] sm:w-[320px] sm:h-[440px] rounded-[160px] p-[3px] bg-gradient-to-tr from-primary via-accent to-primary shadow-[0_0_50px_rgba(168,85,247,0.35)] z-10 transition-transform duration-500 hover:scale-105">
              <div className="w-full h-full rounded-[156px] overflow-hidden bg-black/80 relative">
                <img
                  src={hero_profile}
                  alt="Gaurav Pandey"
                  className="w-full h-full object-cover object-[center_25%] transition-transform duration-700 hover:scale-105"
                />
              </div>
            </div>

            {/* Floating Orbitals */}
            <div className="absolute top-2 -right-2 w-16 h-16 bg-accent/20 rounded-full blur-xl animate-bounce delay-700 pointer-events-none"></div>
            <div className="absolute bottom-2 -left-2 w-14 h-14 bg-primary/20 rounded-full blur-xl animate-bounce pointer-events-none"></div>

            {/* Floating Tech Badge */}
            <div className="absolute top-16 -right-6 glass-panel px-4 py-2 rounded-xl border border-white/20 animate-pulse hidden md:block z-20">
              <span className="text-xs font-bold text-accent">Full Stack Dev</span>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default Hero;