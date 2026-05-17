import { motion } from 'motion/react';
import { User, School, Rocket, Globe, ArrowUpRight } from 'lucide-react';

const SKILLS = [
  "React", "Node.js", "Next.js", "Three.js","Tailwind CSS", "MySQL", "MongoDB", "Firebase", "Flutter", "Dart", "Java", "Python", "Docker", "C++"
];

export default function About() {
  return (
    <section id="about" className="py-16 px-6 md:px-12 bg-bento-bg">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="md:col-span-2 rounded-[32px] bg-bento-card border border-bento-border p-6 md:p-8 relative overflow-hidden"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-bento-accent/10 rounded-lg">
                <User size={20} className="text-bento-accent" />
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-white uppercase tracking-tighter">ABOUT ME</h2>
            </div>
            <p className="text-bento-muted text-base md:text-lg leading-relaxed mb-6">
              Software Engineering undergraduate at the Faculty of Technology, University of Ruhuna, seeking
             an internship opportunity to demonstrate technical expertise in real-world environments, with a
             strong focus on Full-stack software development. Possesses solid foundations in software
             engineering principles, cloud computing, and artificial intelligence, along with hands-on experience
             in building reliable applications using technologies such as Java, JavaScript, Python, and Dart.
             Committed to continuous learning and delivering innovative, efficient solutions to complex real-nworld problems
            </p>
            
            {/* Background Decor */}
            <div className="absolute -bottom-8 -right-8 opacity-[0.03] scale-150 rotate-12 select-none pointer-events-none">
               <Globe size={300} />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="md:col-span-1 rounded-[32px] bg-bento-card border border-bento-border p-8 flex flex-col justify-between"
          >
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-blue-500/10 rounded-lg">
                  <School size={20} className="text-blue-500" />
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1">Final Year Undergraduate</h4>
                  <p className="text-bento-muted text-xs">Looking for SE internship opportunities</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="p-2 bg-bento-accent/10 rounded-lg">
                  <Rocket size={20} className="text-bento-accent" />
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1">Focus Areas</h4>
                  <p className="text-bento-muted text-xs">Software Engineering, Cloud Computing, AI</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2 bg-purple-500/10 rounded-lg">
                  <Globe size={20} className="text-purple-500" />
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1">Preferred Stack</h4>
                  <p className="text-bento-muted text-xs">React.js, Express.js, Next.js, MySQL</p>
                </div>
              </div>
            </div>
            
            <div className="mt-8 flex justify-center">
              <button 
                className="group flex items-center gap-2 bg-bento-accent text-black px-6 py-3 rounded-full font-bold text-sm transition-all hover:scale-105 cursor-pointer"
                onClick={() => window.open("/maneesha_geethanga_CV.pdf", '_blank')}
              >
                DOWNLOAD CV
                <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        </div>

        {/* Skills Bento Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-[32px] bg-bento-card border border-bento-border p-8"
        >
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold uppercase tracking-tight text-white">TOOLBOX</h3>
            <div className="px-3 py-1 rounded-full border border-white/10 text-[10px] text-bento-muted font-mono uppercase tracking-widest">
              TECHNOLOGIES I MASTER
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            {SKILLS.map((skill, idx) => (
              <motion.span
                key={skill}
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(0, 255, 95, 0.1)', borderColor: 'rgba(0, 255, 95, 0.3)', color: '#00FF5F' }}
                className="px-6 py-3 rounded-2xl bg-white/5 border border-white/10 text-sm font-medium text-bento-muted transition-all cursor-default"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
