import React, { useRef, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import './Navbar.css';
import logo from '../assets/logo.png';
import underline from '../assets/nav_underline.svg';
import menu_open from '../assets/menu_open.svg';
import menu_close from '../assets/menu_close.svg';

const Navbar = () => {
  const [menu, setMenu] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef();
  const openIconRef = useRef();
  const location = useLocation();

  const openMenu = () => {
    menuRef.current.classList.add('active');
    if (openIconRef.current) {
      openIconRef.current.style.display = 'none';
    }
  };

  const closeMenu = () => {
    menuRef.current.classList.remove('active');
    if (openIconRef.current) {
      openIconRef.current.style.display = 'block';
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    const handleResize = () => {
      if (window.innerWidth > 768 && menuRef.current) {
        menuRef.current.classList.remove('active');
        if (openIconRef.current) {
          openIconRef.current.style.display = 'none';
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const navItems = [
    { name: "home", label: "Home", href: "#home" },
    { name: "about", label: "About Me", href: "#about" },
    { name: "services", label: "Services", href: "#services" },
    { name: "portfolio", label: "Portfolio", href: "#work" },
    { name: "contact", label: "Contact Us", href: "#contact" },
  ];

  return (
    <div className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <img src={logo} alt="Logo" />
      <img
        src={menu_open}
        onClick={openMenu}
        alt="Open Menu"
        className='nav-mob-open'
        ref={openIconRef}
      />
      <ul ref={menuRef} className='nav-menu'>
        <img src={menu_close} onClick={closeMenu} alt="Close Menu" className="nav-mob-close" />
        {navItems.map((item) => (
          <li key={item.name}>
            {location.pathname === '/' ? (
              <AnchorLink
                className='anchor-link'
                offset={50}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  setMenu(item.name);
                  closeMenu();
                  const element = document.querySelector(item.href);
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
              >
                <p>{item.label}</p>
              </AnchorLink>
            ) : (
              <Link
                to={`/${item.href}`}
                className='anchor-link'
                onClick={() => {
                  setMenu(item.name);
                  closeMenu();
                }}
              >
                <p>{item.label}</p>
              </Link>
            )}
            {menu === item.name ? <img src={underline} alt='' /> : null}
          </li>
        ))}
      </ul>
      <div className="nav-connect">
        {location.pathname === '/' ? (
          <AnchorLink
            className='anchor-link'
            offset={50}
            href='#contact'
            onClick={() => {
              setMenu("contact");
              closeMenu();
            }}
          >
            Connect with me
          </AnchorLink>
        ) : (
          <Link
            to="/#contact"
            className='anchor-link'
            onClick={() => {
              setMenu("contact");
              closeMenu();
            }}
          >
            Connect with me
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;