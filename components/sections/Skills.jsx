'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import Badge from '@/components/ui/Badge';
import { skills } from '@/data/skills';
import { slideUp } from '@/utils/animations';

export default function Skills() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section id="skills" className="py-20 px-6">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    ref={ref}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                    variants={slideUp}
                >
                    {/* Section Title */}
                    <h2 className="text-3xl md:text-4xl font-bold text-[var(--text)] mb-12">
                        Skills & Technologies
                    </h2>

                    {/* Skills Categories */}
                    <div className="space-y-8">
                        {Object.entries(skills).map(([category, items]) => (
                            <div key={category}>
                                <h3 className="text-xl font-semibold text-[var(--text)] mb-4">
                                    {category}
                                </h3>
                                <div className="flex flex-wrap gap-3">
                                    {items.map((skill, index) => (
                                        <Badge key={index}>{skill}</Badge>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
