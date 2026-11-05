import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { IMAGES, LINKS } from "../lib/data";

const FullFilm = () => (
  <section className="py-20 sm:py-28 border-t border-gold/10">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-end justify-between gap-4 mb-10 sm:mb-14">
        <div>
          <p className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.3em] text-gold mb-4">
            YouTube · Full cut
          </p>
          <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-cream">
            The full <em className="italic text-gold">cut.</em>
          </h2>
        </div>
        <p className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.25em] text-ash">
          EP 1–4 · Director's edit
        </p>
      </div>

      <motion.a
        data-testid="youtube-play-btn"
        href={LINKS.youtube}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="group relative block aspect-video overflow-hidden border border-gold/25"
      >
        <img
          src={IMAGES.film}
          alt="Full cut premiere thumbnail — rain-slicked Mumbai streets glowing under neon signage at night"
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-noir-bg/45 group-hover:bg-noir-bg/30 transition-colors duration-500" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border border-gold/60 bg-noir-bg/60 backdrop-blur-sm flex items-center justify-center transition-all duration-500 group-hover:bg-gold group-hover:scale-110">
            <Play size={30} className="text-gold ml-1 transition-colors duration-500 group-hover:text-noir-bg" fill="currentColor" />
          </span>
        </div>
        <div className="absolute bottom-0 inset-x-0 p-5 sm:p-7 flex items-center justify-between bg-gradient-to-t from-noir-bg/90 to-transparent">
          <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.25em] text-cream">
            The Four Minutes · Full cut · Vol. 1
          </span>
          <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.25em] text-gold">
            Watch on YouTube ▸
          </span>
        </div>
      </motion.a>
    </div>
  </section>
);

export default FullFilm;
