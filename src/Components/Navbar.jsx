import React, { useState, useEffect } from 'react';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import logo from '../assets/logo.svg';

const Navbar = () => {
  const [menu, setMenu] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Trigger glass effect earlier
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    // Lock body scroll when menu is open
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
      {/* 
        Floating Navbar Container 
        - Centered with margins
        - Rounded curves (rounded-full)
        - Glassmorphism always active or stronger on scroll
      */}
      <div className={`
        fixed top-4 left-0 right-0 z-50 transition-all duration-300 px-4 md:px-0
      `}>
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
            <img 
              src={logo} 
              alt="Logo" 
              className="h-8 md:h-10 w-auto cursor-pointer hover:scale-105 transition-transform duration-300 invert brightness-0" 
            />

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
                    {/* Dot Indicator */}
                    <span className={`absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-accent rounded-full transition-all duration-300 ${menu === slug ? 'scale-100 opacity-100' : 'scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-50'}`}></span>
                  </li>
                );
              })}
            </ul>

            {/* Connect Button (Desktop) */}
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
                  {/* Button Content */}
                  <span className="relative z-10 transition-colors duration-300 group-hover:text-white">Connect</span>
                  
                  {/* Hover Bloom */}
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-0"></div>
                  {/* Gradient underlying layer for the white button state */}
                  {isScrolled && <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></div>}
              </AnchorLink>
            </div>

            {/* Hamburger Icon (Animated) */}
            <button 
              className="md:hidden relative w-10 h-10 flex flex-col items-center justify-center gap-1.5 group z-50 bg-white/10 rounded-full border border-white/10 backdrop-blur-md"
              onClick={toggleMenu}
            >
               <span className={`w-5 h-0.5 bg-white rounded-full transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
               <span className={`w-5 h-0.5 bg-white rounded-full transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
               <span className={`w-5 h-0.5 bg-white rounded-full transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </button>
         </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-40 transition-all duration-500 ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-2xl" onClick={closeMenu}></div>
          
          {/* Menu Content */}
          <div className={`
             absolute top-0 right-0 w-3/4 max-w-sm h-full bg-dark-bg/90 backdrop-blur-xl border-l border-white/10 shadow-2xl
             flex flex-col p-8 transition-transform duration-500 ease-out
             ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}
          `}>
             <div className="flex justify-end mb-12">
               {/* Close button is handled by the main hamburger toggle which stays visible, but we can add branding here */}
               <img src={logo} alt="Logo" className="h-8 w-auto invert brightness-0" />
             </div>

             <ul className="flex flex-col gap-8">
               {navItems.map((item, index) => {
                  const slug = item.toLowerCase() === "portfolio" ? "work" : item.toLowerCase();
                  return (
                   <li 
                     key={item} 
                     className={`transform transition-all duration-500 ${isMobileMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}
                     style={{ transitionDelay: `${index * 100}ms` }}
                   >
                    <AnchorLink 
                      className="text-3xl font-bold text-gray-300 hover:text-white transition-colors flex items-center gap-4 group"
                      href={item.toLowerCase() === "home" ? "#home" : `#${slug}`}
                      offset={100}
                      onClick={() => { setMenu(slug); closeMenu(); }}
                    >
                      <span className="text-sm font-light text-primary opacity-50 group-hover:opacity-100 transition-opacity">0{index + 1}</span>
                      {item}
                    </AnchorLink>
                   </li>
                 )
               })}
             </ul>

             {/* Footer Info in Menu */}
             <div className="mt-auto pt-10 border-t border-white/10">
                <p className="text-gray-500 text-sm">© 2025 Gaurav Pandey</p>
                <div className="flex gap-4 mt-4">
                   {/* Social Placeholder Icons */}
                   <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-colors cursor-pointer">L</div>
                   <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-accent hover:text-white transition-colors cursor-pointer">G</div>
                   <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-white hover:text-black transition-colors cursor-pointer">T</div>
                </div>
             </div>
          </div>
      </div>
    </>
  );
};

export default Navbar;