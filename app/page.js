import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Projects from '@/components/sections/Projects';
import Skills from '@/components/sections/Skills';
import Contact from '@/components/sections/Contact';

export default function Home() {
    return (
        <main className="min-h-screen">
            <Navbar />
            <Hero />
            <About />
            <Projects />
            <Skills />
            <Contact />
        </main>
    );
}
