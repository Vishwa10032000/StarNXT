import { useState, useMemo } from 'react';
import { MdKeyboardDoubleArrowRight } from 'react-icons/md';
import './Solutions.css';
import infrastrutureImg from '../../assets/solutions/IT-Infrastructure.jpg';
import consultingImg from '../../assets/solutions/IT-Consulting.jpg';


import {
  FaCloud, FaNetworkWired,
  FaShieldAlt, FaCode, FaUserTie,
  FaHandsHelping,
  FaChalkboardTeacher,
} from 'react-icons/fa';

import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const solutionsData = [
  // === IT Infrastructure (3 items) ===
  {
    id: 1,
    icon: FaCloud,
    color: '#f97316',
    bg: '#fff7ed',
    title: 'Modernized Infrastructure',
    description: 'Upgrade legacy servers with modern, scalable systems for high performance and reliability.',
    category: 'IT Infrastructure',
  },
  {
    id: 2,
    icon: FaNetworkWired,
    color: '#10b981',
    bg: '#ecfdf5',
    title: 'Network Optimization',
    description: 'Managed routers, switches, and firewalls for secure, optimized connectivity.',
    category: 'IT Infrastructure',
  },
  {
    id: 3,
    icon: FaShieldAlt,
    color: '#ef4444',
    bg: '#fef2f2',
    title: 'Advanced Security',
    description: 'Protect IT assets with firewalls, endpoint protection, and patch management.',
    category: 'IT Infrastructure',
  },

  // === IT Consulting (3 items) ===
  {
    id: 4,
    icon: FaCode,
    color: '#06b6d4',
    bg: '#ecfeff',
    title: 'Software Solutions',
    description: 'Custom software applications tailored to your business processes for automation and growth.',
    category: 'IT Consulting',
    highlight: true,
  },
  {
    id: 5,
    icon: FaUserTie,
    color: '#f59e0b',
    bg: '#fef3c7',
    title: 'IT Advisory',
    description: 'Expert IT advisory to align technology with your business goals and digital strategy.',
    category: 'IT Consulting',
    highlight: true,
  },
  {
    id: 6,
    icon: FaChalkboardTeacher,
    color: '#3b82f6',
    bg: '#eff6ff',
    title: 'Training & Knowledge Transfer',
    description: 'Upskill your workforce with tailored IT training and workshops.',
    category: 'IT Consulting',
  },
];


// Variants
const gridStagger = { hidden: {}, visible: { transition: { staggerChildren: 0.15 } } };
const cardFadeUp = { hidden: { opacity: 0, y: 30, scale: 0.98 }, visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: 'easeOut' } } };

const Solutions = () => {
  const categories = ['IT Infrastructure', 'IT Consulting'];
  const [selected, setSelected] = useState('IT Infrastructure');

  const filtered = useMemo(
    () => solutionsData.filter(s => s.category === selected),
    [selected]
  );

  return (
    <section id="services" className="solutions">
      {/* Header */}

      <h2 className="solutions-title">Perfect Solution for Your IT Needs 
        {/* <Link className='solutions-link' to='/services'><LuExternalLink size={24} /></Link> */}
        </h2>

      <motion.div
        className="solutions-header row"
        initial={{ opacity: 0, y: -40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className='col-lg-4 col-md-4 order-2 order-lg-1'>
          <div className="category-orbit ">
            {/* Center image switches based on selection */}
            <img
              src={selected === "IT Infrastructure" ? infrastrutureImg : consultingImg}
              alt={selected}
              className="center-image"
            />

            {/* Orbit ring – rotates when consulting is selected */}
            <div className={`orbit ${selected === "IT Consulting" ? "rot-180" : ""}`}>
              {/* Top position (0deg) */}
              <button
                type="button"
                className={`orbit-item ${selected === "IT Infrastructure" ? "active" : ""}`}
                style={{ "--deg": "0deg" }}
                onClick={() => setSelected("IT Infrastructure")}
                aria-pressed={selected === "IT Infrastructure"}
              >
                <span className="service-category-label">
                  <FaCloud className="label-icon" />
                </span>
              </button>

              {/* Bottom position (180deg) */}
              <button
                type="button"
                className={`orbit-item ${selected === "IT Consulting" ? "active" : ""}`}
                style={{ "--deg": "180deg" }}
                onClick={() => setSelected("IT Consulting")}
                aria-pressed={selected === "IT Consulting"}
              >
                <span className="service-category-label">
                  <FaHandsHelping className="label-icon" />
                </span>
              </button>
            </div>
          </div>
        </div>
        <div className='col-lg-8 col-md-8 order-1 order-lg-2'>
          <div className='d-flex flex-column justify-content-center gap-3 h-100'>
          <p className="solutions-description">
            We offer a wide range of IT services to help you navigate the digital landscape.
            From modernizing your infrastructure to expert consulting, our solutions are tailored to meet your unique business needs.
          </p>

          <div className='d-flex flex-wrap gap-2'>
            <div className="solutions-toggle" role="tablist" aria-label="Service categories">
              {categories.map(cat => (
                <button
                  key={cat}
                  role="tab"
                  aria-selected={selected === cat}
                  className={`toggle-pill ${selected === cat ? 'active' : ''}`}
                  onClick={() => setSelected(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
            {/* <motion.button
              className="solutions-cta-button"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              Explore Our Services
              <span><MdKeyboardDoubleArrowRight /></span>
            </motion.button> */}
          </div>
          </div>

        </div>

      </motion.div>

      {/* Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selected}                      // re-animate when category changes
          className="solutions-grid"
          initial="hidden"
          animate="visible"
          exit={{ opacity: 0, y: 10 }}
          variants={gridStagger}
        >
          {filtered.map(solution => {
            const Icon = solution.icon;
            return (
              <motion.div
                key={solution.id}
                className={`solution-card ${solution.highlight ? 'highlight' : ''}`}
                variants={cardFadeUp}
                whileHover={{ y: -4, boxShadow: '0 14px 30px rgba(0,0,0,0.10)' }}
                transition={{ duration: 0.25 }}
              >
                <div
                  className="solution-icon"
                  style={{ color: solution.color, backgroundColor: solution.bg }}
                >
                  <Icon size={28} />
                </div>
                <h3>{solution.title}</h3>
                <p>{solution.description}</p>
                <Link className="solution-link" to={{ pathname: '/', hash: '#contact' }}>
                  Get Started <MdKeyboardDoubleArrowRight />
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </AnimatePresence>
    </section>
  );
};

export default Solutions;
