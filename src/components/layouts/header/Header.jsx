import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { HiOutlineMenuAlt1 } from 'react-icons/hi';
import { RiCloseLargeFill } from 'react-icons/ri';
import logo from '../../../assets/StarNXTLogo.svg';
import './Header.css';

import { motion } from 'framer-motion';
import { FaEnvelope } from 'react-icons/fa';
import { MdKeyboardDoubleArrowRight } from 'react-icons/md';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname, location.hash]);

  // Compare current route + hash
  const isActive = (path) => {
    const current = location.pathname + location.hash;
    return current === path;
  };

  return (
    <motion.div
      className="header"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <Link to={{ pathname: '/', hash: '#home' }} aria-label="StarNXT Home">
        <img src={logo} alt="StarNXT Logo" height={55} />
      </Link>

      <nav
        id="primary-navigation"
        className={isMenuOpen ? 'nav-links active' : 'nav-links'}
        aria-label="Main"
      >
        <Link className={(isActive('/#home') || isActive('/')) ? 'active' : ''} aria-current={isActive('/#home') ? 'active' : ''} to={{ pathname: '/', hash: '#home' }} >Home</Link>
        <Link className={isActive('/#about') ? 'active' : ''} to={{ pathname: '/', hash: '#about' }}>About us</Link>
        <Link className={isActive('/#services') ? 'active' : ''} to={{ pathname: '/', hash: '#services' }}>Services</Link>
      </nav>

      <Link className="text-decoration-none" to={{ pathname: '/', hash: '#contact' }}>
        <button className='contact-button'>
          Contact us <span><MdKeyboardDoubleArrowRight /></span>
        </button>
      </Link>

      <div className='menu'>
        <button
          className="menu-icon"
          onClick={() => setIsMenuOpen(prev => !prev)}
          aria-controls="primary-navigation"
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          type="button"
        >
          {isMenuOpen ? <RiCloseLargeFill size={30} /> : <HiOutlineMenuAlt1 size={30} />}
        </button>
        <Link className="text-decoration-none" to={{ pathname: '/', hash: '#contact' }}>
          <button className='mobile-contact-button' aria-label="Contact us">
            <FaEnvelope size={30} />
          </button>
        </Link>
      </div>
    </motion.div>
  );
};

export default Header;
