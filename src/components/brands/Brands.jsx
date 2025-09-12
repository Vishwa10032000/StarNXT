import './Brands.css';
import { motion, useMotionValue, useAnimationFrame, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const logos = [
  { src: 'https://logo.clearbit.com/amazon.com', alt: 'Amazon' },
  { src: 'https://logo.clearbit.com/microsoft.com', alt: 'Microsoft' },
  { src: 'https://logo.clearbit.com/apple.com', alt: 'Apple' },
  { src: 'https://logo.clearbit.com/netflix.com', alt: 'Netflix' },
  { src: 'https://logo.clearbit.com/oracle.com', alt: 'Oracle' },
  { src: 'https://logo.clearbit.com/intel.com', alt: 'Intel' },
  { src: 'https://logo.clearbit.com/samsung.com', alt: 'Samsung' },
];

const SPEED_PX_PER_SEC = 60;   // marquee speed; tweak as you like
const GAP_PX = 36;             // must match CSS --gap

const Brands = () => {
  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  const x = useMotionValue(0);
  const [paused, setPaused] = useState(false);
  const [halfWidth, setHalfWidth] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  // Measure half of the duplicated track width
  useEffect(() => {
    const measure = () => {
      if (!trackRef.current) return;
      // The first half is exactly half the children (since we duplicate)
      const items = Array.from(trackRef.current.children);
      const half = items.slice(0, items.length / 2);
      const width =
        half.reduce((acc, el) => acc + el.getBoundingClientRect().width, 0) +
        GAP_PX * Math.max(half.length - 1, 0);
      setHalfWidth(width);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (viewportRef.current) ro.observe(viewportRef.current);
    if (trackRef.current) ro.observe(trackRef.current);
    return () => ro.disconnect();
  }, []);

  // Drive the marquee
  useAnimationFrame((_, delta) => {
    if (paused || prefersReducedMotion || halfWidth === 0) return;
    const dx = (SPEED_PX_PER_SEC * delta) / 1000; // px this frame
    let next = x.get() - dx;
    // When we've scrolled one "half" width, jump back to 0 for seamless loop
    if (Math.abs(next) >= halfWidth) next = 0;
    x.set(next);
  });

  return (
    <section className="brands" aria-label="Trusted brands">
      <motion.h2
        className="brands-title"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
      >
        Our Trusted Brands
      </motion.h2>
      <motion.p
        className="brands-description"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.05 }}
      >
        We are proud to partner with some of the world's leading brands.
      </motion.p>

      {/* Viewport */}
      <div
        className="brands-viewport"
        role="region"
        aria-roledescription="marquee"
        ref={viewportRef}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={() => setPaused(true)}
        onTouchEnd={() => setPaused(false)}
      >
        {/* Track (duplicated list for seamless loop) */}
        <motion.div className="brands-track" ref={trackRef} style={{ x }}>
          {[...logos, ...logos].map((l, i) => (
            <motion.div
              className="brand"
              key={i}
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            >
              <img src={l.src} alt={l.alt} loading="lazy" decoding="async" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Brands;
