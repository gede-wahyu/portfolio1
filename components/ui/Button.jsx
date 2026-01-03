export default function Button({
    children,
    variant = 'primary',
    href,
    onClick,
    className = ''
}) {
    const baseStyles = 'px-6 py-3 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[var(--bg)]';

    const variants = {
        primary: 'bg-[var(--accent)] text-white hover:opacity-90 hover:scale-105 focus:ring-[var(--accent)]',
        secondary: 'bg-[var(--surface)] text-[var(--text)] border border-[var(--text-secondary)] hover:border-[var(--accent)] hover:scale-105 focus:ring-[var(--accent)]',
        outline: 'border-2 border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-white hover:scale-105 focus:ring-[var(--accent)]',
    };

    const Component = href ? 'a' : 'button';

    return (
        <Component
            href={href}
            onClick={onClick}
            className={`${baseStyles} ${variants[variant]} ${className}`}
        >
            {children}
        </Component>
    );
}
