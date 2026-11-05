import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { getStats } from "../lib/api";
import { useCountdown } from "../hooks/useCountdown";
import { IMAGES, LINKS } from "../lib/data";

const TimeBox = ({ value, label }) => (
  <div className="flex flex-col items-center">
    <span className="font-mono text-2xl sm:text-4xl font-bold text-cream tabular-nums border border-gold/25 bg-noir-bg/60 backdrop-blur-sm px-3 sm:px-4 py-2">
      {value}
    </span>
    <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.3em] text-ash mt-2">
      {label}
    </span>
  </div>
);

const MaskedLine = ({ children, delay }) => (
  <span className="block overflow-hidden pb-1">
    <motion.span
      className="block"
      initial={{ y: "115%" }}
      animate={{ y: 0 }}
      transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.span>
  </span>
);

const Hero = () => {
  const ref = useRef(null);
  const [dropAt, setDropAt] = useState(null);
  const time = useCountdown(dropAt);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.18]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    getStats()
      .then((s) => setDropAt(s.drop_at))
      .catch(() =>
        setDropAt(new Date(Date.now() + 14 * 86400000).toISOString())
      );
  }, []);

  return (
    <section id="watch" ref={ref} className="relative min-h-screen flex items-end overflow-hidden">
      <motion.div style={{ y: imgY, scale: imgScale }} className="absolute inset-0">
        <img
          src={IMAGES.hero}
          alt="Juno, in a red beanie and mustard jacket, hides behind a museum pillar clutching a gold mask in a green bundle while a guard stands watch"
          className="w-full h-full object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-noir-bg via-noir-bg/55 to-noir-bg/30" />
      <div className="absolute inset-0 bg-gradient-to-r from-noir-bg/70 via-transparent to-transparent" />

      <motion.div
        style={{ opacity: fade }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-24 pt-40 w-full"
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="flex flex-wrap items-center gap-x-4 gap-y-3 mb-8"
        >
          <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.3em] text-neon flex items-center gap-2">
            <span className="live-dot inline-block w-2 h-2 rounded-full bg-neon" />
            Episode 5 drops in
          </span>
          <div data-testid="hero-countdown-timer" className="flex items-start gap-2 sm:gap-3">
            <TimeBox value={time.days} label="Days" />
            <span className="font-mono text-2xl sm:text-4xl text-gold/60 pt-2">:</span>
            <TimeBox value={time.hours} label="Hrs" />
            <span className="font-mono text-2xl sm:text-4xl text-gold/60 pt-2">:</span>
            <TimeBox value={time.minutes} label="Min" />
            <span className="font-mono text-2xl sm:text-4xl text-gold/60 pt-2">:</span>
            <TimeBox value={time.seconds} label="Sec" />
          </div>
        </motion.div>

        <h1 className="font-display font-black tracking-tight leading-[0.95] text-5xl sm:text-7xl lg:text-8xl text-cream max-w-4xl">
          <MaskedLine delay={0.25}>The heist</MaskedLine>
          <MaskedLine delay={0.38}>
            isn't <em className="italic text-gold">over.</em>
          </MaskedLine>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-6 max-w-xl text-sm sm:text-lg text-ash leading-relaxed"
        >
          One gold mask. One midnight train. Nobody is who they seem. A thriller
          told in Instagram Reels, where{" "}
          <span className="text-cream">your comments decide what happens next.</span>{" "}
          A new episode drops every day, and you have 24 hours to choose before
          the story moves on without you.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.85 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <a
            data-testid="hero-watch-instagram-btn"
            href={LINKS.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="group font-mono text-xs uppercase tracking-[0.25em] bg-gold text-noir-bg px-7 py-4 hover:bg-gold-hover transition-colors duration-300"
          >
            Watch on Instagram
            <span className="inline-block ml-2 transition-transform duration-300 group-hover:translate-x-1">▸</span>
          </a>
          <a
            data-testid="hero-catchup-youtube-btn"
            href={LINKS.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs uppercase tracking-[0.25em] border border-cream/30 text-cream px-7 py-4 hover:border-gold hover:text-gold transition-colors duration-300"
          >
            Catch up on YouTube
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="mt-12 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[10px] sm:text-xs uppercase tracking-[0.25em] text-ash"
        >
          <span>EP 5 · Classified</span>
          <span className="text-gold/50">·</span>
          <span>The real mask · Director's safe</span>
          <span className="text-gold/50">·</span>
          <span>Midnight · Moving train</span>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
