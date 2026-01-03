'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { FiMail, FiGithub, FiLinkedin, FiDownload } from 'react-icons/fi';
import { slideUp } from '@/utils/animations';

export default function Contact() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    const socialLinks = [
        {
            name: 'Email',
            href: 'mailto:gedewahyusedana@gmail.com',
            icon: FiMail,
            label: 'gedewahyusedana@gmail.com',
        },
        {
            name: 'GitHub',
            href: 'https://github.com/gede-wahyu',
            icon: FiGithub,
            label: 'github.com/gede-wahyu',
        },
        {
            name: 'LinkedIn',
            href: 'https://linkedin.com/in/gedewahyusedana',
            icon: FiLinkedin,
            label: 'linkedin.com/in/gedewahyusedana',
        },
    ];

    return (
        <section id="contact" className="py-20 px-6 bg-[var(--surface)]">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    ref={ref}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                    variants={slideUp}
                >
                    {/* Section Title */}
                    <h2 className="text-3xl md:text-4xl font-bold text-[var(--text)] mb-4 text-center">
                        Get In Touch
                    </h2>
                    <p className="text-[var(--text-secondary)] text-center mb-12 max-w-2xl mx-auto">
                        I'm open to discussing remote opportunities, collaborations, or just connecting over shared interests in software engineering and intelligent systems.
                    </p>

                    {/* Contact Links */}
                    <div className="grid md:grid-cols-3 gap-6 mb-8">
                        {socialLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex flex-col items-center gap-3 p-6 bg-[var(--bg)] rounded-xl border border-[var(--text-secondary)]/20 hover:border-[var(--accent)] transition-all hover:scale-105"
                            >
                                <link.icon size={32} className="text-[var(--accent)]" />
                                <div className="text-center">
                                    <p className="font-semibold text-[var(--text)] mb-1">{link.name}</p>
                                    <p className="text-sm text-[var(--text-secondary)]">{link.label}</p>
                                </div>
                            </a>
                        ))}
                    </div>

                    {/* Download CV Button */}
                    <div className="text-center mb-12">
                        <a
                            href="/cv.pdf"
                            download
                            className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--accent)] text-white rounded-lg font-medium hover:opacity-90 transition-all hover:scale-105"
                        >
                            <FiDownload size={18} />
                            Download CV
                        </a>
                    </div>

                    {/* Footer */}
                    <footer className="border-t border-[var(--text-secondary)]/10 pt-8 text-center">
                        <p className="text-[var(--text-secondary)] text-sm">
                            © {new Date().getFullYear()} I Gede Wahyu Sedana. Built with Next.js and Tailwind CSS.
                        </p>
                    </footer>
                </motion.div>
            </div>
        </section>
    );
}
