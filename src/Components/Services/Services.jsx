import React from 'react';
import { useScrollReveal } from '../../hooks/useAnimations';
import { services } from '../../constants/services';
import { Link } from 'react-router-dom';

const Services = () => {
  const [ref, isVisible] = useScrollReveal();

  return (
    <div id='services' className="py-24 px-6 max-w-7xl mx-auto" ref={ref}>
      <div className={`mb-20 text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <h4 className="text-primary text-sm font-semibold tracking-widest uppercase mb-3">What I Offer</h4>
        <h2 className="text-4xl md:text-5xl font-bold text-white inline-block relative z-10">
          My Services
          <span className="absolute -bottom-2 left-0 w-full h-3 bg-primary/20 -z-10 skew-x-12"></span>
        </h2>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((service, i) => (
          <Link
            to={`/service/${service.id}`}
            key={i}
            className={`block p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/50 hover:bg-white/10 transition-all duration-500 group cursor-pointer hover:-translate-y-2
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
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Services;
