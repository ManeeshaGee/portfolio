import { motion } from 'motion/react';
import { ArrowUpRight, Github, Twitter, Linkedin } from 'lucide-react';

export default function Hero() {
  return (
    <section id="home" className="relative pt-32 pb-16 px-6 md:px-12 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
        
        {/* Main Introduction Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="md:col-span-3 rounded-[32px] bg-bento-card border border-bento-border p-8 md:p-12 relative overflow-hidden flex flex-col justify-between min-h-[400px]"
        >
          <div className="relative z-10">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-2 mb-8"
            >
              <div className="w-2 h-2 rounded-full bg-bento-accent shadow-[0_0_10px_rgba(0,255,95,0.5)]" />
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-bento-accent">FULL STACK DEVELOPER INTERN</span>
            </motion.div>
            
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-black leading-[0.85] tracking-tighter text-white mb-8">
              DESIGNING <br />
              <span className="text-bento-muted">RELIABLE</span> <br />
              EXPERIENCES
            </h1>
          </div>

          <div className="relative z-10 flex flex-wrap gap-4 items-center justify-between mt-auto">
            <p className="text-bento-muted max-w-sm text-sm leading-relaxed">
              A proud final year undergraduate at the University of Ruhuna. An enthusiast developer who loves to build and design digital solutions.
            </p>
            <button className="group flex items-center gap-2 bg-bento-accent text-black px-6 py-3 rounded-full font-bold text-sm transition-all hover:scale-105" onClick={ ()=> {window.location.href = '#contact'}}>
              GET IN TOUCH
              <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>

          {/* Decorative Pattern */}
          <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none hidden md:block">
            <div className="text-[200px] font-black tracking-tighter rotate-12">SE</div>
          </div>
        </motion.div>

        {/* Profile Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="md:col-span-1 rounded-[32px] bg-bento-card border border-bento-border p-6 flex flex-col justify-between aspect-square md:aspect-auto"
        >
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-bento-accent to-blue-500 overflow-hidden mb-6 flex items-center justify-center text-black font-black text-4xl">
            MG
          </div>
          <div>
            <div className="overflow-hidden mb-6 flex items-center justify-center text-black font-black text-4xl">
                <img src="/my_face.png" alt="" className='h-[150px] w-[150px] rounded-full' />
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold text-white mb-2">Maneesha Geethanga</h3>
            <p className="text-bento-muted text-xs uppercase tracking-widest font-medium mb-6">Full Stack Developer</p>
            
            <div className="flex gap-4">
              <a href="https://github.com/ManeeshaGee" className="p-2 rounded-xl bg-white/5 border border-white/10 text-bento-muted hover:text-bento-accent transition-colors">
                <Github size={18} />
              </a>
              <a href="https://www.linkedin.com/in/maneesha-geethanga/" className="p-2 rounded-xl bg-white/5 border border-white/10 text-bento-muted hover:text-bento-accent transition-colors">
                <Linkedin size={18} />
              </a>
              <a href="https://www.kaggle.com/maneeshagee" className="p-2 rounded-xl bg-white/5 border border-white/10 text-bento-muted hover:text-bento-accent transition-colors">
                <Twitter size={18} />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
