import { motion } from 'motion/react';
import { GraduationCap, Award, Calendar, School } from 'lucide-react';
import { Education } from '../types';

const EDUCATION_DATA: Education[] = [
  {
    id: '1',
    degree: 'Bachelor of Information and Communication Technology',
    institution: 'University of Ruhuna, Sri Lanka',
    period: 'Jan 2023 - Dec 2026',
    description: 'CGPA - 3.80/4.0 (Ranked 1st in Batch)'
  },
  {
    id: '2',
    degree: 'GCE Advanced Level',
    institution: 'Henegama Central College National School, Henegama',
    period: 'Completed - Dec 2020',
    description: 'Stream - Engineering Technology (ET, SFT, ICT)'
  }
];

export default function EducationSection() {
  return (
    <section className="py-16 px-6 md:px-12 bg-bento-bg">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="h-px w-8 bg-blue-500" />
              <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-blue-500">ACADEMIC PATH</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter">EDUCATION.</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {EDUCATION_DATA.map((edu, idx) => (
            <motion.div 
              key={edu.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: idx * 0.2, ease: "easeOut" }}
              className="group rounded-[32px] bg-bento-card border border-bento-border p-8 relative overflow-hidden hover:border-blue-500/50 transition-colors"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="p-4 bg-blue-500/10 rounded-2xl">
                   {idx === 0 && <img className='h-20 w-auto' src="/uor_logo.png" alt="uni_logo" />}
                   {idx === 1 && <School size={50}/>}
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-bento-muted bg-white/5 px-3 py-1 rounded-full">
                  <Calendar size={12} />
                  {edu.period}
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-500 transition-colors">{edu.degree}</h3>
              <p className="text-bento-muted font-medium mb-4 text-sm">{edu.institution}</p>
              
              <div className="text-bento-muted/60 text-sm leading-relaxed space-y-2">
                {edu.id === '1' ? (
                  <>
                    <p>
                      <span className="text-bento-accent font-bold">CGPA - 3.80/4.0</span>{' '}
                      (<span className="text-white font-bold underline decoration-bento-accent/50 underline-offset-4">Ranked 1st in Batch</span>)
                    </p>
                    <p className="text-xs mt-4 pt-4 border-t border-white/5">
                      <span className="text-white/40 uppercase tracking-widest text-[9px] font-bold block mb-1">Relative Coursework</span>
                      Data Science, Software Engineering, Cloud Computing, Data Structures, Artificial Intelligence
                    </p>
                  </>
                ) : (
                  <p>{edu.description}</p>
                )}
              </div>
              
              {/* Card Accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.05),transparent_70%)]" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
