'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiArrowLeft } from 'react-icons/fi';
import ProjectCard from '@/components/ui/ProjectCard';
import { professionalProjects, academicProjects } from '@/data/projects';
import { staggerContainer, staggerItem } from '@/utils/animations';

const filters = [
    { key: 'all', label: 'All Projects' },
    { key: 'professional', label: 'Professional' },
    { key: 'academic', label: 'Academic & Personal' },
];

export default function ProjectsPage() {
    const searchParams = useSearchParams();
    const initialFilter = searchParams.get('filter') || 'all';
    const [activeFilter, setActiveFilter] = useState(initialFilter);

    // Update filter when URL changes
    useEffect(() => {
        const filter = searchParams.get('filter') || 'all';
        setActiveFilter(filter);
    }, [searchParams]);

    // Combine and filter projects
    const allProjects = [
        ...professionalProjects.map(p => ({ ...p, category: 'professional' })),
        ...academicProjects.map(p => ({ ...p, category: 'academic' })),
    ];

    const filteredProjects = activeFilter === 'all'
        ? allProjects
        : allProjects.filter(p => p.category === activeFilter);

    return (
        <main className="min-h-screen bg-[var(--bg)]">
            {/* Header */}
            <div className="bg-[var(--surface)] border-b border-[var(--text-secondary)]/10">
                <div className="max-w-7xl mx-auto px-6 py-12">
                    <Link
                        href="/#projects"
                        className="inline-flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--accent)] mb-6 transition-colors"
                    >
                        <FiArrowLeft /> Back to Home
                    </Link>
                    <h1 className="text-3xl md:text-4xl font-bold text-[var(--text)] mb-4">
                        All Projects
                    </h1>
                    <p className="text-[var(--text-secondary)] max-w-2xl">
                        Complete archive of professional experience, academic research, and personal explorations in software development and intelligent systems.
                    </p>
                </div>
            </div>

            {/* Filter Tabs */}
            <div className="bg-[var(--bg)] border-b border-[var(--text-secondary)]/10 sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex gap-1 overflow-x-auto py-4">
                        {filters.map(({ key, label }) => (
                            <button
                                key={key}
                                onClick={() => setActiveFilter(key)}
                                className={`px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-colors ${activeFilter === key
                                        ? 'bg-[var(--accent)] text-white'
                                        : 'text-[var(--text-secondary)] hover:bg-[var(--surface)] hover:text-[var(--text)]'
                                    }`}
                            >
                                {label}
                                <span className="ml-2 text-xs opacity-70">
                                    ({key === 'all'
                                        ? allProjects.length
                                        : allProjects.filter(p => p.category === key).length})
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Projects Grid */}
            <div className="max-w-7xl mx-auto px-6 py-12">
                <motion.div
                    key={activeFilter}
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {filteredProjects.map((project) => (
                        <motion.div key={project.id} variants={staggerItem}>
                            <ProjectCard
                                {...project}
                                variant={project.category}
                            />
                        </motion.div>
                    ))}
                </motion.div>

                {filteredProjects.length === 0 && (
                    <div className="text-center py-12 text-[var(--text-secondary)]">
                        No projects found in this category.
                    </div>
                )}
            </div>
        </main>
    );
}
