import { motion } from 'motion/react';
import { ExternalLink, Github } from 'lucide-react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  index: number;
  key?: string | number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.15,
        ease: [0.23, 1, 0.32, 1] 
      }}
      className={`group relative overflow-hidden rounded-[24px] bg-bento-card border border-bento-border p-6 flex flex-col justify-between transition-all duration-500 hover:border-bento-accent/50 ${
        index === 0 ? 'md:col-span-2 md:row-span-2 min-h-[400px]' : 'min-h-[280px]'
      }`}
    >
      {/* Card Accent Gradient */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(circle_at_top_right,rgba(0,255,95,0.1),transparent_70%)] pointer-events-none" />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex gap-2">
            <span className="px-3 py-1 rounded-full bg-white/5 border border-bento-accent/20 text-[10px] font-mono uppercase tracking-widest text-bento-accent">
              {project.category}
            </span>
          </div>
          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            {project.link && (
              <a href={project.link} target="_blank" rel="noreferrer" className="text-bento-muted hover:text-bento-accent">
                <ExternalLink size={16} />
              </a>
            )}
            {project.github && (
              <a href={project.github} target="_blank" rel="noreferrer" className="text-bento-muted hover:text-bento-accent">
                <Github size={16} />
              </a>
            )}
          </div>
        </div>

        <h3 className={`font-bold leading-tight tracking-tight text-white mb-3 group-hover:text-bento-accent transition-colors ${
          index === 0 ? 'text-3xl' : 'text-xl'
        }`}>
          {project.title}
        </h3>
        
        <p className="text-bento-muted text-sm leading-relaxed mb-6 max-w-xs">
          {project.description}
        </p>
      </div>

      <div className="relative z-10 mt-auto">
        {index === 0 && (
          <div className="mb-6 w-full aspect-video rounded-xl overflow-hidden border border-bento-border bg-black/20 group-hover:border-bento-accent/30 transition-colors">
            <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          </div>
        )}
        
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span 
              key={tag}
              className="text-[10px] px-2 py-1 rounded-md bg-white/5 border border-white/10 text-bento-muted font-medium uppercase tracking-tighter"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Background Pattern for Featured */}
      {index === 0 && (
        <div className="absolute -bottom-4 -right-4 text-8xl font-black text-white/5 rotate-[-15deg] select-none pointer-events-none group-hover:text-bento-accent/5 transition-colors">
          NX
        </div>
      )}
    </motion.div>
  );
}
