'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import ProjectCard from '@/components/ui/ProjectCard';
import { professionalProjects, academicProjects } from '@/data/projects';
import { staggerContainer, staggerItem } from '@/utils/animations';

export default function Projects() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section id="projects" className="py-20 px-6 bg-[var(--surface)]">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-[var(--text)] mb-4">
                        Projects
                    </h2>
                    <p className="text-[var(--text-secondary)] max-w-2xl">
                        A selection of professional, academic, and personal projects spanning frontend development, intelligent systems, and research exploration.
                    </p>
                </div>

                <motion.div
                    ref={ref}
                    variants={staggerContainer}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                >
                    {/* Professional Experience - Multi-column grid */}
                    <div className="mb-16">
                        <h3 className="text-xl font-semibold text-[var(--text)] mb-6 flex items-center gap-2">
                            <span className="w-8 h-[2px] bg-[var(--accent)]"></span>
                            Professional Experience
                        </h3>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {professionalProjects.map((project) => (
                                <motion.div key={project.id} variants={staggerItem}>
                                    <ProjectCard
                                        {...project}
                                        variant="professional"
                                        truncate
                                    />
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Academic & Personal Projects */}
                    <div>
                        <h3 className="text-xl font-semibold text-[var(--text)] mb-6 flex items-center gap-2">
                            <span className="w-8 h-[2px] bg-[var(--accent)]"></span>
                            Academic & Personal Projects
                        </h3>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {academicProjects.map((project) => (
                                <motion.div key={project.id} variants={staggerItem}>
                                    <ProjectCard {...project} variant="academic" />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
