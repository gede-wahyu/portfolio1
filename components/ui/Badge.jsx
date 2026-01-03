'use client';

import { motion } from 'framer-motion';

export default function Badge({ children }) {
    return (
        <motion.span
            whileHover={{ scale: 1.05 }}
            className="px-3 py-1.5 bg-[var(--surface)] text-[var(--text)] text-sm rounded-full border border-[var(--text-secondary)]/20 font-mono transition-colors"
        >
            {children}
        </motion.span>
    );
}
