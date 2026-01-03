'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink } from 'react-icons/fi';
import Badge from './Badge';
import ProjectDetailModal from './ProjectDetailModal';

export default function ProjectCard({
    title,
    company,
    role,
    subtitle,
    description,
    details,
    contributions,
    highlights,
    tech,
    images,
    githubUrl,
    demoUrl,
    variant = 'default'
}) {
    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);
    const [imageError, setImageError] = useState(false);

    // Full project data for modal
    const projectData = {
        title, company, role, subtitle, description, details, contributions, tech, images, githubUrl, demoUrl
    };

    const additionalImagesCount = images && images.length > 1 ? images.length - 1 : 0;
    const coverImage = images?.[0];

    return (
        <>
            {/* Entire card is clickable */}
            <motion.div
                whileHover={{ y: -6, borderColor: 'var(--accent)' }}
                onClick={() => setIsDetailOpen(true)}
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
                className="group bg-[var(--surface)] rounded-2xl overflow-hidden border border-[var(--text-secondary)]/20 transition-all duration-300 hover:shadow-xl h-full flex flex-col cursor-pointer relative"
            >
                {/* Tooltip */}
                {showTooltip && (
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 z-10 px-3 py-1.5 bg-[var(--text)] text-[var(--bg)] text-xs rounded-md shadow-lg pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                        View details
                    </div>
                )}

                {/* Cover Image */}
                {coverImage && (
                    <div className="relative aspect-video bg-gradient-to-br from-[var(--accent)]/10 to-[var(--accent)]/5 overflow-hidden">
                        {!imageError ? (
                            <Image
                                src={coverImage.src}
                                alt={coverImage.alt || 'Project cover'}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                onError={() => setImageError(true)}
                            />
                        ) : (
                            /* Fallback placeholder */
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="text-center text-[var(--text-secondary)]">
                                    <div className="w-12 h-12 mx-auto mb-2 rounded-lg bg-[var(--accent)]/10 flex items-center justify-center">
                                        <span className="text-xl">🖼️</span>
                                    </div>
                                    <p className="text-xs px-4 line-clamp-1">{coverImage.alt || 'Cover image'}</p>
                                </div>
                            </div>
                        )}

                        {/* Hover overlay */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />

                        {/* +N indicator */}
                        {additionalImagesCount > 0 && (
                            <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-md font-medium">
                                +{additionalImagesCount}
                            </div>
                        )}
                    </div>
                )}

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-2">
                        <div className="flex-1 min-w-0 pr-2">
                            <h3 className="font-bold text-[var(--text)] group-hover:text-[var(--accent)] transition-colors text-base leading-tight">
                                {title}
                            </h3>
                            {company && (
                                <p className="text-sm text-[var(--accent)] mt-0.5">{company}</p>
                            )}
                            {role && (
                                <p className="text-xs text-[var(--text-secondary)]">{role}</p>
                            )}
                        </div>
                        <div className="flex gap-1.5 flex-shrink-0">
                            {githubUrl && (
                                <a
                                    href={githubUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
                                    aria-label="View on GitHub"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <FiGithub size={16} />
                                </a>
                            )}
                            {demoUrl && (
                                <a
                                    href={demoUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
                                    aria-label="View demo"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <FiExternalLink size={16} />
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Description with gradient fade - no ellipsis */}
                    <div className="relative flex-1 mb-3 overflow-hidden">
                        <p className="text-[var(--text-secondary)] leading-relaxed text-sm">
                            {highlights || description}
                        </p>
                        {/* Subtle gradient fade at bottom */}
                        <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-[var(--surface)] to-transparent pointer-events-none" />
                    </div>

                    {/* Tech Stack - max 3 visible */}
                    <div className="flex flex-wrap gap-1.5 mt-auto pt-2">
                        {tech.slice(0, 3).map((item, index) => (
                            <Badge key={index}>{item}</Badge>
                        ))}
                        {tech.length > 3 && (
                            <span className="text-xs text-[var(--text-secondary)] self-center">+{tech.length - 3}</span>
                        )}
                    </div>
                </div>
            </motion.div>

            {/* Project Detail Modal */}
            <ProjectDetailModal
                project={projectData}
                isOpen={isDetailOpen}
                onClose={() => setIsDetailOpen(false)}
            />
        </>
    );
}
