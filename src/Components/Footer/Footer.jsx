import React from 'react';
import user_icon from '../../assets/user_icon.svg';

const Footer = () => {
  return (
    <footer className="bg-black/40 backdrop-blur-md pt-16 pb-8 px-6 border-t border-white/5">
       <div className="max-w-7xl mx-auto">
         
         <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-16">
            <div className="max-w-md space-y-6">
               <div className="relative inline-block mb-4 group">
                 <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent font-outfit tracking-tight relative z-10">
                   Gaurav
                 </h1>
                 {/* Static Wavy Underline for Footer */}
                 <div className="absolute -bottom-2 left-0 w-full h-3 overflow-hidden">
                    <svg className="w-[100%] h-full absolute top-0 left-0" viewBox="0 0 100 20" preserveAspectRatio="none">
                      <path d="M0 10 Q 25 20 50 10 T 100 10" 
                            fill="none" stroke="url(#footerWaveGradient)" strokeWidth="3" strokeLinecap="round" />
                      <defs>
                         <linearGradient id="footerWaveGradient" x1="0" y1="0" x2="1" y2="0">
                           <stop offset="0%" stopColor="#DF8908" />
                           <stop offset="100%" stopColor="#B415FF" />
                         </linearGradient>
                      </defs>
                    </svg>
                 </div>
               </div>
               <p className="text-gray-400 leading-relaxed">
                 I am a Full Stack Developer from, USA with 10 years of experience in companies like Microsoft, Tesla and Apple.
               </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
               <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-full px-6 py-3 flex-1 sm:flex-none">
                  <img src={user_icon} alt="" className="h-5 w-5 opacity-50 invert" />
                  <input type="email" placeholder="Enter your email" className="bg-transparent outline-none text-white placeholder-gray-500 w-full" />
               </div>
               <button className="bg-white text-black font-bold rounded-full px-8 py-3 hover:bg-primary hover:text-white transition-colors duration-300">
                  Subscribe
               </button>
            </div>
         </div>

         <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-gray-500">
           <p>© 2025 Gaurav Pandey. All rights reserved.</p>
           <div className="flex gap-8">
             <p className="hover:text-white cursor-pointer transition-colors">Term of Services</p>
             <p className="hover:text-white cursor-pointer transition-colors">Privacy Policy</p>
             <p className="hover:text-white cursor-pointer transition-colors">Connect with me</p>
           </div>
         </div>

       </div>
    </footer>
  );
};

export default Footer;
