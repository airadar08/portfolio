import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { CHARACTERS } from "../lib/data";

const CharacterCard = ({ c, index }) => {
  const ref = useRef(null);
  // Same treatment as the hero: slow parallax drift + gentle zoom while scrolling.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.12, 1.2]);

  return (
    <motion.article
      ref={ref}
      data-testid={`character-card-${c.id}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      className="group bg-noir-surface border border-gold/15 hover:border-gold/40 transition-colors duration-500 overflow-hidden"
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <motion.div style={{ y: imgY, scale: imgScale }} className="absolute inset-0">
          <img
            src={c.image}
            alt={c.alt}
            loading="lazy"
            className="w-full h-full object-cover object-top"
          />
        </motion.div>
        {/* Same gradient stack as the hero banner */}
        <div className="absolute inset-0 bg-gradient-to-t from-noir-surface via-noir-surface/55 to-noir-surface/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-noir-surface/40 via-transparent to-transparent" />

        <p className="absolute top-5 left-6 font-mono text-[10px] uppercase tracking-[0.3em] text-ash">
          File {String(index + 1).padStart(2, "0")}
          {c.spoiler && <span className="text-neon"> · Spoiler: EP 4</span>}
        </p>

        <div className="absolute bottom-0 inset-x-0 p-6 sm:p-7">
          <h3 className="font-display text-2xl sm:text-3xl font-bold text-cream">
            {c.name}
          </h3>
          <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.2em] text-gold">
            {c.role}
          </p>
        </div>
      </div>

      <p className="px-6 sm:px-7 pb-7 pt-1 text-sm text-ash leading-relaxed">{c.blurb}</p>
    </motion.article>
  );
};

const Characters = () => (
  <section id="characters" className="py-20 sm:py-28 border-t border-gold/10">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <p className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.3em] text-gold mb-4">
        Dramatis personae · Suspects
      </p>
      <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-cream mb-10 sm:mb-14">
        Who's <em className="italic text-gold">who.</em>
      </h2>

      <div className="grid md:grid-cols-3 gap-5 sm:gap-6">
        {CHARACTERS.map((c, i) => (
          <CharacterCard key={c.id} c={c} index={i} />
        ))}
      </div>
    </div>
  </section>
);

export default Characters;
