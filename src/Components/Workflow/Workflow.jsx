import React, { useState } from 'react';
import { useScrollReveal } from '../../hooks/useAnimations';

const Workflow = () => {
  const [ref, isVisible] = useScrollReveal();
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
       id: 1,
       step: "01",
       title: "Discover",
       desc: "Analysis & Research",
       color: "bg-blue-500"
    },
    {
       id: 2,
       step: "02",
       title: "Design",
       desc: "Prototyping & UX",
       color: "bg-purple-500"
    },
    {
       id: 3,
       step: "03",
       title: "Develop",
       desc: "Clean Code & Logic",
       color: "bg-amber-500"
    },
    {
       id: 4,
       step: "04",
       title: "Deploy",
       desc: "Testing & Launch",
       color: "bg-green-500"
    }
  ];

  return (
    <div id='workflow' className="py-32 px-6 max-w-7xl mx-auto" ref={ref}>
       <div className={`flex flex-col md:flex-row justify-between items-end mb-20 gap-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div>
            <h4 className="text-accent text-sm font-semibold tracking-widest uppercase mb-3">Methodology</h4>
            <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight">
              My <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Workflow</span>
            </h2>
          </div>
          <div className="text-gray-400 text-sm hidden md:block max-w-xs text-right">
             A methodical approach to solving complex problems.
          </div>
       </div>

       {/* Interactive Steps */}
       <div className={`relative grid md:grid-cols-4 gap-6 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          
          {/* Connecting Line (Desktop) */}
          <div className="absolute top-8 left-0 w-full h-0.5 bg-white/10 hidden md:block -z-10"></div>

          {steps.map((item, index) => (
             <div 
                key={item.id}
                className="group relative pt-8 cursor-pointer"
                onMouseEnter={() => setActiveStep(index)}
             >
                {/* Dot Endpoint */}
                <div className={`absolute top-6 left-0 md:left-1/2 md:-translate-x-1/2 w-4 h-4 rounded-full border-2 border-dark-bg transition-all duration-300 z-10 ${activeStep === index ? `${item.color} scale-125 shadow-[0_0_15px_rgba(255,255,255,0.5)]` : 'bg-white/20'}`}></div>

                <div className={`p-6 rounded-2xl border transition-all duration-500 ${activeStep === index ? 'bg-white/5 border-white/20 -translate-y-2' : 'bg-transparent border-transparent'}`}>
                    <span className={`text-4xl font-bold opacity-10 block mb-2 group-hover:opacity-100 group-hover:text-white transition-all`}>{item.step}</span>
                    <h3 className="text-xl font-bold text-white mb-1">{item.title}</h3>
                    <p className="text-sm text-gray-400 group-hover:text-gray-300">{item.desc}</p>
                </div>
             </div>
          ))}

       </div>
    </div>
  );
};

export default Workflow;
