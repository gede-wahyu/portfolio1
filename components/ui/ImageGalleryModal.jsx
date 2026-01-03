'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import Image from 'next/image';

export default function ImageGalleryModal({ images, isOpen, onClose, initialIndex = 0 }) {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);

    // Reset index when modal opens
    useEffect(() => {
        if (isOpen) {
            setCurrentIndex(initialIndex);
        }
    }, [isOpen, initialIndex]);

    // Handle keyboard navigation
    const handleKeyDown = useCallback((e) => {
        if (!isOpen) return;

        if (e.key === 'Escape') {
            onClose();
        } else if (e.key === 'ArrowLeft') {
            setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
        } else if (e.key === 'ArrowRight') {
            setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
        }
    }, [isOpen, images.length, onClose]);

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

    const goToPrevious = () => {
        setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
    };

    const goToNext = () => {
        setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
    };

    if (!images || images.length === 0) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="fixed inset-0 z-50 flex items-center justify-center"
                    onClick={onClose}
                    role="dialog"
                    aria-modal="true"
                    aria-label="Image gallery"
                >
                    {/* Dark overlay */}
                    <div className="absolute inset-0 bg-black/90" />

                    {/* Modal content */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="relative z-10 max-w-5xl w-full mx-4"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close button */}
                        <button
                            onClick={onClose}
                            className="absolute -top-12 right-0 p-2 text-white/80 hover:text-white transition-colors"
                            aria-label="Close gallery"
                        >
                            <FiX size={28} />
                        </button>

                        {/* Image container */}
                        <div className="relative aspect-[16/10] bg-black/50 rounded-lg overflow-hidden">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentIndex}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute inset-0"
                                >
                                    {/* Placeholder image - replace with actual images when available */}
                                    <div className="w-full h-full bg-gradient-to-br from-[var(--accent)]/20 to-[var(--accent)]/5 flex items-center justify-center">
                                        <div className="text-center text-white/60">
                                            <div className="w-24 h-24 mx-auto mb-4 rounded-lg bg-white/10 flex items-center justify-center">
                                                <span className="text-4xl">🖼️</span>
                                            </div>
                                            <p className="text-sm">{images[currentIndex]?.alt || 'Project image'}</p>
                                            <p className="text-xs mt-1 text-white/40">Placeholder - Add actual image</p>
                                        </div>
                                    </div>
                                </motion.div>
                            </AnimatePresence>

                            {/* Navigation arrows */}
                            {images.length > 1 && (
                                <>
                                    <button
                                        onClick={goToPrevious}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 text-white/80 hover:text-white hover:bg-black/70 transition-all"
                                        aria-label="Previous image"
                                    >
                                        <FiChevronLeft size={24} />
                                    </button>
                                    <button
                                        onClick={goToNext}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 text-white/80 hover:text-white hover:bg-black/70 transition-all"
                                        aria-label="Next image"
                                    >
                                        <FiChevronRight size={24} />
                                    </button>
                                </>
                            )}
                        </div>

                        {/* Image counter and caption */}
                        <div className="mt-4 text-center">
                            <p className="text-white/60 text-sm">
                                {currentIndex + 1} / {images.length}
                            </p>
                            {images[currentIndex]?.alt && (
                                <p className="text-white/80 mt-1">
                                    {images[currentIndex].alt}
                                </p>
                            )}
                        </div>

                        {/* Thumbnail navigation */}
                        {images.length > 1 && (
                            <div className="flex justify-center gap-2 mt-4">
                                {images.map((img, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentIndex(index)}
                                        className={`w-16 h-12 rounded-md overflow-hidden transition-all ${index === currentIndex
                                                ? 'ring-2 ring-[var(--accent)] opacity-100'
                                                : 'opacity-50 hover:opacity-75'
                                            }`}
                                        aria-label={`View image ${index + 1}`}
                                    >
                                        <div className="w-full h-full bg-gradient-to-br from-[var(--accent)]/30 to-[var(--accent)]/10" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
