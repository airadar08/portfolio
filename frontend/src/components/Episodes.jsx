import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Lock, ArrowUpRight } from "lucide-react";
import { EPISODES, LINKS } from "../lib/data";

const EpisodeCard = ({ ep, index }) => {
  const ref = useRef(null);
  // Hero-style slow zoom while scrolling, anchored to the top-left corner so the
  // EP number and title printed on each poster are never cropped.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  const inner = (
    <motion.article
      ref={ref}
      data-testid={`episode-card-${ep.id}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative shrink-0 w-[280px] sm:w-[340px] snap-start bg-noir-surface border transition-colors duration-500 overflow-hidden ${
        ep.locked
          ? "border-gold/10"
          : "border-gold/20 hover:border-gold/60"
      }`}
    >
      <div className="relative aspect-[9/16] overflow-hidden">
        <motion.div style={{ scale: imgScale, transformOrigin: "0% 0%" }} className="absolute inset-0">
          <img
            src={ep.image}
            alt={ep.alt}
            loading="lazy"
            className={`w-full h-full object-cover object-left-top origin-top-left transition-transform duration-700 group-hover:scale-105 ${
              ep.locked ? "blur-md scale-110 opacity-50" : ""
            }`}
          />
        </motion.div>
        {/* Same gradient stack as the hero banner */}
        <div className="absolute inset-0 bg-gradient-to-t from-noir-surface via-noir-surface/55 to-noir-surface/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-noir-surface/40 via-transparent to-transparent" />

        <div className="absolute top-4 right-4 flex items-center gap-2 bg-noir-bg/70 backdrop-blur-sm px-2.5 py-1.5">
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold">
            {ep.num}
          </span>
          <span className="text-gold/40 text-[10px]">·</span>
          <span
            className={`font-mono text-[10px] uppercase tracking-[0.25em] flex items-center gap-1.5 ${
              ep.live ? "text-neon" : ep.locked ? "text-ash" : "text-ash"
            }`}
          >
            {ep.live && <span className="live-dot inline-block w-1.5 h-1.5 rounded-full bg-neon" />}
            {ep.status}
          </span>
        </div>

        {ep.locked && (
          <>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="border-2 border-neon/70 text-neon font-mono text-xs uppercase tracking-[0.35em] px-4 py-2 rotate-[-8deg] bg-noir-bg/60 backdrop-blur-sm flex items-center gap-2">
                <Lock size={14} /> Classified
              </div>
            </div>
          </>
        )}
      </div>

      <div className="p-5 sm:p-6 border-t border-gold/10">
        <h3 className="font-display text-xl sm:text-2xl font-bold text-cream">
          {ep.title}
        </h3>
        <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.25em] text-ash">
          {ep.date}
        </p>
        <p className="mt-4 text-xs sm:text-sm text-ash leading-relaxed min-h-[2.5rem]">
          {ep.choice}
        </p>
        {!ep.locked && (
          <span
            data-testid={`episode-open-${ep.id}`}
            className="mt-4 inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-[0.25em] text-gold group-hover:gap-2 transition-all duration-300"
          >
            Open <ArrowUpRight size={13} />
          </span>
        )}
      </div>
    </motion.article>
  );

  return ep.locked ? (
    inner
  ) : (
    <a href={LINKS.instagram} target="_blank" rel="noopener noreferrer" className="shrink-0 snap-start">
      {inner}
    </a>
  );
};

const Episodes = () => (
  <section id="episodes" className="py-20 sm:py-28">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-end justify-between gap-6 mb-10 sm:mb-14">
        <div>
          <p className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.3em] text-gold mb-4">
            Case files · 5 of 5
          </p>
          <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-cream">
            The story <em className="italic text-gold">so far.</em>
          </h2>
        </div>
        <p className="hidden sm:block font-mono text-[10px] uppercase tracking-[0.25em] text-ash shrink-0">
          Scroll sideways ▸
        </p>
      </div>
    </div>
    <div className="max-w-7xl mx-auto pl-4 sm:pl-6 lg:pl-8">
      <div className="episode-rail flex gap-5 sm:gap-6 overflow-x-auto pb-6 pr-4 snap-x snap-mandatory">
        {EPISODES.map((ep, i) => (
          <EpisodeCard key={ep.id} ep={ep} index={i} />
        ))}
      </div>
    </div>
  </section>
);

export default Episodes;
