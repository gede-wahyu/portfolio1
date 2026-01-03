'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                ? 'bg-[var(--bg)]/80 backdrop-blur-md border-b border-[var(--text-secondary)]/10'
                : 'bg-transparent'
                }`}
        >
            <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                {/* Logo/Name */}
                <button
                    onClick={() => scrollToSection('home')}
                    className="text-xl font-bold text-[var(--text)] hover:text-[var(--accent)] transition-colors"
                >
                    iGW
                </button>

                {/* Navigation Links */}
                <div className="flex items-center gap-8">
                    <div className="hidden md:flex items-center gap-6">
                        {['About', 'Projects', 'Skills', 'Contact'].map((item) => (
                            <button
                                key={item}
                                onClick={() => scrollToSection(item.toLowerCase())}
                                className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors font-medium"
                            >
                                {item}
                            </button>
                        ))}
                    </div>

                    {/* Theme Toggle */}
                    <ThemeToggle />
                </div>
            </div>
        </motion.nav>
    );
}
