import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FileSearch, Flame } from "lucide-react";
import { getStats } from "../lib/api";

const Meter = ({ icon: Icon, label, value, pct, tone, testid, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    className="bg-noir-surface border border-gold/15 p-6 sm:p-8"
  >
    <div className="flex items-center justify-between mb-6">
      <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.3em] text-ash flex items-center gap-2">
        <Icon size={14} className={tone === "heat" ? "text-neon" : "text-gold"} />
        {label}
      </span>
      <span
        className={`font-mono text-xl sm:text-2xl font-bold tabular-nums ${
          tone === "heat" ? "text-neon" : "text-gold"
        }`}
      >
        {value}
      </span>
    </div>
    <div className="h-2.5 w-full bg-noir-bg border border-gold/10 overflow-hidden">
      <motion.div
        data-testid={testid}
        initial={{ width: 0 }}
        whileInView={{ width: `${pct}%` }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 1.4, delay: delay + 0.2, ease: [0.16, 1, 0.3, 1] }}
        className={`h-full ${
          tone === "heat"
            ? "bg-neon shadow-[0_0_16px_rgba(255,46,136,0.5)]"
            : "bg-gold shadow-[0_0_16px_rgba(232,163,61,0.45)]"
        }`}
      />
    </div>
    <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.25em] text-ash/70">
      {tone === "heat" ? "Police attention · rising since EP 2" : "Juno's only proof was taken in EP 4"}
    </p>
  </motion.div>
);

const StatusMeters = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    getStats().then(setStats).catch(() => {});
  }, []);

  return (
    <section className="py-20 sm:py-24 border-t border-gold/10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.3em] text-gold mb-4">
          Story status · Live
        </p>
        <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-cream mb-10 sm:mb-14">
          What's at <em className="italic text-gold">stake.</em>
        </h2>
        <div className="grid sm:grid-cols-2 gap-5 sm:gap-8">
          <Meter
            icon={FileSearch}
            label="Proof"
            value={`${stats?.proof_pct ?? 6}%`}
            pct={stats?.proof_pct ?? 6}
            tone="cash"
            testid="meter-proof-bar"
            delay={0}
          />
          <Meter
            icon={Flame}
            label="Heat"
            value={`${stats?.heat_pct ?? 86}%`}
            pct={stats?.heat_pct ?? 86}
            tone="heat"
            testid="meter-heat-bar"
            delay={0.12}
          />
        </div>
      </div>
    </section>
  );
};

export default StatusMeters;
