import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getStats, getVote, postVote } from "../lib/api";
import { useCountdown } from "../hooks/useCountdown";
import { LINKS } from "../lib/data";

const LiveVote = () => {
  const [vote, setVote] = useState(null);
  const [voted, setVoted] = useState(null);
  const [deadline, setDeadline] = useState(null);
  const t = useCountdown(deadline);

  useEffect(() => {
    getVote().then(setVote).catch(() => {});
    getStats().then((s) => setDeadline(s.vote_closes_at)).catch(() => {});
  }, []);

  const cast = async (choice) => {
    if (voted) return;
    setVoted(choice);
    try {
      setVote(await postVote(choice));
    } catch {}
  };

  const aPct = vote?.a_pct ?? 50;
  const bPct = vote?.b_pct ?? 50;
  const aLabel = vote?.a_label ?? "STEAL";
  const bLabel = vote?.b_label ?? "JUMP";

  return (
    <section id="vote" className="py-20 sm:py-28 border-t border-gold/10 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-6">
            <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.3em] text-neon flex items-center gap-2">
              <span className="live-dot inline-block w-2 h-2 rounded-full bg-neon" />
              EP 4 · Voting open
            </span>
            <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.3em] text-ash">
              Closes when EP 5 drops ·{" "}
              <span data-testid="vote-deadline-countdown" className="text-cream tabular-nums">
                {t.hours}:{t.minutes}:{t.seconds}
              </span>
            </span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-cream leading-tight max-w-3xl">
            {vote?.question ??
              "The train is moving. The real mask is in the director's safe, and you hold the only key."}{" "}
            Does she <em className="italic text-gold">steal</em> it, or <em className="italic text-gold">jump?</em>
          </h2>

          <p className="mt-4 text-sm sm:text-base text-ash max-w-2xl leading-relaxed">
            The landlord has the key, the detective has the photo, and the real mask sits in the <span className="redacted">director's office safe</span>.
            Comment <span className="font-mono text-gold">STEAL</span> or{" "}
            <span className="font-mono text-gold">JUMP</span> on the latest Reel. The
            majority writes Episode 5.
          </p>

          <div className="mt-12">
            <div
              data-testid="vote-split-bar"
              className="flex h-14 sm:h-16 w-full border border-gold/25 overflow-hidden bg-noir-surface"
            >
              <motion.div
                animate={{ width: `${aPct}%` }}
                transition={{ type: "spring", stiffness: 60, damping: 20 }}
                className="bg-gold flex items-center justify-between px-4 sm:px-6 min-w-[90px]"
              >
                <span className="font-mono text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-noir-bg">
                  {aLabel}
                </span>
                <span className="font-mono text-sm sm:text-lg font-bold text-noir-bg tabular-nums">
                  {aPct}%
                </span>
              </motion.div>
              <motion.div
                animate={{ width: `${bPct}%` }}
                transition={{ type: "spring", stiffness: 60, damping: 20 }}
                className="bg-noir-elevated flex items-center justify-between px-4 sm:px-6 min-w-[90px] border-l border-gold/25"
              >
                <span className="font-mono text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-cream">
                  {bLabel}
                </span>
                <span className="font-mono text-sm sm:text-lg font-bold text-cream tabular-nums">
                  {bPct}%
                </span>
              </motion.div>
            </div>

            <div className="mt-3 flex flex-wrap items-center justify-between gap-2 font-mono text-[10px] sm:text-xs uppercase tracking-[0.25em] text-ash">
              <span data-testid="vote-total-count">
                {(vote?.total ?? 0).toLocaleString("en-IN")} comments counted
              </span>
              <span data-testid="vote-keyword">
                Vote keyword · <span className="text-gold">{aLabel}</span> /{" "}
                <span className="text-gold">{bLabel}</span>
              </span>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                data-testid="vote-option-run-btn"
                onClick={() => cast("a")}
                disabled={!!voted}
                className={`font-mono text-xs uppercase tracking-[0.25em] px-7 py-4 transition-colors duration-300 ${
                  voted === "a"
                    ? "bg-gold text-noir-bg"
                    : "border border-gold/40 text-gold hover:bg-gold hover:text-noir-bg"
                } disabled:opacity-80`}
              >
                {voted === "a" ? `Logged · ${aLabel}` : `Boost · ${aLabel}`}
              </button>
              <button
                data-testid="vote-option-stay-btn"
                onClick={() => cast("b")}
                disabled={!!voted}
                className={`font-mono text-xs uppercase tracking-[0.25em] px-7 py-4 transition-colors duration-300 ${
                  voted === "b"
                    ? "bg-cream text-noir-bg"
                    : "border border-cream/30 text-cream hover:bg-cream hover:text-noir-bg"
                } disabled:opacity-80`}
              >
                {voted === "b" ? `Logged · ${bLabel}` : `Boost · ${bLabel}`}
              </button>
              <a
                data-testid="vote-on-instagram-link"
                href={LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[11px] uppercase tracking-[0.25em] text-neon hover:text-gold transition-colors duration-300"
              >
                Cast the real vote on Instagram ▸
              </a>
            </div>
            <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-ash/70">
              Site boosts are counted with the tally · the official count lives in the comments
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LiveVote;
