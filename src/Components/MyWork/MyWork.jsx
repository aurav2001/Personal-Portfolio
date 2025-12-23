import React from 'react';
import mywork_data from '../../assets/mywork_data';
import { useScrollReveal } from '../../hooks/useAnimations';

const MyWork = () => {
  const [ref, isVisible] = useScrollReveal();

  return (
    <div id='work' className="py-24 px-6 max-w-7xl mx-auto" ref={ref}>
      <div className={`mb-20 text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <h2 className="text-4xl md:text-5xl font-bold text-white inline-block">
          Selected Works
        </h2>
        <p className="text-gray-400 mt-4">A curated gallery of my recent projects.</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {mywork_data.map((work, index) => (
          <div 
            key={index}
            className={`group relative rounded-xl overflow-hidden cursor-pointer shadow-lg
                       ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            <img 
              src={work.w_img} 
              alt={work.w_name} 
              className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-700"
            />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
               <h3 className="text-xl font-bold text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-100">Project {work.w_no}</h3>
               <p className="text-primary text-sm translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-150">{work.w_name}</p>
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
