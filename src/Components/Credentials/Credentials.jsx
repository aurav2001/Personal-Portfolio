import React, { useState } from 'react';
import { useScrollReveal } from '../../hooks/useAnimations';
import { Link } from 'react-router-dom';

const Credentials = () => {
  const [ref, isVisible] = useScrollReveal();
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const credentials = [
    {
       id: 1,
       title: "AWS Certified Solutions Architect",
       issuer: "Amazon Web Services",
       year: "2024",
       color: "from-orange-400 to-amber-500",
       icon: (
         <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
       )
    },
    {
       id: 2,
       title: "Meta Front-End Developer",
       issuer: "Meta (Coursera)",
       year: "2023",
       color: "from-blue-500 to-cyan-500",
       icon: (
         <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>
       )
    },
    {
       id: 3,
       title: "Google UX Design Professional",
       issuer: "Google",
       year: "2023",
       color: "from-red-500 to-pink-500",
       icon: (
         <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"></path></svg>
       )
    }
  ];

  return (
    <div id='credentials' className="py-32 px-6 max-w-7xl mx-auto" ref={ref}>
       <div className={`flex flex-col md:flex-row justify-between items-end mb-16 gap-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div>
            <h4 className="text-accent text-sm font-semibold tracking-widest uppercase mb-3">Professional Qualification</h4>
            <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight">
              My <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">Credentials</span>
            </h2>
          </div>
          <Link to="/credentials" className="group flex items-center gap-2 text-white border-b border-white/20 pb-1 hover:border-primary transition-all">
             View All Certificates
             <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
          </Link>
       </div>

       <div className={`grid md:grid-cols-3 gap-8 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          
          {credentials.map((cert, index) => (
             <div 
                key={cert.id}
                className="group relative h-80 rounded-3xl bg-white/5 border border-white/10 overflow-hidden cursor-pointer hover:border-white/20 transition-all duration-500"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
             >
                {/* Background Gradient Mesh */}
                <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${cert.color} opacity-10 blur-[80px] group-hover:opacity-30 transition-opacity duration-500`}></div>
                
                <div className="absolute inset-0 p-8 flex flex-col justify-between z-10">
                   
                   {/* Top: Icon */}
                   <div className={`w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center transition-transform duration-500 ${hoveredIndex === index ? 'scale-110 rotate-6 shadow-xl' : ''}`}>
                      {cert.icon}
                   </div>

                   {/* Bottom: Info */}
                   <div>
                      <p className="text-sm text-gray-400 mb-2">{cert.issuer} • {cert.year}</p>
                      <h3 className="text-2xl font-bold text-white leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-colors">
                         {cert.title}
                      </h3>
                   </div>

                   {/* Link Arrow */}
                   <div className={`absolute bottom-8 right-8 w-10 h-10 rounded-full bg-white text-black flex items-center justify-center transition-all duration-500 ${hoveredIndex === index ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                   </div>
                </div>
             </div>
          ))}

       </div>
    </div>
  );
};

export default Credentials;
