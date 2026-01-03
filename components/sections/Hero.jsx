'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import { staggerContainer, staggerItem } from '@/utils/animations';

export default function Hero() {
    const scrollToProjects = () => {
        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
    };

    const scrollToContact = () => {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section id="home" className="min-h-screen flex items-center justify-center px-6 pt-20">
            <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="max-w-5xl mx-auto"
            >
                <div className="flex flex-col md:flex-row items-center gap-12">
                    {/* Text Content - LEFT */}
                    <div className="text-center md:text-left flex-1 order-2 md:order-1">
                        {/* Name */}
                        <motion.h1
                            variants={staggerItem}
                            className="text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--text)] mb-4"
                        >
                            I Gede Wahyu Sedana
                        </motion.h1>

                        {/* Tagline - tool-agnostic */}
                        <motion.p
                            variants={staggerItem}
                            className="text-lg md:text-xl text-[var(--accent)] mb-4 font-medium"
                        >
                            Frontend Developer · System Thinker · Continuous Learner
                        </motion.p>

                        {/* Positioning Statement - tool-agnostic */}
                        <motion.p
                            variants={staggerItem}
                            className="text-base md:text-lg text-[var(--text-secondary)] mb-8 leading-relaxed"
                        >
                            I build modern web interfaces grounded in solid system analysis. Comfortable adapting to new frameworks and environments, with a research-oriented mindset for exploring intelligent systems and data-driven solutions.
                        </motion.p>

                        {/* CTAs */}
                        <motion.div
                            variants={staggerItem}
                            className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
                        >
                            <Button variant="primary" onClick={scrollToProjects}>
                                View Projects
                            </Button>
                            <Button variant="outline" onClick={scrollToContact}>
                                Contact / Download CV
                            </Button>
                        </motion.div>
                    </div>

                    {/* Profile Photo - RIGHT, height matches content */}
                    <motion.div
                        variants={staggerItem}
                        className="flex-shrink-0 order-1 md:order-2"
                    >
                        <div className="relative w-48 h-48 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-2xl overflow-hidden bg-gradient-to-br from-[var(--accent)]/20 to-[var(--accent)]/5 border-2 border-[var(--text-secondary)]/10">
                            <Image
                                src="/images/profile.JPG"
                                alt="I Gede Wahyu Sedana"
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    </motion.div>
                </div>

                {/* Subtle gradient background effect */}
                <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[var(--accent)]/5 rounded-full blur-3xl" />
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[var(--accent)]/5 rounded-full blur-3xl" />
                </div>
            </motion.div>
        </section>
    );
}
