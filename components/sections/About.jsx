'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { slideUp } from '@/utils/animations';

export default function About() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section id="about" className="py-20 px-6">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    ref={ref}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                    variants={slideUp}
                >
                    {/* Section Title */}
                    <h2 className="text-3xl md:text-4xl font-bold text-[var(--text)] mb-8">
                        About
                    </h2>

                    {/* Content Grid */}
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Profile Summary */}
                        <div className="space-y-4">
                            <p className="text-[var(--text-secondary)] leading-relaxed">
                                I am a frontend-focused software developer with hands-on experience building modern web applications and integrating them with backend services through well-defined APIs. My professional work includes developing user interfaces for inventory and ERP-related systems with an emphasis on clarity, usability, and long-term maintainability.
                            </p>
                            <p className="text-[var(--text-secondary)] leading-relaxed">
                                Beyond frontend implementation, I am deeply interested in how systems are designed and how intelligent models make decisions. I enjoy exploring the intersection between software engineering, machine learning, and AI—especially when technical solutions need to balance performance, interpretability, and practical constraints.
                            </p>
                            <p className="text-[var(--text-secondary)] leading-relaxed">
                                I value adaptability and continuous learning, and I am comfortable working across evolving technologies and problem domains as project requirements change.
                            </p>
                        </div>

                        {/* Current Focus */}
                        <div className="bg-[var(--surface)] rounded-xl p-6 border border-[var(--text-secondary)]/20">
                            <h3 className="text-xl font-semibold text-[var(--text)] mb-4">
                                Current Focus
                            </h3>
                            <ul className="space-y-3">
                                {[
                                    'Building clean and maintainable frontend systems',
                                    'Designing scalable web interfaces and data-driven applications',
                                    'Exploring machine learning and applied AI concepts',
                                    'Bridging engineering practice with analytical and research-oriented thinking',
                                ].map((item, index) => (
                                    <li
                                        key={index}
                                        className="flex items-start gap-3 text-[var(--text-secondary)]"
                                    >
                                        <span className="text-[var(--accent)] mt-1">▸</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
