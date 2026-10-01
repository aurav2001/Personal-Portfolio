import React, { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';
  const { themeSettings, updateTheme } = useTheme();

  const toggleTheme = () => {
    if (themeSettings?.mode === 'light') {
      updateTheme({ mode: 'default', bg: '#020617' });
    } else if (themeSettings?.mode === 'default') {
      updateTheme({ mode: 'dark', bg: '#09090b' });
    } else {
      updateTheme({ mode: 'light', bg: '#f8fafc' });
    }
  };

  // Scroll listener for top navbar hide & bottom Apple dock show
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      setIsScrolled(scrollPos > 100);

      // Dynamically detect which section is currently active
      if (isHomePage) {
        const sections = ['home', 'about', 'services', 'work', 'contact'];
        for (const sectionId of [...sections].reverse()) {
          const el = document.getElementById(sectionId);
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= window.innerHeight * 0.45) {
              setActiveSection(sectionId);
              break;
            }
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]);

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

  const scrollToSection = (id) => {
    setActiveSection(id);
    if (isHomePage) {
      if (id === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    } else {
      navigate(`/#${id}`);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActiveSection('home');
  };

  // Tabs for both Top Nav and Apple Floating Dock
  const navItems = [
    {
      id: 'home',
      label: 'Home',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 sm:w-4.5 sm:h-4.5">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
          <polyline points="9 22 9 12 15 12 15 22"></polyline>
        </svg>
      )
    },
    {
      id: 'about',
      label: 'About',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 sm:w-4.5 sm:h-4.5">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
      )
    },
    {
      id: 'services',
      label: 'Services',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 sm:w-4.5 sm:h-4.5">
          <rect x="3" y="3" width="7" height="7" rx="1.5"></rect>
          <rect x="14" y="3" width="7" height="7" rx="1.5"></rect>
          <rect x="14" y="14" width="7" height="7" rx="1.5"></rect>
          <rect x="3" y="14" width="7" height="7" rx="1.5"></rect>
        </svg>
      )
    },
    {
      id: 'work',
      label: 'Work',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 sm:w-4.5 sm:h-4.5">
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
        </svg>
      )
    },
    {
      id: 'contact',
      label: 'Contact',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 sm:w-4.5 sm:h-4.5">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
      )
    }
  ];

  return (
    <>
      {/* ========================================================
          1. TOP NAVBAR (Visible at top, hides smoothly on scroll)
          ======================================================== */}
      <header
        className={`fixed top-4 left-0 right-0 z-50 transition-all duration-500 ease-in-out px-4 md:px-0 ${
          isScrolled
            ? '-translate-y-28 opacity-0 pointer-events-none'
            : 'translate-y-0 opacity-100 pointer-events-auto'
        }`}
      >
        <div className="max-w-6xl mx-auto rounded-full px-6 py-3 flex items-center justify-between transition-all duration-500 bg-transparent border border-transparent backdrop-blur-[2px]">
          {/* Logo */}
          <div className="relative group cursor-pointer" onClick={() => scrollToSection("home")}>
            <Link to="/">
              <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent hover:scale-105 transition-transform duration-300 font-outfit tracking-tight relative z-10">
                Gaurav
              </h1>
            </Link>
            {/* Wavy Underline */}
            <div className="absolute -bottom-2 left-[42%] w-[58%] h-4 overflow-hidden pointer-events-none">
              <svg className="w-full h-full absolute top-0 left-0 animate-wavy-slide-slow opacity-100"
                viewBox="0 0 100 20" preserveAspectRatio="none">
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
          <ul className="hidden md:flex items-center gap-8 bg-white/5 rounded-full px-8 py-2.5 border border-white/5 backdrop-blur-md shadow-sm">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <li key={item.id} className="relative group">
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className={`text-sm font-medium tracking-wide transition-colors duration-300 ${
                      isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                  <span
                    className={`absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-accent rounded-full transition-all duration-300 ${
                      isActive ? 'scale-100 opacity-100' : 'scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-50'
                    }`}
                  ></span>
                </li>
              );
            })}
          </ul>

          {/* Desktop Connect & Theme Switcher */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-all duration-300 text-lg hover:scale-105 active:scale-95 shadow-sm"
              title={`Theme: ${themeSettings?.mode || 'default'}. Click to switch theme`}
              aria-label="Toggle Theme"
            >
              {themeSettings?.mode === 'light' ? '☀️' : themeSettings?.mode === 'dark' ? '🌑' : '🌌'}
            </button>

            <button
              onClick={() => scrollToSection('contact')}
              className="relative px-6 py-2.5 rounded-full font-semibold text-sm overflow-hidden group bg-gradient-to-r from-primary to-accent text-white transition-all duration-300 shadow-lg hover:shadow-primary/30 hover:scale-105 active:scale-95"
            >
              <span className="relative z-10 transition-colors duration-300">Connect</span>
            </button>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden relative w-12 h-12 flex flex-col items-center justify-center gap-1.5 group z-50 rounded-full hover:bg-white/5 transition-colors duration-300"
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            <span className={`h-0.5 bg-white rounded-full transition-all duration-300 ease-out origin-center ${isMobileMenuOpen ? 'w-6 translate-y-2 rotate-45' : 'w-6'}`}></span>
            <span className={`h-0.5 bg-white rounded-full transition-all duration-300 ease-out ${isMobileMenuOpen ? 'w-6 opacity-0 translate-x-4' : 'w-4'}`}></span>
            <span className={`h-0.5 bg-white rounded-full transition-all duration-300 ease-out origin-center ${isMobileMenuOpen ? 'w-6 -translate-y-2 -rotate-45' : 'w-6'}`}></span>
          </button>
        </div>
      </header>

      {/* ========================================================
          2. APPLE FLOATING TAB BAR (DOCK)
          Appears at the bottom when scrolled down past header
          ======================================================== */}
      <aside
        aria-label="Apple Floating Navigation Dock"
        className={`fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isScrolled
            ? 'translate-y-0 opacity-100 scale-100 pointer-events-auto'
            : 'translate-y-24 opacity-0 scale-95 pointer-events-none'
        }`}
      >
        <div className="relative group">
          {/* Frosted ambient glow */}
          <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-primary/30 via-accent/30 to-primary/30 blur-xl opacity-50 group-hover:opacity-80 transition-opacity duration-500 pointer-events-none"></div>

          {/* Apple Pill Container */}
          <nav className="relative flex items-center gap-1 sm:gap-1.5 p-1.5 sm:p-2 rounded-full bg-black/75 dark:bg-black/80 backdrop-blur-2xl border border-white/20 dark:border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.2)]">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`
                    relative flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium
                    transition-all duration-300 ease-out select-none
                    ${
                      isActive
                        ? 'text-white bg-white/20 dark:bg-white/15 shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)] ring-1 ring-white/25 scale-105'
                        : 'text-gray-400 hover:text-white hover:bg-white/5 hover:scale-105'
                    }
                    active:scale-95
                  `}
                  title={item.label}
                >
                  <span className={`${isActive ? 'text-accent scale-110' : 'text-gray-400'} transition-transform duration-300`}>
                    {item.icon}
                  </span>
                  <span className="hidden sm:inline-block tracking-tight font-medium">
                    {item.label}
                  </span>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse absolute -bottom-1 left-1/2 -translate-x-1/2"></span>
                  )}
                </button>
              );
            })}

            {/* Apple Vertical Divider */}
            <div className="w-px h-5 sm:h-6 bg-white/20 dark:bg-white/15 mx-0.5 sm:mx-1"></div>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-sm sm:text-base bg-white/5 hover:bg-white/15 hover:scale-110 active:scale-95 border border-white/15 transition-all text-white shadow-sm"
              title={`Mode: ${themeSettings?.mode || 'default'}. Click to toggle`}
              aria-label="Toggle Theme"
            >
              {themeSettings?.mode === 'light' ? '☀️' : themeSettings?.mode === 'dark' ? '🌑' : '🌌'}
            </button>

            {/* Quick Scroll to Top */}
            <button
              onClick={scrollToTop}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center bg-gradient-to-r from-primary to-accent text-white hover:scale-110 active:scale-95 shadow-lg shadow-primary/20 transition-all"
              title="Scroll to Top"
              aria-label="Scroll to top"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                <polyline points="18 15 12 9 6 15"></polyline>
              </svg>
            </button>
          </nav>
        </div>
      </aside>

      {/* ========================================================
          3. MOBILE FULLSCREEN DRAWER (For top navbar hamburger)
          ======================================================== */}
      <div className={`fixed inset-0 z-50 transition-all duration-500 ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" onClick={closeMenu}></div>
        <div className={`
             absolute top-0 right-0 w-full max-w-md h-full 
             bg-gradient-to-br from-dark-bg via-dark-bg/98 to-dark-bg/95
             backdrop-blur-2xl border-l border-white/10 shadow-2xl
             flex flex-col transition-transform duration-500 ease-out
             ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}
          `}>
          <div className="flex justify-between items-center p-6 border-b border-white/5">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
              <span className="text-gray-400 text-xs font-semibold tracking-[0.3em] uppercase">Navigation</span>
            </div>
            <button onClick={closeMenu} className="w-11 h-11 rounded-xl bg-white/5 flex items-center justify-center text-white hover:bg-white/10 hover:rotate-90 transition-all duration-300 group">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 transition-transform">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          <nav className="flex-1 px-6 py-10 overflow-y-auto">
            <ul className="flex flex-col gap-2">
              {navItems.map((item, index) => {
                const isActive = activeSection === item.id;
                return (
                  <li key={item.id}
                    className={`transform transition-all duration-500 ${isMobileMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}
                    style={{ transitionDelay: `${index * 70}ms` }}
                  >
                    <button
                      className={`w-full group flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 ${
                        isActive
                          ? 'bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30 text-white font-bold'
                          : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent font-medium'
                      }`}
                      onClick={() => {
                        scrollToSection(item.id);
                        closeMenu();
                      }}
                    >
                      <div className={`${isActive ? 'text-primary scale-110' : 'text-gray-500 group-hover:text-primary'} transition-all duration-300`}>
                        {item.icon}
                      </div>
                      <span className="text-xl">{item.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="p-6 border-t border-white/5 space-y-3">
            <button
              onClick={toggleTheme}
              className="w-full py-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium flex items-center justify-center gap-3 transition-all"
            >
              <span>{themeSettings?.mode === 'light' ? '☀️' : themeSettings?.mode === 'dark' ? '🌑' : '🌌'}</span>
              <span className="text-sm">Theme: {themeSettings?.mode ? themeSettings.mode.toUpperCase() : 'DEFAULT'}</span>
            </button>

            <button
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-primary to-accent text-white font-bold text-center flex items-center justify-center gap-2 hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] transition-all duration-300"
              onClick={() => {
                scrollToSection('contact');
                closeMenu();
              }}
            >
              <span>Let's Connect</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
