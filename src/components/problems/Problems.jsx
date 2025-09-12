import './Problems.css';
import { motion, useInView, useMotionValue, animate } from 'framer-motion';
import { useRef, useLayoutEffect, useState } from 'react';
import { FaServer, FaEyeSlash, FaDatabase, FaNetworkWired, FaShieldAlt } from 'react-icons/fa';
import DragIndicator from '../common/dragIndicator/DragIndicator';

const problemsData = [
    { id: 1, icon: FaServer, color: '#f97316', bg: '#fff7ed', title: 'Outdated Hardware', description: 'Legacy systems slow down operations, increase failure risks, and drive up maintenance costs due to outdated components.' },
    { id: 2, icon: FaEyeSlash, color: '#0ea5e9', bg: '#e0f2fe', title: 'Lack of Centralized Monitoring', description: 'Without unified monitoring, IT teams miss critical alerts, causing delayed responses to infrastructure issues and failures.' },
    { id: 3, icon: FaDatabase, color: '#6366f1', bg: '#eef2ff', title: 'Poor Backup & Recovery Strategy', description: 'Inadequate backup plans expose data to loss, with no reliable disaster recovery process during system failure events.' },
    { id: 4, icon: FaNetworkWired, color: '#10b981', bg: '#d1fae5', title: 'Unmanaged Network Devices', description: 'Untracked routers, switches, and firewalls create performance bottlenecks and pose significant configuration and security risks.' },
    { id: 5, icon: FaShieldAlt, color: '#ef4444', bg: '#fee2e2', title: 'Security Gaps', description: 'Lack of patching, antivirus, or firewall controls leaves systems vulnerable to cyberattacks, breaches, and malware threats.' },
];

const Problems = () => {
    const sectionRef = useRef(null);
    const viewportRef = useRef(null);  // visible area
    const trackRef = useRef(null);     // draggable track (cards row)
    const inView = useInView(sectionRef, { once: true, amount: 0.3 });
const [showIndicator, setShowIndicator] = useState(true);
    const [bounds, setBounds] = useState({ left: 0, right: 0 });
    const x = useMotionValue(0); // for arrow nudge

    // card entrance animation
    const cardVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, delay: i * 0.15, ease: 'easeOut' },
        }),
    };

    // Recalculate drag bounds when layout changes
    useLayoutEffect(() => {
        const recalc = () => {
            const total = trackRef.current?.scrollWidth || 0;
            const viewport = viewportRef.current?.clientWidth || 0;
            const max = Math.max(0, total - viewport);
            setBounds({ left: -max, right: 0 });

            // clamp current x if window resized
            const current = x.get();
            const clamped = Math.min(0, Math.max(-max, current));
            if (clamped !== current) x.set(clamped);
        };
        recalc();
        const ro = new ResizeObserver(recalc);
        if (viewportRef.current) ro.observe(viewportRef.current);
        if (trackRef.current) ro.observe(trackRef.current);
        window.addEventListener('resize', recalc);
        return () => {
            ro.disconnect();
            window.removeEventListener('resize', recalc);
        };
    }, [x]);

    const nudge = (dir) => {
        // scroll by one card + gap
        const card = trackRef.current?.querySelector('.problem-card');
        const step = (card?.clientWidth || 280) + 20;
        const target = dir === 'next'
            ? Math.max(bounds.left, x.get() - step)
            : Math.min(bounds.right, x.get() + step);
        animate(x, target, { type: 'spring', stiffness: 400, damping: 40 });
    };

    return (
        <section className="problems" ref={sectionRef}>
            <motion.h2
                className="problems-title"
                initial={{ opacity: 0, y: -40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                viewport={{ once: true, amount: 0.3 }}
            >
                Key Challenges in IT Infrastructure
            </motion.h2>

            <motion.p
                className="problem-description"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
                viewport={{ once: true, amount: 0.3 }}
            >
                The IT industry faces a myriad of challenges, including outdated hardware, lack of centralized monitoring,
                poor backup and recovery strategy, unmanaged network devices, and security gaps.
            </motion.p>

            

            <div className="problems-viewport" ref={viewportRef}>
                <DragIndicator hidden={!showIndicator} />
                {/* optional arrows */}
                <button className="problems-arrow left" onClick={() => nudge('prev')} aria-label="Previous">‹</button>
                <button className="problems-arrow right" onClick={() => nudge('next')} aria-label="Next">›</button>

                <motion.div
                    className="problems-drag"
                    ref={trackRef}
                    drag="x"
                    dragConstraints={bounds}
                    dragElastic={0.08}
                    dragMomentum
                    style={{ x }}
                    onDragStart={() => setShowIndicator(false)} 
                >
                    {problemsData.map((p, i) => {
                        const Icon = p.icon;
                        return (
                            <motion.div
                                key={p.id}
                                className="problem-card"
                                variants={cardVariants}
                                initial="hidden"
                                animate={inView ? 'visible' : 'hidden'}
                                custom={i}
                            >
                                <div className="problem-icon" style={{ color: p.color, backgroundColor: p.bg }}>
                                    <Icon size={24} />
                                </div>
                                <h3>{p.title}</h3>
                                <p>{p.description}</p>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
};

export default Problems;
