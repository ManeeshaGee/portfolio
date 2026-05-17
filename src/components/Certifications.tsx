import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Award, ExternalLink, X, ShieldCheck } from 'lucide-react';
import { Certification } from '../types';

/** @type {Certification[]} */
const CERT_DATA = [
  {
    id: '1',
    name: 'AWS Cloud Practitioner Essentials Certification',
    issuer: 'Amazon Web Services',
    date: 'April 2026',
    link: '/aws new certification.jpg'
  },
  {
    id: '2',
    name: 'Frontend Developer(React) Certification',
    issuer: 'HackerRank',
    date: 'April 2026',
    link: '/react_cert.jpg'
  },
  {
    id: '3',
    name: 'Docker Foundations Professional Certification ',
    issuer: 'LinkedIn Learning',
    date: 'December 2025',
    link: 'docker_cert.jpg'
  },
  {
    id: '4',
    name: 'Career Essentials in Github Professional Certification ',
    issuer: 'GitHub',
    date: 'March 2026',
    link: '/github_cert.jpg'
  },
  {
    id: '5',
    name: 'Foundational C# with Microsoft Professional Certification ',
    issuer: 'Microsoft',
    date: 'August 2024',
    link: 'c sharp cert.jfif'
  },
  {
    id: '6',
    name: 'Introduction to Machine Learning',
    issuer: 'Kaggle',
    date: 'July 2025',
    link: 'kaggle crtification.jfif'
  }
];

export default function Certifications() {
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);

  const closeModal = useCallback(() => setSelectedCert(null), []);

  // Close on Escape key
  useEffect(() => {
    if (!selectedCert) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [selectedCert, closeModal]);

  // Lock body scroll while modal is open
  useEffect(() => {
    if (selectedCert) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [selectedCert]);

  return (
    <section className="py-16 px-6 md:px-12 bg-bento-bg">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-10">
          <div className="p-3 bg-bento-accent/10 rounded-2xl">
            <Award className="text-bento-accent" size={24} />
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter">CERTIFICATIONS</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CERT_DATA.map((cert, idx) => (
            <motion.div 
              key={cert.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: idx * 0.15, ease: "easeOut" }}
              className="group rounded-[32px] bg-bento-card border border-bento-border p-8 flex flex-col justify-between hover:border-bento-accent/50 transition-all duration-500"
            >
              <div>
                <span className="text-[10px] font-mono font-bold text-bento-accent uppercase tracking-widest block mb-4">
                  {cert.date}
                </span>
                <h3 className="text-xl font-bold text-white mb-2 leading-tight group-hover:text-bento-accent transition-colors">
                  {cert.name}
                </h3>
                <p className="text-bento-muted text-sm mb-6">{cert.issuer}</p>
              </div>

              {cert.link && (
                <button
                  onClick={() => setSelectedCert(cert)}
                  className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-widest group/link cursor-pointer bg-transparent border-none p-0 text-left"
                >
                  Verify Credential
                  <ExternalLink size={14} className="group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                </button>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Certification Image Modal ── */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            key="cert-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8"
            onClick={closeModal}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />

            {/* Modal Content */}
            <motion.div
              key="cert-modal-content"
              initial={{ opacity: 0, scale: 0.92, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 30 }}
              transition={{ type: 'spring', damping: 28, stiffness: 350 }}
              onClick={(e) => e.stopPropagation()}
              className="relative z-10 w-full max-w-3xl max-h-[90vh] rounded-[28px] bg-bento-card border border-bento-border shadow-2xl shadow-black/60 overflow-hidden flex flex-col"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-4 p-6 pb-4 border-b border-bento-border/50">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="shrink-0 p-2.5 bg-bento-accent/10 rounded-xl">
                    <ShieldCheck className="text-bento-accent" size={20} />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-base md:text-lg font-bold text-white leading-snug truncate">
                      {selectedCert.name}
                    </h3>
                    <p className="text-xs text-bento-muted mt-0.5">
                      {selectedCert.issuer} &middot; {selectedCert.date}
                    </p>
                  </div>
                </div>

                <button
                  onClick={closeModal}
                  className="shrink-0 p-2 rounded-xl bg-white/5 border border-white/10 text-bento-muted hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Image Area */}
              <div className="flex-1 overflow-auto p-6 flex items-center justify-center bg-black/20">
                <img
                  src={selectedCert.link}
                  alt={`${selectedCert.name} — ${selectedCert.issuer}`}
                  className="max-w-full max-h-[65vh] rounded-xl object-contain shadow-lg shadow-black/30 border border-white/5"
                  draggable={false}
                />
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between gap-4 p-5 pt-4 border-t border-bento-border/50">
                <span className="text-[10px] font-mono font-bold text-bento-accent uppercase tracking-widest">
                  Verified Credential
                </span>
                <a
                  href={selectedCert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-widest hover:text-bento-accent transition-colors"
                >
                  Open Original
                  <ExternalLink size={14} />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
