import React from 'react';
import mywork_data from '../../assets/mywork_data';
import { useScrollReveal } from '../../hooks/useAnimations';

const GitHubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
);

const ExternalLinkIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
);

const MyWork = () => {
  const [ref, isVisible] = useScrollReveal();

  return (
    <div id='work' className="py-24 px-6 max-w-7xl mx-auto" ref={ref}>
      <div className={`mb-20 text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <h4 className="text-accent text-sm font-semibold tracking-widest uppercase mb-3">My Portfolio</h4>
        <h2 className="text-4xl md:text-5xl font-bold text-white inline-block">
          Selected Works
        </h2>
        <p className="text-gray-400 mt-4">A curated gallery of my recent projects.</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {mywork_data.map((work, index) => (
          <div 
            key={index}
            className={`
               group relative rounded-xl overflow-hidden cursor-pointer shadow-lg border border-white/5
               ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
            `}
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            {/* Image Container with Zoom Effect */}
            <div className="overflow-hidden">
               <img 
                 src={work.w_img} 
                 alt={work.w_name} 
                 className="w-full h-72 object-cover transform group-hover:scale-110 transition-transform duration-700"
               />
            </div>
            
            {/* Dark Gradient Overlay (Always visible but deepens on hover) */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300"></div>

            {/* Content Overlay */}
            <div className="absolute inset-0 p-6 flex flex-col justify-end">
               
               {/* Text Content: Initially Hidden, Slides up on Hover */}
               <div className="mb-4 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <p className="text-accent text-xs font-bold tracking-widest uppercase mb-1">Web Development</p>
                  <h3 className="text-2xl font-bold text-white">{work.w_name}</h3>
               </div>

               {/* Action Buttons: Initially Hidden, Slides up on Hover with delay */}
               <div className="flex gap-4 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                  <a 
                    href={work.github_link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-lg text-white text-sm font-medium transition-colors border border-white/10"
                    title="View Code on GitHub"
                  >
                     <GitHubIcon /> Code
                  </a>
                  
                  {/* Demo Link */}
                  <a 
                    href="#" 
                    onClick={(e) => e.preventDefault()}
                    className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/80 backdrop-blur-md rounded-lg text-white text-sm font-medium transition-colors shadow-lg shadow-primary/20"
                    title="View Live Demo"
                  >
                     <ExternalLinkIcon /> Live Demo
                  </a>
               </div>
            </div>

            {/* Top Right Number Badge */}
            <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/10 text-white font-bold text-sm">
               {work.w_no}
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-16">
        <button className="px-10 py-3 rounded-full border border-white/20 text-white font-semibold hover:bg-white hover:text-black transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]">
          Show More
        </button>
      </div>
    </div>
  );
};

export default MyWork;
