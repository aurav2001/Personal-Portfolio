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
              <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent hover:scale-105 transition-transform duration-300 font-outfit tracking-tight">
                Gaurav
              </h1>
              <div className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              <div className="absolute -bottom-1 left-0 w-2/3 h-1 bg-gradient-to-r from-primary to-accent rounded-full opacity-50"></div>
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

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-40 transition-all duration-500 ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-2xl" onClick={closeMenu}></div>
          
          <div className={`
             absolute top-0 right-0 w-3/4 max-w-sm h-full bg-dark-bg/95 backdrop-blur-xl border-l border-white/10 shadow-2xl
             flex flex-col p-8 transition-transform duration-500 ease-out
             ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}
          `}>
             <div className="flex justify-between items-center mb-12">
               <span className="text-gray-400 text-sm tracking-widest">NAVIGATION</span>
               <button onClick={closeMenu} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-white/20 transition-colors">✕</button>
             </div>

             <ul className="flex flex-col gap-6">
               {navItems.map((item, index) => {
                  const slug = item.toLowerCase() === "portfolio" ? "work" : item.toLowerCase();
                  return (
                   <li 
                     key={item} 
                     className={`transform transition-all duration-500 ${isMobileMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}
                     style={{ transitionDelay: `${index * 100}ms` }}
                   >
                    <AnchorLink 
                      className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-gray-600 hover:from-white hover:to-white transition-all duration-300 flex items-center gap-4 group"
                      href={item.toLowerCase() === "home" ? "#home" : `#${slug}`}
                      offset={100}
                      onClick={() => { setMenu(slug); closeMenu(); }}
                    >
                      {item}
                    </AnchorLink>
                   </li>
                 )
               })}
             </ul>

             <div className="mt-auto pt-10 border-t border-white/10">
                <p className="text-gray-500 text-sm">© 2025 Gaurav Pandey</p>
                <div className="flex gap-4 mt-4">
                   <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-colors cursor-pointer border border-white/5 hover:border-primary/50">L</div>
                   <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-accent hover:text-white transition-colors cursor-pointer border border-white/5 hover:border-accent/50">G</div>
                   <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-white hover:text-black transition-colors cursor-pointer border border-white/5 hover:border-white">T</div>
                </div>
             </div>
          </div>
      </div>
    </>
  );
};

export default Navbar;