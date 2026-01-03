'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiChevronLeft, FiChevronRight, FiGithub, FiExternalLink } from 'react-icons/fi';
import Badge from './Badge';

export default function ProjectDetailModal({
    project,
    isOpen,
    onClose
}) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [imageErrors, setImageErrors] = useState({});

    // Reset image index when modal opens
    useEffect(() => {
        if (isOpen) {
            setCurrentImageIndex(0);
            setImageErrors({});
        }
    }, [isOpen]);

    // Handle keyboard navigation
    const handleKeyDown = useCallback((e) => {
        if (!isOpen) return;

        if (e.key === 'Escape') {
            onClose();
        } else if (e.key === 'ArrowLeft' && project?.images?.length > 1) {
            setCurrentImageIndex((prev) => (prev > 0 ? prev - 1 : project.images.length - 1));
        } else if (e.key === 'ArrowRight' && project?.images?.length > 1) {
            setCurrentImageIndex((prev) => (prev < project.images.length - 1 ? prev + 1 : 0));
        }
    }, [isOpen, project, onClose]);

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!project) return null;

    const { title, company, role, description, details, contributions, tech, images, githubUrl, demoUrl } = project;

    const handleImageError = (index) => {
        setImageErrors(prev => ({ ...prev, [index]: true }));
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    onClick={onClose}
                    role="dialog"
                    aria-modal="true"
                    aria-label={`${title} project details`}
                >
                    {/* Dark overlay */}
                    <div className="absolute inset-0 bg-black/85" />

                    {/* Modal content */}
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="relative z-10 bg-[var(--surface)] rounded-2xl max-w-6xl w-full max-h-[85vh] overflow-hidden flex flex-col md:flex-row"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-[var(--bg)]/80 text-[var(--text-secondary)] hover:text-[var(--text)] transition-colors"
                            aria-label="Close modal"
                        >
                            <FiX size={20} />
                        </button>

                        {/* Left Panel - Details */}
                        <div className="flex-1 p-6 md:p-8 overflow-y-auto">
                            {/* Header */}
                            <div className="mb-6">
                                <h2 className="text-2xl md:text-3xl font-bold text-[var(--text)] mb-2">
                                    {title}
                                </h2>
                                {company && (
                                    <p className="text-[var(--accent)] font-medium">{company}</p>
                                )}
                                {role && (
                                    <p className="text-[var(--text-secondary)] text-sm">{role}</p>
                                )}
                            </div>

                            {/* Description */}
                            <div className="mb-6">
                                <p className="text-[var(--text-secondary)] leading-relaxed">
                                    {description}
                                </p>
                                {details && (
                                    <p className="text-[var(--text-secondary)] leading-relaxed mt-4 opacity-80">
                                        {details}
                                    </p>
                                )}
                            </div>

                            {/* Key Contributions */}
                            {contributions && contributions.length > 0 && (
                                <div className="mb-6">
                                    <h3 className="text-lg font-semibold text-[var(--text)] mb-3">
                                        Key Contributions
                                    </h3>
                                    <ul className="space-y-2">
                                        {contributions.map((item, index) => (
                                            <li key={index} className="text-[var(--text-secondary)] flex items-start gap-2">
                                                <span className="text-[var(--accent)] mt-1">•</span>
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Tech Stack */}
                            {tech && tech.length > 0 && (
                                <div className="mb-6">
                                    <h3 className="text-sm font-semibold text-[var(--text)] mb-2 opacity-60">
                                        Technologies
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {tech.map((item, index) => (
                                            <Badge key={index}>{item}</Badge>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Links */}
                            {(githubUrl || demoUrl) && (
                                <div className="flex gap-4">
                                    {githubUrl && (
                                        <a
                                            href={githubUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 text-[var(--accent)] hover:underline"
                                        >
                                            <FiGithub size={18} />
                                            <span>View Repository</span>
                                        </a>
                                    )}
                                    {demoUrl && (
                                        <a
                                            href={demoUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 text-[var(--accent)] hover:underline"
                                        >
                                            <FiExternalLink size={18} />
                                            <span>Live Demo</span>
                                        </a>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Right Panel - Gallery */}
                        {images && images.length > 0 && (
                            <div className="md:w-1/2 bg-[var(--bg)] p-4 md:p-6 flex flex-col">
                                {/* Main Image */}
                                <div className="relative flex-1 min-h-[250px] md:min-h-0 bg-gradient-to-br from-[var(--accent)]/10 to-[var(--accent)]/5 rounded-xl overflow-hidden">
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={currentImageIndex}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.2 }}
                                            className="absolute inset-0"
                                        >
                                            {!imageErrors[currentImageIndex] ? (
                                                <Image
                                                    src={images[currentImageIndex]?.src}
                                                    alt={images[currentImageIndex]?.alt || 'Project image'}
                                                    fill
                                                    className="object-contain"
                                                    sizes="(max-width: 768px) 100vw, 50vw"
                                                    onError={() => handleImageError(currentImageIndex)}
                                                />
                                            ) : (
                                                /* Fallback placeholder */
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <div className="text-center text-[var(--text-secondary)]">
                                                        <div className="w-20 h-20 mx-auto mb-3 rounded-lg bg-[var(--accent)]/10 flex items-center justify-center">
                                                            <span className="text-3xl">🖼️</span>
                                                        </div>
                                                        <p className="text-sm px-4">{images[currentImageIndex]?.alt}</p>
                                                    </div>
                                                </div>
                                            )}
                                        </motion.div>
                                    </AnimatePresence>

                                    {/* Navigation arrows */}
                                    {images.length > 1 && (
                                        <>
                                            <button
                                                onClick={() => setCurrentImageIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1))}
                                                className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white/80 hover:text-white hover:bg-black/70 transition-all"
                                                aria-label="Previous image"
                                            >
                                                <FiChevronLeft size={20} />
                                            </button>
                                            <button
                                                onClick={() => setCurrentImageIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0))}
                                                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white/80 hover:text-white hover:bg-black/70 transition-all"
                                                aria-label="Next image"
                                            >
                                                <FiChevronRight size={20} />
                                            </button>
                                        </>
                                    )}
                                </div>

                                {/* Image caption */}
                                <p className="text-center text-[var(--text-secondary)] text-sm mt-3 px-4">
                                    {images[currentImageIndex]?.alt}
                                </p>

                                {/* Dot indicators only */}
                                {images.length > 1 && (
                                    <div className="flex justify-center gap-2 mt-3">
                                        {images.map((_, index) => (
                                            <button
                                                key={index}
                                                onClick={() => setCurrentImageIndex(index)}
                                                className={`w-2 h-2 rounded-full transition-all ${index === currentImageIndex
                                                        ? 'bg-[var(--accent)] scale-125'
                                                        : 'bg-[var(--text-secondary)]/40 ring-1 ring-[var(--text-secondary)]/20 hover:bg-[var(--text-secondary)]/60'
                                                    }`}
                                                aria-label={`View image ${index + 1}`}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
