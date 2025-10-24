import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Hero from './Components/Hero/Hero';
import About from './Components/About/About';
import Services from './Components/Services/Services';
import MyWork from './Components/MyWork/MyWork';
import Contact from './Components/contact/Contact';
import Footer from './Components/Footer/Footer';
import AboutDetails from './Components/AboutDetails'; // New component for /about-details
import ErrorBoundary from './Components/ErrorBoundary'; // Error boundary for robustness
import './index.css';

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
        <Navbar />
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
        </Routes>

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
