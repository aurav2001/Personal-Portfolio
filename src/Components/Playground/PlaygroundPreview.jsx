import React, { useState } from 'react';
import { useScrollReveal } from '../../hooks/useAnimations';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import { Link } from 'react-router-dom';

const PlaygroundPreview = () => {
  const [ref, isVisible] = useScrollReveal();
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const experiments = [
    {
       id: 1,
       title: "Neon Cursor",
       type: "Interaction",
       gradient: "from-cyan-500 to-blue-500",
       visual: (isHovered) => (
          <div className={`w-8 h-8 rounded-full border-2 border-white shadow-[0_0_15px_rgba(255,255,255,0.8)] transition-all duration-300 ${isHovered ? 'scale-150 bg-white' : ''}`}></div>
       )
    },
    {
       id: 2,
       title: "Glass Card",
       type: "UI Component",
       gradient: "from-purple-500 to-pink-500",
       visual: (isHovered) => (
          <div className={`w-16 h-10 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 transition-all duration-300 ${isHovered ? 'rotate-12 scale-110 shadow-xl' : ''}`}></div>
       )
    },
    {
       id: 3,
       title: "Magnetic Btn",
       type: "Animation",
       gradient: "from-emerald-400 to-teal-500",
       visual: (isHovered) => (
          <div className={`px-3 py-1 bg-white text-black text-[10px] font-bold rounded-full transition-all duration-300 ${isHovered ? 'translate-x-2' : ''}`}>
             HOVER ME
          </div>
       )
    }
  ];

  return (
    <div id='lab' className="py-32 px-6 max-w-7xl mx-auto" ref={ref}>
       <div className={`flex flex-col md:flex-row justify-between items-end mb-16 gap-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div>
            <h4 className="text-accent text-sm font-semibold tracking-widest uppercase mb-3">Experimental Zone</h4>
            <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight">
              The <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Creative Lab</span>
            </h2>
          </div>
          <Link to="/lab" className="group flex items-center gap-2 text-white border-b border-white/20 pb-1 hover:border-primary transition-all">
             View All Experiments
             <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
          </Link>
       </div>

       <div className={`grid md:grid-cols-3 gap-6 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          
          {/* Main Description Card */}
          <div className="col-span-1 md:col-span-1 p-8 rounded-3xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 flex flex-col justify-center">
             <p className="text-gray-300 text-lg leading-relaxed mb-6">
                A sandbox where I bridge the gap between <strong className="text-white">Design</strong> and <strong className="text-white">Code</strong>. 
                Focusing on micro-interactions, motion, and experimental UI patterns.
             </p>
             <div className="flex gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500"></span>
                <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                <span className="w-3 h-3 rounded-full bg-green-500"></span>
             </div>
          </div>

          {/* Interactive Preview Cards */}
          {experiments.map((exp, index) => (
             <div 
                key={exp.id}
                className="relative h-64 rounded-3xl overflow-hidden bg-dark-bg border border-white/10 group cursor-pointer hover:border-white/30 transition-all duration-500"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
             >
                {/* Background Glow */}
                <div className={`absolute inset-0 bg-gradient-to-br ${exp.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}></div>
                
                {/* Visual Area */}
                <div className="absolute inset-x-0 top-0 h-2/3 flex items-center justify-center">
                   {exp.visual(hoveredIndex === index)}
                </div>

                {/* Content Area */}
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-white/5 backdrop-blur-sm p-6 flex flex-col justify-center border-t border-white/5 group-hover:bg-white/10 transition-colors">
                   <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">{exp.type}</p>
                   <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">{exp.title}</h3>
                </div>
             </div>
          ))}

       </div>
    </div>
  );
};

export default PlaygroundPreview;
