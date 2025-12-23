import React, { useState, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import ErrorBoundary from './Components/ErrorBoundary';
import WavyBackground from './Components/WavyBackground/WavyBackground';
import SocialAssistant from './Components/SocialAssistant';
import './index.css';

// Lazy Load Components
const Hero = lazy(() => import('./Components/Hero/Hero'));
const About = lazy(() => import('./Components/About/About'));
const Services = lazy(() => import('./Components/Services/Services'));
const MyWork = lazy(() => import('./Components/MyWork/MyWork'));
const Contact = lazy(() => import('./Components/contact/Contact'));
const Footer = lazy(() => import('./Components/Footer/Footer'));
const AboutDetails = lazy(() => import('./Components/AboutDetails'));

// Loading Fallback
const Loading = () => (
  <div style={{ 
    height: '100vh', 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center',
    background: 'white',
    color: 'var(--color-primary)'
  }}>
    <div className="loader">Loading...</div>
  </div>
);

const App = () => {
  const [showButton, setShowButton] = useState(false);

  // Show button when scrollY > 300
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <BrowserRouter>
      <div>
        <WavyBackground />
        <Navbar />
        <SocialAssistant />
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route
              path="/"
              element={
                <ErrorBoundary>
                  <Hero />
                  <About />
                  <Services />
                  <MyWork />
                  <Contact />
                  <Footer />
                </ErrorBoundary>
              }
            />
            <Route
              path="/about-details"
              element={
                <ErrorBoundary>
                  <AboutDetails />
                  <Footer />
                </ErrorBoundary>
              }
            />
            <Route path="/about" element={<AboutDetails />} />
          </Routes>
        </Suspense>

        {/* Back to Top Button */}
        {showButton && (
          <button className="back-to-top" onClick={scrollToTop}>
            ↑
          </button>
        )}
      </div>
    </BrowserRouter>
  );
};

export default App;
