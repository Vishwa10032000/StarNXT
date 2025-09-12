import { Link } from 'react-router-dom'
import './Footer.css'
import StarNXTLogo from '../../../assets/StarNXTLogo.svg'
import { motion } from 'framer-motion'
import { FaEnvelope, FaFacebook, FaInstagram, FaLinkedin, FaMapMarkerAlt, FaPhoneAlt, FaTwitter } from 'react-icons/fa'

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.08 },
  },
}

const itemUp = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1, y: 0,
    transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] },
  },
}

const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <motion.footer
      className="footer"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
    >
      <div className="row">
        <div className="col-lg-6 col-md-6 col-12 mb-3">
          <motion.img
            src={StarNXTLogo}
            className="footer-logo"
            alt="StarNXT Logo"
            variants={itemUp}
          />
          <motion.p className="footer-description" variants={itemUp}>
            StarNXT is your trusted partner in IT solutions, dedicated to driving innovation and excellence. We specialize in delivering cutting-edge technology services that empower businesses to thrive in a digital world.
          </motion.p>
        </div>

        <div className="col-lg-2 col-md-6 col-6 mb-3">
          <motion.nav
            className="footer-link"
            aria-label="Footer navigation"
            variants={itemUp}
          >
            <motion.h5 className="footer-title" variants={itemUp}>
              Quick Links
            </motion.h5>
            <div className="d-flex flex-wrap flex-column ">
              {/* Use pathname + hash so these work from any route */}
              <Link className="footer-link" to={{ pathname: '/', hash: '#home' }}>Home</Link>
              <Link className="footer-link" to={{ pathname: '/', hash: '#about' }}>About</Link>
              <Link className="footer-link" to={{ pathname: '/', hash: '#services' }}>Services</Link>
              <Link className="footer-link" to={{ pathname: '/', hash: '#contact' }}>Contact</Link>
            </div>
          </motion.nav>
        </div>

        <div className="col-lg-2 col-md-6 col-6 mb-3">
          <motion.nav
            className="footer-link"
            aria-label="Social media links"
            variants={itemUp}
          >
            <motion.h5 className="footer-title" variants={itemUp}>
              Follow Us
            </motion.h5>

            <div className="d-flex flex-wrap flex-column">
              <a
                className="footer-link"
                href="https://www.linkedin.com/company/starnxt"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin className="social-icon" /> LinkedIn
              </a>
              <a
                className="footer-link"
                href="https://twitter.com/StarNXT1"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTwitter className="social-icon" /> Twitter
              </a>
              <a
                className="footer-link"
                href="https://www.facebook.com/StarNXT-104632308835707"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebook className="social-icon" /> Facebook
              </a>
              <a
                className="footer-link"
                href="https://www.instagram.com/starnxt1/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram className="social-icon" /> Instagram
              </a>
            </div>
          </motion.nav>
        </div>

        <div className="col-lg-2 col-md-6 col-12 mb-3">
          <motion.div className="footer-contact" variants={itemUp}>
            <motion.h5 className="footer-title" variants={itemUp}>
              Our Address
            </motion.h5>


            <motion.address className="footer-address" variants={itemUp}>
              <p>
                <FaMapMarkerAlt className="contact-icon" />
                123 StarNXT Lane,<br />
                Tech City, TX 75001<br />
                United States
              </p>

              <p>
                <FaPhoneAlt className="contact-icon" />
                <a className="footer-link" href="tel:+1234567890">+1 (234) 567-890</a>
              </p>

              <p>
                <FaEnvelope className="contact-icon" />
                <a className="footer-link" href="mailto:QHf2o@example.com">contact@starnxt.co</a>
              </p>
            </motion.address>

          </motion.div>
        </div>

        {/* <motion.h1 className="footer-title" variants={itemUp}>STARNXT</motion.h1> */}


      </div>

      <div className="row">
        <div className="col-md-7 mb-2">
          <motion.span className="footer-copyright" variants={itemUp}>
            © {year} StarNXT. All rights reserved.
          </motion.span>
        </div>
        <div className="col-md-5">
          <motion.span
            className="d-flex gap-3 flex-wrap justify-content-between"
            variants={itemUp}
          >
            <Link className="footer-copyright" to="/terms">Terms of Service</Link>
            <Link className="footer-copyright" to="/privacy">Privacy Policy</Link>
          </motion.span>
        </div>
      </div>
    </motion.footer>
  )
}

export default Footer
