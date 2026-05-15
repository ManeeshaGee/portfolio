import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LayoutGrid, AppWindow, Database, Paintbrush } from 'lucide-react';
import ProjectCard from './ProjectCard';
import { Project } from '../types';

const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Multiuser Chat Application',
    category: 'Systems',
    description: 'A comprehensive multi-user chat application with RMI networking and managed concurrency using multithreading. Features similar to modern chat platforms.',
    imageUrl: '/chat_app.png',
    tags: ['Java', 'RMI', 'MySQL', 'Hibernate'],
    link: '#',
    github: 'https://github.com/Viraj-Dias/Multi-User-Chat-Application-MosaicTitans'
  },
  {
    id: '2',
    title: 'Tuition Center LMS',
    category: 'Full Stack',
    description: 'A complete management system for Texas Tuition Center in Galle. Implemented a fully functional LMS and financial management system.',
    imageUrl: '/lms_app.jpg',
    tags: ['React.js', 'Express.js', 'Node.js', 'MySQL'],
    link: '#',
    github: 'https://github.com/Nepul1234/TCMS-TEXAS'
  },
  {
    id: '3',
    title: 'Smart Canteen PWA',
    category: 'Systems',
    description: 'University canteen management system deployed as a PWA. Includes waste management and localization support for Sinhala and Tamil.',
    imageUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=1200',
    tags: ['Nuxt.js', 'Laravel 11', 'MySQL', 'PWA'],
    link: '#',
    github: 'https://github.com/lakipop/Canteen-app'
  },
  {
    id: '4',
    title: 'Intelligent Finance App',
    category: 'Mobile',
    description: 'AI-powered mobile application for financial insights and habit tracking. Features a production-level integration with chatbot capabilities.',
    imageUrl: '/dashboard.png',
    tags: ['Flutter', 'Firebase', 'SQLite', 'AI'],
    link: '#',
    github: 'https://github.com/Viraj-Dias/fintrack'
  }
];

const CATEGORIES = [
  { id: 'all', label: 'All Projects', icon: LayoutGrid },
  { id: 'Systems', label: 'Systems', icon: Database },
  { id: 'Full Stack', label: 'Full Stack', icon: AppWindow },
  { id: 'Mobile', label: 'Mobile App', icon: Paintbrush },
];

export default function ProjectShowcase() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'all') return PROJECTS;
    return PROJECTS.filter(p => p.category === activeCategory);
  }, [activeCategory]);

  return (
    <section id="works" className="relative min-h-screen py-24 px-6 md:px-12 bg-bento-bg text-white overflow-hidden selection:bg-bento-accent/30 selection:text-bento-accent">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Section */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-20">
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3"
            >
              <div className="relative flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-bento-accent shadow-[0_0_10px_rgba(0,255,95,0.5)] animate-pulse" />
                <div className="absolute w-4 h-4 rounded-full bg-bento-accent/20 animate-ping" />
              </div>
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-bento-accent">
                Available for new immersion
              </span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-7xl font-black leading-[0.85] tracking-tighter"
            >
              PROJECTS <br />
              <span className="text-bento-muted">I’VE WORKED ON.</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-bento-muted max-w-sm text-sm"
            >
              A curation of digital experiences and spatial design focusing on performance and utility.
            </motion.p>
          </div>

          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;
              
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold transition-all duration-500 border ${
                    isActive 
                      ? 'bg-bento-accent text-black border-bento-accent' 
                      : 'bg-white/5 text-bento-muted border-white/10 hover:border-bento-accent/50 hover:text-white'
                  }`}
                >
                  <Icon size={14} />
                  {cat.label.toUpperCase()}
                </button>
              );
            })}
          </div>
        </header>

        {/* Bento Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-min"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                index={idx}
              />
            ))}
          </AnimatePresence>
          
          {/* Static Stats Card for Bento feel */}
          <motion.div
            layout
            className="md:col-span-1 md:row-span-1 rounded-[24px] bg-bento-card border border-bento-border p-8 flex flex-col justify-center items-center text-center space-y-2 order-last md:order-none"
          >
            <span className="text-6xl font-black text-bento-accent">5+</span>
            <span className="text-[10px] text-bento-muted uppercase tracking-widest font-bold">Complete Projects</span>
          </motion.div>

          <motion.div
            layout
            className="md:col-span-1 md:row-span-1 rounded-[24px] bg-bento-card border border-bento-border p-8 flex flex-col justify-between order-last md:order-none"
          >
            <div className="p-3 bg-white/5 rounded-xl w-fit border border-white/10">
              <Database size={20} className="text-bento-accent" />
            </div>
            <div>
              <h3 className="text-lg font-bold mb-1">Tech Stack</h3>
              <p className="text-xs text-bento-muted leading-relaxed">React.js, Node.js, MySQL, Nuxt.js, Laravel, Flutter.</p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-bento-accent/5 blur-[120px] rounded-full -z-10 opacity-50" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-500/5 blur-[100px] rounded-full -z-10" />
      
      {/* Grid Overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03] [mask-image:radial-gradient(ellipse_at_center,black,transparent)] bg-[linear-gradient(to_right,#2D2D35_1px,transparent_1px),linear-gradient(to_bottom,#2D2D35_1px,transparent_1px)] bg-[size:40px_40px]" />
    </section>
  );
}
