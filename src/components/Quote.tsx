import { motion } from 'motion/react';

export default function Quote() {
  return (
    <section id="quote" className="pt-12 pb-12 px-6 md:px-12">
      <div className="max-w-4xl mx-auto rounded-[32px] bg-bento-card border border-bento-border p-8 md:p-12">
        <motion.blockquote
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="text-xl md:text-3xl font-semibold leading-tight text-white italic">
            “There is no failure except in no longer trying”
          </p>
          <footer className="mt-6 text-bento-muted uppercase tracking-widest text-sm font-medium">
            — Elbert Hubbard
          </footer>
        </motion.blockquote>
      </div>
    </section>
  );
}
