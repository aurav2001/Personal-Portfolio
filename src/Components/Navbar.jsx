import React, { useState, useEffect } from 'react';
import AnchorLink from 'react-anchor-link-smooth-scroll';

const Navbar = () => {
  const [menu, setMenu] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (!isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  };

  const closeMenu = () => {
    setIsMobileMenuOpen(false);
    document.body.style.overflow = 'unset';
  };

  const navItems = ["Home", "About", "Services", "Portfolio", "Contact"];

  return (
    <>
      <div className={`fixed top-4 left-0 right-0 z-50 transition-all duration-300 px-4 md:px-0`}>
         <div className={`
            max-w-6xl mx-auto rounded-full px-6 py-3
            flex items-center justify-between
            transition-all duration-500
            ${isScrolled 
              ? 'bg-dark-bg/70 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)]' 
              : 'bg-transparent border border-transparent backdrop-blur-[2px]'
            }
         `}>
            {/* Logo */}
            <div className="relative group cursor-pointer" onClick={() => setMenu("home")}>
              <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent hover:scale-105 transition-transform duration-300 font-outfit tracking-tight relative z-10">
                Gaurav
              </h1>
              {/* Wavy Underline */}
              {/* Underline: Starts from 'u' (approx 40%) to 'v' (end) */}
              <div className="absolute -bottom-2 left-[42%] w-[58%] h-4 overflow-hidden pointer-events-none">
                <svg className="w-full h-full absolute top-0 left-0 animate-wavy-slide-slow opacity-100" 
                     viewBox="0 0 100 20" preserveAspectRatio="none">
                  {/* Tapered Wave: Thick end */}
                  <path d="M 0 10 Q 25 10 50 10 Q 75 10 100 10 L 100 15 Q 75 20 50 15 Q 25 12 0 10 Z" 
                        fill="url(#waveGradient)" />
                   <defs>
                     <linearGradient id="waveGradient" x1="0" y1="0" x2="1" y2="0">
                       <stop offset="0%" stopColor="#DF8908" />
                       <stop offset="50%" stopColor="#B415FF" />
                       <stop offset="100%" stopColor="#DF8908" />
                     </linearGradient>
                   </defs>
                </svg>
              </div>
            </div>

            {/* Desktop Menu */}
            <ul className="hidden md:flex items-center gap-8 bg-white/5 rounded-full px-8 py-2 border border-white/5 backdrop-blur-sm">
              {navItems.map((item) => {
                const slug = item.toLowerCase() === "portfolio" ? "work" : item.toLowerCase();
                const href = item.toLowerCase() === "home" ? "#home" : `#${slug}`;
                
                return (
                  <li key={item} className="relative group">
                    <AnchorLink 
                      className={`text-sm font-medium tracking-wide transition-colors duration-300 ${menu === slug ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}
                      href={href}
                      offset={100}
                      onClick={() => setMenu(slug)}
                    >
                      {item}
                    </AnchorLink>
                    <span className={`absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-accent rounded-full transition-all duration-300 ${menu === slug ? 'scale-100 opacity-100' : 'scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-50'}`}></span>
                  </li>
                );
              })}
            </ul>

            {/* Desktop Connect */}
            <div className="hidden md:block">
              <AnchorLink 
                className={`
                  relative px-6 py-2.5 rounded-full font-semibold text-sm overflow-hidden group
                  ${isScrolled ? 'bg-white text-black' : 'bg-gradient-to-r from-primary to-accent text-white'}
                  transition-all duration-300 shadow-lg
                `}
                offset={100} 
                href='#contact'
              >
                  <span className="relative z-10 transition-colors duration-300 group-hover:text-white">Connect</span>
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-0"></div>
                  {isScrolled && <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></div>}
              </AnchorLink>
            </div>

            {/* REDESIGNED HAMBURGER (Clean & Simple) */}
            <button 
              className="md:hidden relative w-12 h-12 flex flex-col items-center justify-center gap-1.5 group z-50 rounded-full hover:bg-white/5 transition-colors duration-300"
              onClick={toggleMenu}
              aria-label="Toggle Menu"
            >
               {/* Top Line */}
               <span className={`h-0.5 bg-white rounded-full transition-all duration-300 ease-out origin-center ${isMobileMenuOpen ? 'w-6 translate-y-2 rotate-45' : 'w-6'}`}></span>
               
               {/* Middle Line (Fades out) */}
               <span className={`h-0.5 bg-white rounded-full transition-all duration-300 ease-out ${isMobileMenuOpen ? 'w-6 opacity-0 translate-x-4' : 'w-4'}`}></span>
               
               {/* Bottom Line */}
               <span className={`h-0.5 bg-white rounded-full transition-all duration-300 ease-out origin-center ${isMobileMenuOpen ? 'w-6 -translate-y-2 -rotate-45' : 'w-6'}`}></span>
            </button>
         </div>
      </div>

      {/* Mobile Menu Overlay - REDESIGNED */}
      <div className={`fixed inset-0 z-40 transition-all duration-500 ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
          {/* Enhanced Backdrop Blur */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" onClick={closeMenu}></div>
          
          {/* Slide-in Menu Panel */}
          <div className={`
             absolute top-0 right-0 w-full max-w-md h-full 
             bg-gradient-to-br from-dark-bg via-dark-bg/98 to-dark-bg/95
             backdrop-blur-2xl border-l border-white/10 shadow-2xl
             flex flex-col transition-transform duration-500 ease-out
             ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}
          `}>
             {/* Header */}
             <div className="flex justify-between items-center p-6 border-b border-white/5">
               <div className="flex items-center gap-3">
                 <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                 <span className="text-gray-400 text-xs font-semibold tracking-[0.3em] uppercase">Menu</span>
               </div>
               <button 
                 onClick={closeMenu} 
                 className="w-11 h-11 rounded-xl bg-white/5 flex items-center justify-center text-white hover:bg-white/10 hover:rotate-90 transition-all duration-300 group"
               >
                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 transition-transform">
                   <line x1="18" y1="6" x2="6" y2="18"></line>
                   <line x1="6" y1="6" x2="18" y2="18"></line>
                 </svg>
               </button>
             </div>

             {/* Navigation Links */}
             <nav className="flex-1 px-6 py-10 overflow-y-auto">

               <ul className="flex flex-col gap-2">
                 {navItems.map((item, index) => {
                    const slug = item.toLowerCase() === "portfolio" ? "work" : item.toLowerCase();
                    const isActive = menu === slug;
                    
                    // Icon mapping
                    const icons = {
                      'home': <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>,
                      'about': <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>,
                      'services': <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>,
                      'work': <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>,
                      'contact': <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                    };
                    
                    return (
                     <li 
                       key={item} 
                       className={`transform transition-all duration-500 ${isMobileMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}
                       style={{ transitionDelay: `${index * 80}ms` }}
                     >
                      <AnchorLink 
                        className={`
                          group flex items-center gap-4 px-5 py-4 rounded-2xl
                          transition-all duration-300
                          ${isActive 
                            ? 'bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30 text-white' 
                            : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'
                          }
                        `}
                        href={item.toLowerCase() === "home" ? "#home" : `#${slug}`}
                        offset={100}
                        onClick={() => { setMenu(slug); closeMenu(); }}
                      >
                        <div className={`${isActive ? 'text-primary' : 'text-gray-500 group-hover:text-primary'} transition-colors duration-300`}>
                          {icons[slug]}
                        </div>
                        <span className="text-xl font-bold">{item}</span>
                        <svg 
                          className={`ml-auto transition-transform duration-300 ${isActive ? 'translate-x-0 opacity-100' : 'translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100'}`}
                          width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                        >
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                          <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                      </AnchorLink>
                     </li>
                   )
                 })}
               </ul>
             </nav>

             {/* Footer - Connect Button */}
             <div className="p-6 border-t border-white/5">
               <AnchorLink 
                 className="w-full py-4 rounded-2xl bg-gradient-to-r from-primary to-accent text-white font-bold text-center flex items-center justify-center gap-2 hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] transition-all duration-300 group"
                 offset={100} 
                 href='#contact'
                 onClick={closeMenu}
               >
                 <span>Let's Connect</span>
                 <svg className="group-hover:translate-x-1 transition-transform" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                   <line x1="5" y1="12" x2="19" y2="12"></line>
                   <polyline points="12 5 19 12 12 19"></polyline>
                 </svg>
               </AnchorLink>
             </div>
          </div>
      </div>
    </>
  );
};

export default Navbar;