import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import './Hero.css';
import heroImage from '../../assets/hero/hero1.jpg';
import { Link } from 'react-router-dom';

const Hero = () => {
  const heroRef = useRef(null);
  const inView = useInView(heroRef, { once: true, amount: 0.4 });

  const fadeUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  };

  const fadeInRight = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <section id='home' className='hero' ref={heroRef}>
      <div className='row'>
        <div className='col-md-6 mb-5'>
          <motion.div
            className='hero-content'
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            transition={{ staggerChildren: 0.2 }}
          >
            <motion.p className='hero-title' variants={fadeUp} transition={{ duration: 0.6 }}>
              Welcome StarNXT
            </motion.p>
            <motion.p className='hero-subtitle' variants={fadeUp} transition={{ duration: 0.6 }}>
              Innovate. Integrate. Inspire.
            </motion.p>
            <motion.p className='hero-description' variants={fadeUp} transition={{ duration: 0.6 }}>
              At StarNXT, we are dedicated to transforming your ideas into reality through cutting-edge
              technology and innovative solutions. Join us on a journey to the future.
            </motion.p>

            <motion.div
              className='d-flex flex-row flex-wrap gap-3 mt-4'
              variants={fadeUp}
              transition={{ duration: 0.6 }}
            >
              <Link className='hero-cta-button' to={{ pathname: '/', hash: '#contact' }}>Get Started</Link>
              <Link className='hero-secondary-button' to={{ pathname: '/', hash: '#services' }}>Learn More</Link>
            </motion.div>
          </motion.div>
        </div>

        <div className='col-md-6'>
          <motion.div
            className='hero-image-container'
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            variants={fadeInRight}
            transition={{ duration: 1 }}
          >
            <img src={heroImage} alt='Hero Image' className='hero-image' />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
