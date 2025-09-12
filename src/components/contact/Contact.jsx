import './Contact.css'
import contactImage from '../../assets/contact/contactImage.png'
import { motion } from 'framer-motion'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
}

const Contact = () => {
  return (
    <motion.section
      id="contact"
      className="contact"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
    >
      <div className="row">
        {/* Image */}
        <motion.div
          className="col-md-6 mb-2"
          variants={itemVariants}
        >
          <div className="contact-image-container">
            <motion.img
              src={contactImage}
              alt="Contact"
              className="contact-image"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            />
          </div>
        </motion.div>

        {/* Form */}
        <motion.div
          className="col-md-6 mb-2"
          variants={itemVariants}
        >
          <div className="contact-form-container">
            <motion.h2 className="contact-title" variants={itemVariants}>
              Get in Touch with Us
            </motion.h2>
            <motion.p className="contact-description" variants={itemVariants}>
              We would love to hear from you! Whether you have a question, feedback, 
              or just want to say hello, our friendly team is here to assist you.
            </motion.p>

            <motion.form className="contact-form" variants={containerVariants}>
              <div className="row">
                {[
                  { type: 'text', placeholder: 'Company', col: 'col-md-6' },
                  { type: 'text', placeholder: 'Your Name', col: 'col-md-6' },
                  { type: 'text', placeholder: 'Phone Number', col: 'col-md-6' },
                  { type: 'email', placeholder: 'Email', col: 'col-md-6' },
                ].map((field, i) => (
                  <motion.div className={`${field.col} mb-3`} key={i} variants={itemVariants}>
                    <input type={field.type} placeholder={field.placeholder} className="contact-input" />
                  </motion.div>
                ))}

                <motion.div className="col-md-12 mb-3" variants={itemVariants}>
                  <textarea placeholder="How can we help you?" className="contact-input" />
                </motion.div>

                <motion.div className="col-md-12 mb-3" variants={itemVariants}>
                  <div className="contact-checkbox-container">
                    <input type="checkbox" className="contact-checkbox" /> I agree to the{' '}
                    <a href="#">Terms and Conditions</a>
                  </div>
                </motion.div>

                <motion.div className="col-md-12 mb-3" variants={itemVariants}>
                  <div className="d-flex align-items-center justify-content-center">
                    <motion.button
                      className="contact-btn"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Submit
                    </motion.button>
                  </div>
                </motion.div>
              </div>
            </motion.form>
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}

export default Contact
