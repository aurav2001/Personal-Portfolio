import React from 'react';
import { useScrollReveal } from '../../hooks/useAnimations';

// Icons as SVG components for better performance & flexibility
const DesignIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
);

const CodeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
);

const MobileIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>
);

const GrowthIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
);

const Services = () => {
  const [ref, isVisible] = useScrollReveal();

  const services = [
    {
      id: "01",
      title: "UI/UX Design",
      desc: "Creating intuitive and visually stunning interfaces that users love to interact with.",
      icon: <DesignIcon />
    },
    {
      id: "02",
      title: "Web Development",
      desc: "Building fast, responsive, and scalable websites using modern technologies like React and Next.js.",
      icon: <CodeIcon />
    },
    {
      id: "03",
      title: "App Design",
      desc: "Designing mobile-first experiences that look great on any device or platform.",
      icon: <MobileIcon />
    },
    {
      id: "04",
      title: "Digital Marketing",
      desc: "Helping brands grow with strategic digital presence and SEO optimization.",
      icon: <GrowthIcon />
    },
  ];

  return (
    <div id='services' className="py-24 px-6 max-w-7xl mx-auto" ref={ref}>
       <div className={`mb-20 text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <h4 className="text-accent text-sm font-semibold tracking-widest uppercase mb-3">What I Offer</h4>
        <h2 className="text-4xl md:text-5xl font-bold text-white inline-block relative z-10">
          My Services
          <span className="absolute -bottom-2 left-0 w-full h-3 bg-primary/30 -z-10 skew-x-12"></span>
        </h2>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((service, i) => (
          <div 
             key={i} 
             className={`p-8 rounded-2xl bg-white/5 border border-white/5 hover:border-primary/50 hover:bg-white/10 transition-all duration-500 group cursor-pointer hover:-translate-y-2
                        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
             style={{ transitionDelay: `${i * 100}ms` }}
          >
             <div className="text-primary mb-6 group-hover:scale-110 transition-transform duration-300">{service.icon}</div>
             <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors">{service.title}</h3>
             <p className="text-gray-400 text-sm leading-relaxed mb-6">
               {service.desc}
             </p>
             
             <div className="flex items-center gap-2 text-sm font-semibold text-white/50 group-hover:text-white transition-colors">
               Read More 
               <span className="group-hover:translate-x-1 transition-transform">→</span>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
