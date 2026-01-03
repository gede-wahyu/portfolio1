'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();
    const isHomePage = pathname === '/';

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

    const navItems = [
        { label: 'About', type: 'scroll', target: 'about' },
        { label: 'Projects', type: 'scroll', target: 'projects' },
        { label: 'Skills', type: 'scroll', target: 'skills' },
        { label: 'Contact', type: 'scroll', target: 'contact' },
    ];

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
                <Link
                    href="/"
                    className="text-xl font-bold text-[var(--text)] hover:text-[var(--accent)] transition-colors"
                >
                    iGW
                </Link>

                {/* Navigation Links */}
                <div className="flex items-center gap-8">
                    <div className="hidden md:flex items-center gap-6">
                        {navItems.map((item) => (
                            item.type === 'link' ? (
                                <Link
                                    key={item.label}
                                    href={item.target}
                                    className={`font-medium transition-colors ${pathname === item.target
                                        ? 'text-[var(--accent)]'
                                        : 'text-[var(--text-secondary)] hover:text-[var(--accent)]'
                                        }`}
                                >
                                    {item.label}
                                </Link>
                            ) : (
                                <button
                                    key={item.label}
                                    onClick={() => {
                                        if (isHomePage) {
                                            scrollToSection(item.target);
                                        } else {
                                            window.location.href = `/#${item.target}`;
                                        }
                                    }}
                                    className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors font-medium"
                                >
                                    {item.label}
                                </button>
                            )
                        ))}
                    </div>

                    {/* Theme Toggle */}
                    <ThemeToggle />
                </div>
            </div>
        </motion.nav>
    );
}

