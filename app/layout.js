import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
});

export const metadata = {
    title: 'I Gede Wahyu Sedana | Frontend Developer',
    description: 'Frontend Developer with strong system thinking and research-oriented background. Building modern web interfaces while exploring intelligent systems and data-driven decision models.',
    keywords: ['frontend developer', 'Vue.js', 'web development', 'intelligent systems', 'machine learning', 'system analysis'],
    authors: [{ name: 'I Gede Wahyu Sedana' }],
    openGraph: {
        title: 'I Gede Wahyu Sedana | Frontend Developer',
        description: 'Frontend Developer with strong system thinking and research-oriented background.',
        type: 'website',
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
              try {
                if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark')
                } else {
                  document.documentElement.classList.remove('dark')
                }
              } catch (_) {}
            `,
                    }}
                />
            </head>
            <body className={inter.className}>
                {children}
            </body>
        </html>
    );
}
