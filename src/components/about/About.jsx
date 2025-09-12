import './About.css';
import { motion } from 'framer-motion';
import aboutImage from '../../assets/about/aboutImg.jpg';

const container = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1, y: 0,
    transition: { duration: 0.5, ease: 'easeOut' }
  }
};

const staggerCol = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 }
  }
};

const item = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } }
};

const imageVar = {
  hidden: { opacity: 0, scale: 0.94, rotate: -2 },
  show:   { opacity: 1, scale: 1,    rotate: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

const About = () => {
  return (
    <motion.section
    id='about'
      className='about'
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      variants={staggerCol}
    >
      <motion.h2 className='about-title' variants={container}>
        Who are we
      </motion.h2>

      <motion.p className='about-description' variants={container}>
        We are a company dedicated to providing the best services to our customers.
      </motion.p>

      <div className='row g-4 align-items-center'>
        {/* Left column */}

        <motion.div className='col-md-6' variants={item}>
          <motion.div
            className='about-image-container'
            variants={imageVar}
            whileHover={{ y: -6, scale: 1.02, boxShadow: '0 12px 30px rgba(0,0,0,.15)' }}
            transition={{ type: 'spring', stiffness: 260, damping: 22 }}
          >
            <img
              // src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1170&q=80"
              src={aboutImage}
              alt="About Us"
              className='about-image'
              loading='lazy'
              decoding='async'
            />
          </motion.div>
        </motion.div>

        {/* Right column */}
        <motion.div className='col-md-6' variants={staggerCol}>
          <motion.h2 className='about-section-title' variants={item}>
            Helping Businesses Thrive in the Digital Age
          </motion.h2>

          <motion.p className='about-section-description' variants={item}>
            At StarNXT, we specialize in delivering innovative IT solutions that empower businesses to excel in today's fast-paced digital landscape. Our team of experts is committed to providing top-notch services tailored to meet the unique needs of each client.
          </motion.p>

          <motion.div variants={item}>
            <h3 className='about-subtitle'>Our Values</h3>
            <motion.ul className='about-values-list' variants={staggerCol}>
              <motion.li variants={item}><span>Integrity:</span> We uphold the highest standards of integrity in all our actions.</motion.li>
              <motion.li variants={item}><span>Excellence:</span> We strive for excellence in everything we do.</motion.li>
              <motion.li variants={item}><span>Collaboration:</span> We value collaboration and teamwork.</motion.li>
            </motion.ul>
          </motion.div>
        </motion.div>

        
      </div>
    </motion.section>
  );
};

export default About;
