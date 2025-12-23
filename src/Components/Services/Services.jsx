import React from 'react';
import { useScrollReveal } from '../../hooks/useAnimations';

const Services = () => {
  const [ref, isVisible] = useScrollReveal();

  const services = [
    {
      id: "01",
      title: "UI/UX Design",
      desc: "Creating intuitive and visually stunning interfaces that users love to interact with.",
      icon: "🎨"
    },
    {
      id: "02",
      title: "Web Development",
      desc: "Building fast, responsive, and scalable websites using modern technologies like React and Next.js.",
      icon: "💻" 
    },
    {
      id: "03",
      title: "App Design",
      desc: "Designing mobile-first experiences that look great on any device or platform.",
      icon: "📱"
    },
    {
      id: "04",
      title: "Digital Marketing",
      desc: "Helping brands grow with strategic digital presence and SEO optimization.",
      icon: "📈"
    },
  ];

  return (
    <div id='services' className="py-24 px-6 max-w-7xl mx-auto" ref={ref}>
       <div className={`mb-20 text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
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
             <div className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-300">{service.icon}</div>
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
