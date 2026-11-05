import { motion } from "framer-motion";
import { LINKS } from "../lib/data";

const TIERS = [
  {
    name: "The Passenger",
    price: "Free",
    cadence: "forever",
    blurb: "Follow the story as it unfolds, one Reel at a time.",
    perks: ["Every episode, free", "Your comment is your vote", "Drop alerts on Instagram"],
    cta: "Follow on Instagram",
    testid: "tier-passenger-cta",
    featured: false,
  },
  {
    name: "The Informant",
    price: "₹199",
    cadence: "per month",
    blurb: "Supporter Pass. For those who want to know before the city does.",
    perks: ["Early intel drops", "Extended director's cuts", "Name in the credits", "Supporters-only polls"],
    cta: "Become a supporter",
    testid: "tier-informant-cta",
    featured: true,
  },
  {
    name: "The Cameo",
    price: "₹4,999",
    cadence: "one time",
    blurb: "Put your name in the story — written into the plot itself.",
    perks: ["Your name on screen", "A prop named after you", "A framed case-file page"],
    cta: "Claim a cameo",
    testid: "tier-cameo-cta",
    featured: false,
  },
];

const WaysIn = () => (
  <section className="py-20 sm:py-28 border-t border-gold/10">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <p className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.3em] text-gold mb-4">
        Access · Choose your clearance
      </p>
      <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-cream mb-10 sm:mb-14">
        Three ways <em className="italic text-gold">in.</em>
      </h2>

      <div className="grid md:grid-cols-3 gap-5 sm:gap-6 items-stretch">
        {TIERS.map((t, i) => (
          <motion.div
            key={t.name}
            data-testid={`tier-card-${i + 1}`}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
            className={`relative flex flex-col p-7 sm:p-9 border transition-colors duration-500 ${
              t.featured
                ? "bg-noir-elevated border-gold/60 shadow-[0_0_40px_rgba(232,163,61,0.08)]"
                : "bg-noir-surface border-gold/15 hover:border-gold/40"
            }`}
          >
            {t.featured && (
              <span className="absolute -top-3 left-7 bg-gold text-noir-bg font-mono text-[9px] uppercase tracking-[0.3em] px-3 py-1.5">
                Best intel
              </span>
            )}
            <h3 className="font-display text-2xl font-bold text-cream">{t.name}</h3>
            <div className="mt-5 flex items-baseline gap-2">
              <span className="font-mono text-3xl sm:text-4xl font-bold text-gold">{t.price}</span>
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-ash">
                {t.cadence}
              </span>
            </div>
            <p className="mt-4 text-sm text-ash leading-relaxed">{t.blurb}</p>
            <ul className="mt-6 space-y-3 flex-1">
              {t.perks.map((p) => (
                <li key={p} className="flex items-start gap-3 text-sm text-cream/85">
                  <span className="text-gold mt-0.5">·</span>
                  {p}
                </li>
              ))}
            </ul>
            <a
              data-testid={t.testid}
              href={LINKS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className={`mt-8 text-center font-mono text-[11px] uppercase tracking-[0.25em] px-6 py-4 transition-colors duration-300 ${
                t.featured
                  ? "bg-gold text-noir-bg hover:bg-gold-hover"
                  : "border border-cream/25 text-cream hover:border-gold hover:text-gold"
              }`}
            >
              {t.cta}
            </a>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default WaysIn;
