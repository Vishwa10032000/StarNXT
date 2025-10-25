import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { RiDoubleQuotesL } from 'react-icons/ri';
import './Testimonial.css';
import { useRef, useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const testimonials = [
  { name: "John Doe", role: "CEO, Example Company", img: "https://randomuser.me/api/portraits/men/1.jpg", text: "StarNXT transformed our IT infrastructure with their innovative solutions. Their team is knowledgeable, responsive, and a pleasure to work with. Highly recommended!" },
  { name: "Jane Smith", role: "CTO, FutureTech Inc.", img: "https://randomuser.me/api/portraits/women/2.jpg", text: "Reliable, scalable, and cutting-edge — StarNXT helped us modernize our entire backend infrastructure." },
  { name: "Michael Johnson", role: "Operations Head, CloudCore", img: "https://randomuser.me/api/portraits/men/3.jpg", text: "The team at StarNXT was quick to understand our needs and deliver tailored IT solutions with minimal downtime." },
  { name: "Emily Williams", role: "Founder, HealthSync", img: "https://randomuser.me/api/portraits/women/4.jpg", text: "Professional, prompt, and friendly. Our app launch wouldn’t have been possible without StarNXT." },
  { name: "David Brown", role: "IT Manager, NexaSoft", img: "https://randomuser.me/api/portraits/men/5.jpg", text: "From server maintenance to cybersecurity audits — they handle it all like pros!" },
  { name: "Sophia Taylor", role: "Marketing Lead, ByteLeap", img: "https://randomuser.me/api/portraits/women/6.jpg", text: "Loved their UI/UX design input along with robust API integrations. Truly full-service!" },
  { name: "Daniel Anderson", role: "Tech Director, VertoHub", img: "https://randomuser.me/api/portraits/men/7.jpg", text: "Excellent customer support. We had a minor server crash and StarNXT fixed it within minutes." },
  { name: "Olivia Martinez", role: "COO, SyncPulse", img: "https://randomuser.me/api/portraits/women/8.jpg", text: "StarNXT’s attention to detail and modern IT practices helped us scale fast without breaking things." },
];

// pastel gradients
const pastelGradients = [
  "linear-gradient(135deg, #fbc2eb, #a6c1ee)",   // pink → lavender
  "linear-gradient(135deg, #ffd6a5, #cdb4db)",   // peach → lilac
  "linear-gradient(135deg, #b8f2e6, #ffccd5)",   // mint → pink
  "linear-gradient(135deg, #a0c4ff, #ffc6ff)",   // sky blue → blush
  "linear-gradient(135deg, #fdcfe8, #ffe29f, #ffa99f)", // sunset pastel
];


const AUTOPLAY_MS = 10000;
const GAP_FALLBACK = 20;

const headerVariants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.98 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, delay: i * 0.06 }
  }),
};

const Testimonial = () => {
  const containerRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const getStep = () => {
    const el = containerRef.current;
    const card = el?.querySelector('.testimonial-card');
    if (!el || !card) return 350;
    const styles = getComputedStyle(el);
    const gap =
      parseFloat(styles.columnGap || styles.gap || `${GAP_FALLBACK}`) || GAP_FALLBACK;
    return card.offsetWidth + gap;
  };

  // buttons
  const scrollByStep = (dir = 'right') => {
    const el = containerRef.current;
    if (!el) return;
    const step = getStep();
    el.scrollBy({ left: dir === 'left' ? -step : step, behavior: 'smooth' });
  };

  // autoplay (pauses when hovered/tab hidden/unfocused; respects reduced motion)
  useEffect(() => {
    const el = containerRef.current;
    if (!el || prefersReducedMotion) return;

    let id;
    const visibility = { visible: document.visibilityState === 'visible' };
    const focus = { focused: document.hasFocus() };
    const shouldPause = () => hovered || !visibility.visible || !focus.focused;

    const tick = () => {
      if (shouldPause()) return;
      const step = getStep();
      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 2;
      if (atEnd) el.scrollTo({ left: 0, behavior: 'smooth' });
      else el.scrollBy({ left: step, behavior: 'smooth' });
    };

    id = setInterval(tick, AUTOPLAY_MS);

    const onVis = () => { visibility.visible = document.visibilityState === 'visible'; };
    const onFocus = () => { focus.focused = true; };
    const onBlur = () => { focus.focused = false; };

    document.addEventListener('visibilitychange', onVis);
    window.addEventListener('focus', onFocus);
    window.addEventListener('blur', onBlur);

    return () => {
      clearInterval(id);
      document.removeEventListener('visibilitychange', onVis);
      window.removeEventListener('focus', onFocus);
      window.removeEventListener('blur', onBlur);
    };
  }, [hovered, prefersReducedMotion]);

  return (
    <div className='d-flex justify-content-center'>
      <motion.div
        className="testimonial"
        initial="hidden"
        animate="show"
        variants={{ show: { transition: { staggerChildren: 0.05 } } }}
      >
        {/* Header */}
        <motion.div
          className="d-flex flex-wrap gap-3 justify-content-between align-items-center"
          variants={headerVariants}
        >
          <div className='position-relative'>
            <motion.div
              className='quote'
              initial={{ opacity: 0, y: 8, rotate: -6 }}
              animate={{ opacity: 0.5, y: 0, rotate: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <RiDoubleQuotesL size={32} />
            </motion.div>
            <motion.h2
              className="testimonial-title mb-4"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              What Our Clients Say
            </motion.h2>
          </div>

          <div className="d-flex align-items-center gap-1 mb-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="testimonial-button testimonial-button-left"
              aria-label="Previous testimonial"
              onClick={() => scrollByStep('left')}
            >
              <FaArrowLeft />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="testimonial-button testimonial-button-right"
              aria-label="Next testimonial"
              onClick={() => scrollByStep('right')}
            >
              <FaArrowRight />
            </motion.button>
          </div>
        </motion.div>

        {/* Cards rail */}
        <div
          className="testimonial-cards"
          ref={containerRef}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {testimonials.map((t, i) => (
  <motion.div
    className="testimonial-card"
    key={i}
    style={{ background: pastelGradients[i % pastelGradients.length] }}
    custom={i}
    variants={cardVariants}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, amount: 0.35 }}
    transition={{ type: 'spring', stiffness: 280, damping: 24 }}
  >
    <div>
      <h3>Outstanding IT Solutions and Service</h3>
      <p className="testimonial-text">"{t.text}"</p>
    </div>
    <div className="testimonial-client">
      <img src={t.img} alt={`Photo of ${t.name}`} className="testimonial-client-image" />
      <div className="testimonial-client-info">
        <p className="testimonial-client-name">{t.name}</p>
        <p className="testimonial-client-role">{t.role}</p>
      </div>
    </div>
  </motion.div>
))}

        </div>
      </motion.div>
    </div>
  );
};

export default Testimonial;
