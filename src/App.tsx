/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Hero from './components/Hero';
import About from './components/About';
import ProjectShowcase from './components/ProjectShowcase';
import EducationSection from './components/Education';
import Certifications from './components/Certifications';
import { PhysicsPool } from './components/PhysicsPool';
import Contact from './components/Contact';

export default function App() {
  return (
    <main className="min-h-screen bg-bento-bg font-sans selection:bg-bento-accent/30 selection:text-bento-accent text-white scroll-smooth">
      {/* Navbar Placeholder */}
      <nav className="fixed top-0 w-full z-50 px-4 md:px-6 py-6 flex justify-center pointer-events-none">
        <div className="bg-bento-card/80 backdrop-blur-md border border-white/10 pl-1.5 pr-6 md:pr-8 py-1.5 rounded-full flex items-center gap-4 md:gap-6 pointer-events-auto">
          <img
            src="/my_face.png"
            alt="Maneesha Geethanga"
            className="w-7 h-7 rounded-full object-cover border border-white/20 shrink-0"
          />
          <div className="flex gap-4 md:gap-8 text-[9px] md:text-[10px] uppercase font-bold tracking-[0.2em]">
            <a href="#home" className="hover:text-bento-accent transition-colors">HOME</a>
            <a href="#about" className="hover:text-bento-accent transition-colors">ABOUT</a>
            <a href="#works" className="hover:text-bento-accent transition-colors">WORKS</a>
            <a href="#skills" className="hover:text-bento-accent transition-colors">SKILLS</a>
            <a href="#contact" className="hover:text-bento-accent transition-colors">CONTACT</a>
          </div>
        </div>
      </nav>

      <Hero />
      <About />
      <ProjectShowcase />
      <EducationSection />
      <Certifications />
      <PhysicsPool />
      <Contact />

      <footer className="py-12 px-6 text-center border-t border-white/5">
        <p className="text-bento-muted text-xs uppercase tracking-widest font-medium">
          © {new Date().getFullYear()} Maneesha Geethanga. Built with passion & precision.
        </p>
      </footer>
    </main>
  );
}
