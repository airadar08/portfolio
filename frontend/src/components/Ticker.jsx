import { useEffect, useState } from "react";
import { getStats } from "../lib/api";

const Ticker = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    getStats().then(setStats).catch(() => {});
  }, []);

  const items = [
    "EP 4 · Vote open · STEAL or JUMP · 24 hours",
    ...(stats?.comments
      ? [`${stats.comments.toLocaleString("en-IN")} comments counted`]
      : []),
    "The city is watching",
    "The real mask · Director's safe",
    `Heat level · ${stats?.heat_pct ?? 86}%`,
    "EP 5 · Classified",
    "Full cut on YouTube",
  ];

  const strip = items.map((t, i) => (
    <span key={i} className="flex items-center shrink-0">
      <span className="font-mono text-[11px] sm:text-xs uppercase tracking-[0.3em] text-ash">
        {t}
      </span>
      <span className="mx-8 text-gold text-xs">·</span>
    </span>
  ));

  return (
    <div
      data-testid="ticker-banner"
      className="relative border-y border-gold/15 bg-noir-surface/60 py-4 overflow-hidden"
    >
      <div className="animate-marquee flex w-max">
        <div className="flex shrink-0">{strip}</div>
        <div className="flex shrink-0" aria-hidden="true">{strip}</div>
      </div>
    </div>
  );
};

export default Ticker;
