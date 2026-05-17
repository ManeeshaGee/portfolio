import { motion } from 'motion/react';
import { Send, Mail, MapPin, Phone, Github, Linkedin, Twitter } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="py-24 px-6 md:px-12 bg-bento-bg">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-12"
          >
            <div>
              <h2 
                className="text-4xl sm:text-6xl md:text-8xl font-black text-white leading-[0.85] tracking-tighter mb-8"
              >
                LET'S <br />
                <span className="text-bento-muted">BE</span> <br />
                CONNECTED.
              </h2>
              <p className="text-bento-muted text-lg max-w-md">
                Have a project in mind or just want to say hi? My inbox is always open.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4 text-white hover:text-bento-accent transition-colors cursor-pointer group">
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 group-hover:border-bento-accent/50 transition-colors">
                  <Mail size={20} />
                </div>
                <span className="font-medium">maneeshageethanga.me</span>
              </div>
              <div className="flex items-center gap-4 text-white hover:text-bento-accent transition-colors cursor-pointer group">
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 group-hover:border-bento-accent/50 transition-colors">
                  <MapPin size={20} />
                </div>
                <span className="font-medium">Gampaha, Sri Lanka</span>
              </div>
            </div>

            <div className="flex gap-4">
              {[Github, Linkedin, Twitter].map((Icon, idx) => (
                <a 
                  key={idx}
                  href="#" 
                  className="p-4 rounded-[24px] bg-bento-card border border-bento-border text-bento-muted hover:text-bento-accent hover:border-bento-accent/50 transition-all font-bold"
                >
                  <Icon size={24} />
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="rounded-[40px] bg-bento-card border border-bento-border p-8 md:p-12 relative overflow-hidden"
          >
            <form className="space-y-6 relative z-10">
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold tracking-widest text-bento-muted ml-1">FULL NAME</label>
                <input 
                  type="text" 
                  placeholder="John Doe" 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white placeholder:text-zinc-700 focus:outline-none focus:border-bento-accent/50 transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold tracking-widest text-bento-muted ml-1">EMAIL ADDRESS</label>
                <input 
                  type="email" 
                  placeholder="john@example.com" 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white placeholder:text-zinc-700 focus:outline-none focus:border-bento-accent/50 transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold tracking-widest text-bento-muted ml-1">MESSAGE</label>
                <textarea 
                  rows={4}
                  placeholder="Tell me about your project..." 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white placeholder:text-zinc-700 focus:outline-none focus:border-bento-accent/50 transition-colors resize-none"
                />
              </div>
              
              <button 
                type="submit"
                className="w-full group flex items-center justify-center gap-3 bg-bento-accent text-black font-black uppercase tracking-widest py-5 text-1xl rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                SEND IT
                <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>

            <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
              <div className="text-[120px] font-black tracking-tighter">HI</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
