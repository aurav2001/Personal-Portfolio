import React, { useState } from 'react';
import mywork_data from '../../assets/mywork_data';
import { useScrollReveal } from '../../hooks/useAnimations';

const ExternalLinkIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
);

const StarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
);

const MyWork = () => {
  const [ref, isVisible] = useScrollReveal();
  const [visibleCount, setVisibleCount] = useState(9);
  const [activeFilter, setActiveFilter] = useState('All');
  const showingAll = visibleCount >= mywork_data.length;

  const categories = ['All', ...new Set(mywork_data.map(w => w.w_category))];
  const filtered = activeFilter === 'All' ? mywork_data : mywork_data.filter(w => w.w_category === activeFilter);
  const displayed = filtered.slice(0, visibleCount);

  const hasLiveUrl = (work) => {
    return work.github_link && work.github_link !== '/' && !work.github_link.includes('github.com');
  };

  return (
    <div id='work' className="py-24 px-6 max-w-7xl mx-auto" ref={ref}>
      {/* Section Header */}
      <div className={`mb-16 text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <h4 className="text-accent text-sm font-semibold tracking-widest uppercase mb-3">Portfolio</h4>
        <h2 className="text-4xl md:text-5xl font-bold text-white inline-block">
          My Projects
        </h2>
        <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
          A curated collection of {mywork_data.length}+ projects showcasing my expertise in web development, enterprise solutions, and creative applications.
        </p>
      </div>

      {/* Category Filter Pills */}
      <div className={`flex flex-wrap justify-center gap-3 mb-12 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => { setActiveFilter(cat); setVisibleCount(9); }}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
              activeFilter === cat
                ? 'bg-primary text-white border-primary shadow-lg shadow-primary/30'
                : 'bg-white/5 text-gray-300 border-white/10 hover:bg-white/10 hover:border-white/20'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayed.map((work, index) => (
          <div
            key={work.w_no}
            className={`
               group relative rounded-2xl overflow-hidden cursor-pointer border transition-all duration-500
               ${work.featured 
                 ? 'border-primary/30 shadow-lg shadow-primary/10 hover:shadow-xl hover:shadow-primary/20 hover:border-primary/50' 
                 : 'border-white/5 shadow-lg hover:shadow-xl hover:border-white/15'}
               ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
            `}
            style={{ transitionDelay: `${index * 80}ms` }}
          >
            {/* Featured Badge */}
            {work.featured && (
              <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 px-3 py-1.5 bg-primary/90 backdrop-blur-md rounded-full text-white text-xs font-bold shadow-lg shadow-primary/30">
                <StarIcon /> Featured
              </div>
            )}

            {/* Project Number Badge */}
            <div className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/15 text-white font-bold text-xs">
              {String(work.w_no).padStart(2, '0')}
            </div>

            {/* Image Container */}
            <div className="overflow-hidden bg-gradient-to-br from-gray-900 to-black h-56 flex items-center justify-center relative">
              <img
                src={work.w_img}
                alt={work.w_name}
                className="w-full h-full object-contain transition-all duration-700 group-hover:scale-110 p-4"
              />
              {/* Subtle gradient shimmer on hover */}
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>

            {/* Content Section */}
            <div className="relative bg-gradient-to-b from-gray-900/80 to-black p-5">
              {/* Category */}
              <p className="text-accent text-xs font-bold tracking-widest uppercase mb-2">{work.w_category}</p>

              {/* Title */}
              <h3 className="text-lg font-bold text-white mb-3 group-hover:text-primary transition-colors duration-300">{work.w_name}</h3>

              {/* Tech Stack Tags */}
              {work.tech_stack && work.tech_stack.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {work.tech_stack.map((tech, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 text-xs font-medium rounded-md bg-white/5 text-gray-300 border border-white/10"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 pt-2 border-t border-white/5">
                {hasLiveUrl(work) ? (
                  <a
                    href={work.github_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-primary hover:bg-primary/80 rounded-lg text-white text-sm font-semibold transition-all duration-300 shadow-lg shadow-primary/20 hover:shadow-primary/40"
                  >
                    <ExternalLinkIcon /> Live Demo
                  </a>
                ) : (
                  <span className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-white/5 rounded-lg text-gray-500 text-sm font-medium border border-white/5">
                    Coming Soon
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Show More / Less Button */}
      {filtered.length > 9 && (
        <div className="text-center mt-16">
          <button
            onClick={() => setVisibleCount(showingAll ? 9 : filtered.length)}
            className="group px-10 py-3.5 rounded-full border border-white/20 text-white font-semibold transition-all duration-300 hover:bg-primary hover:border-primary hover:shadow-[0_0_30px_rgba(59,130,246,0.4)]"
          >
            {showingAll ? '← Show Less' : `Show All ${filtered.length} Projects →`}
          </button>
        </div>
      )}

      {/* Stats Bar */}
      <div className={`mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {[
          { label: 'Total Projects', value: mywork_data.length + '+' },
          { label: 'Live Websites', value: mywork_data.filter(w => hasLiveUrl(w)).length + '+' },
          { label: 'Technologies', value: '15+' },
          { label: 'Happy Clients', value: '10+' },
        ].map((stat, i) => (
          <div key={i} className="text-center p-6 rounded-xl bg-white/[0.02] border border-white/5 hover:border-primary/30 transition-all duration-300 group">
            <p className="text-3xl font-bold text-white group-hover:text-primary transition-colors">{stat.value}</p>
            <p className="text-gray-400 text-sm mt-1">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyWork;
