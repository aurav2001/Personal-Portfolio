import React, { useRef, useState, useEffect } from 'react';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import logo from '../assets/logo.svg';
import menu_open from '../assets/menu_open.svg';
import menu_close from '../assets/menu_close.svg';

const Navbar = () => {
  const [menu, setMenu] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openMenu = () => {
    setIsMobileMenuOpen(true);
  };

  const closeMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-dark-bg/80 backdrop-blur-md border-b border-white/10 py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* Logo */}
        <img 
          src={logo} 
          alt="Logo" 
          className="h-10 w-auto cursor-pointer hover:scale-105 transition-transform duration-300 invert brightness-0" 
        />

        {/* Desktop Menu - Wide & Single Line */}
        <ul className="hidden md:flex items-center gap-10">
          {["Home", "About", "Services", "Portfolio", "Contact"].map((item) => {
            const slug = item.toLowerCase() === "portfolio" ? "work" : item.toLowerCase();
            const href = item.toLowerCase() === "home" ? "#home" : `#${slug}`;
            
            return (
              <li key={item} className="relative group">
                <AnchorLink 
                  className={`text-lg font-medium transition-colors duration-300 ${menu === slug ? 'text-primary' : 'text-gray-400 group-hover:text-white'}`}
                  href={href}
                  offset={100}
                  onClick={() => setMenu(slug)}
                >
                  {item}
                </AnchorLink>
                {/* Active/Hover Line */}
                <span className={`absolute -bottom-2 left-0 h-0.5 bg-primary transition-all duration-300 ${menu === slug ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
              </li>
            );
          })}
        </ul>

        {/* Connect Button */}
        <div className="hidden md:block">
          <AnchorLink 
            className="px-8 py-3 rounded-full bg-gradient-to-r from-primary to-accent text-white font-semibold shadow-lg hover:shadow-primary/50 hover:-translate-y-1 transition-all duration-300"
            offset={100} 
            href='#contact'
          >
            Connect With Me
          </AnchorLink>
        </div>

        {/* Mobile Menu Toggle */}
        <img 
          src={isMobileMenuOpen ? menu_close : menu_open} 
          onClick={isMobileMenuOpen ? closeMenu : openMenu}
          alt="Menu"
          className="md:hidden block h-8 w-8 cursor-pointer invert brightness-0 z-50 transition-transform duration-300"
        />

        {/* Mobile Menu Overlay */}
        <div className={`fixed inset-0 bg-dark-bg/95 backdrop-blur-xl z-40 flex flex-col items-center justify-center gap-8 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
          {["Home", "About", "Services", "Portfolio", "Contact"].map((item) => {
            const slug = item.toLowerCase() === "portfolio" ? "work" : item.toLowerCase();
             return (
              <AnchorLink 
                key={item}
                className="text-2xl font-semibold text-white hover:text-primary transition-colors"
                href={item.toLowerCase() === "home" ? "#home" : `#${slug}`}
                offset={100}
                onClick={() => { setMenu(slug); closeMenu(); }}
              >
                {item}
              </AnchorLink>
            )
          })}
        </div>
      </div>
    </div>
  );
};

export default Navbar;