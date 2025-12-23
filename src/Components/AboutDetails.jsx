import React, { useEffect } from 'react';
import { useScrollReveal } from '../hooks/useAnimations';
import { Link } from 'react-router-dom';
import about_img from '../assets/about.png';
import profile_img from '../assets/profile_img.png'; // Reusing profile image for story 
// Note: In a real scenario, use different images for different story phases.

// Story Section Component
const StorySection = ({ title, subtitle, desc, image, align = "left", delay = 0 }) => {
   const [ref, isVisible] = useScrollReveal();
   const isLeft = align === "left";
 
   return (
     <div 
       ref={ref} 
       className={`grid md:grid-cols-2 gap-12 lg:gap-20 items-center py-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
     >
        {/* Image Side */}
        <div className={`relative ${isLeft ? 'order-1' : 'order-1 md:order-2'}`}>
            <div className="relative group">
                {/* Frame */}
                <div className={`absolute inset-0 border-2 border-white/10 rounded-3xl transform ${isLeft ? '-rotate-3 group-hover:-rotate-6' : 'rotate-3 group-hover:rotate-6'} transition-transform duration-500`}></div>
                <div className={`absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl blur-xl -z-10 group-hover:blur-2xl transition-all duration-500`}></div>
                
                {/* Image */}
                <img 
                  src={image} 
                  alt={title} 
                  className="rounded-3xl shadow-2xl relative z-10 w-full h-auto object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                />
            </div>
        </div>

        {/* Text Side */}
        <div className={`${isLeft ? 'order-2' : 'order-1'}`}>
            <h4 className="text-accent text-sm font-bold tracking-widest uppercase mb-4 flex items-center gap-3">
               <span className="w-8 h-[1px] bg-accent"></span>
               {subtitle}
            </h4>
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">{title}</h3>
            <div className="space-y-4 text-gray-400 text-lg leading-relaxed">
               {desc.map((p, i) => (
                 <p key={i}>{p}</p>
               ))}
            </div>
        </div>
     </div>
   );
};

const AboutDetails = () => {
  useEffect(() => {
      window.scrollTo(0, 0);
  }, []);

  const storyChapters = [
    {
      subtitle: "The Beginning",
      title: "A Spark of Curiosity",
      desc: [
        "It started with a simple question: 'How do websites work?' I was fascinated by the idea of creating something from nothing but lines of code.",
        "My journey began with HTML and CSS, experimenting late into the night. The thrill of seeing changes instantly on the screen was addictive. I knew then that this was what I wanted to do."
      ],
      image: about_img, // Using generic about image or placeholder
      align: "left"
    },
    {
      subtitle: "The Growth",
      title: "Mastering the Craft",
      desc: [
        "As I dove deeper, I discovered the power of JavaScript. It wasn't just about static pages anymore; it was about interactivity and logic.",
        "I spent years mastering React and the modern frontend ecosystem. I learned that great code isn't just functional—it's clean, maintainable, and scalable. I started freelancing, taking on challenges that pushed my skills to the limit."
      ],
      image: profile_img, // Using profile image
      align: "right"
    },
    {
      subtitle: "The Present",
      title: "Building the Future",
      desc: [
        "Today, I architect complex full-stack applications. I consistently explore new horizons like Web3 and AI Agents, seeking to integrate cutting-edge tech into practical solutions.",
        "My goal is simple: to build digital experiences that not only solve problems but also inspire and delight users."
      ],
      image: about_img, // Reuse about image or need a third one
      align: "left"
    }
  ];

  return (
    <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto min-h-screen relative">
      
      {/* Background Noise/Gradient */}
      <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] -z-10"></div>
      
      {/* Header */}
      <div className="text-center mb-24 space-y-4">
          <h4 className="text-accent text-sm font-semibold tracking-widest uppercase mb-2">My Journey</h4>
          <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight">
            The Story So <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Far</span>
          </h1>
          <p className="max-w-xl mx-auto text-gray-400 text-lg">
            From a curious beginner to a professional architect.
          </p>
      </div>

      {/* Narrative Flow */}
      <div className="space-y-12 relative">
         {/* Vertical Timeline Line (Optional, subtle) */}
         <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent hidden md:block"></div>

         {storyChapters.map((chapter, index) => (
            <StorySection 
              key={index}
              {...chapter}
              delay={index * 200}
            />
         ))}
      </div>
      
      {/* Footer / CTA */}
      <div className="text-center mt-32 border-t border-white/5 pt-16">
         <h2 className="text-3xl font-bold text-white mb-8">Ready to write the next chapter?</h2>
         <div className="flex justify-center gap-6">
            <Link to="/#contact" className="px-10 py-4 bg-white text-black font-bold rounded-full hover:scale-105 transition-transform">
               Work Together
            </Link>
            <Link to="/" className="px-10 py-4 border border-white/20 text-white rounded-full hover:bg-white/5 transition-colors">
               Back Home
            </Link>
         </div>
      </div>

    </div>
  );
};

export default AboutDetails;