'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';
import ProjectCard from '@/components/ui/ProjectCard';
import { professionalProjects, academicProjects } from '@/data/projects';
import { staggerContainer, staggerItem } from '@/utils/animations';

export default function Projects() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    // Filter featured projects, limit to 3
    const featuredProfessional = professionalProjects
        .filter(p => p.featured)
        .slice(0, 3);
    const featuredAcademic = academicProjects
        .filter(p => p.featured)
        .slice(0, 3);

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
                            {featuredProfessional.map((project) => (
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
                            {featuredAcademic.map((project) => (
                                <motion.div key={project.id} variants={staggerItem}>
                                    <ProjectCard {...project} variant="academic" />
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* CTA to View All Projects */}
                    <div className="mt-12 text-center">
                        <Link
                            href="/projects"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--accent)] text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
                        >
                            View All Projects <FiArrowRight />
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}


