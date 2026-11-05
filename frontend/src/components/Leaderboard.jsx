import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { getLeaderboard } from "../lib/api";

const RankBadge = ({ rank }) => {
  const top = rank <= 3;
  return (
    <span
      className={`font-mono text-xs sm:text-sm font-bold w-9 h-9 shrink-0 flex items-center justify-center border ${
        top
          ? "border-gold text-gold bg-gold/10"
          : "border-gold/15 text-ash"
      }`}
    >
      {String(rank).padStart(2, "0")}
    </span>
  );
};

const Leaderboard = () => {
  const [rows, setRows] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const id = setTimeout(() => {
      getLeaderboard(search.trim() || null)
        .then(setRows)
        .catch(() => {})
        .finally(() => setLoading(false));
    }, 250);
    return () => clearTimeout(id);
  }, [search]);

  return (
    <section id="leaderboard" className="py-20 sm:py-28 border-t border-gold/10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-10 sm:mb-14">
          <div>
            <p className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.3em] text-gold mb-4">
              Leaderboard · Top commenters
            </p>
            <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-cream">
              Most <em className="italic text-gold">wanted.</em>
            </h2>
          </div>
          <div className="relative w-full sm:w-72">
            <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-ash" />
            <input
              data-testid="leaderboard-search-input"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Find your handle"
              className="w-full bg-noir-surface border border-gold/20 focus:border-gold/60 outline-none font-mono text-xs tracking-[0.15em] text-cream placeholder:text-ash/60 pl-11 pr-4 py-3.5 transition-colors duration-300"
            />
          </div>
        </div>

        <div data-testid="leaderboard-list" className="border-t border-gold/15">
          {rows.map((r, i) => (
            <motion.div
              key={r.handle}
              data-testid={`leaderboard-row-${r.rank}`}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: Math.min(i * 0.05, 0.4) }}
              className="flex items-center gap-4 sm:gap-6 py-4 sm:py-5 border-b border-gold/10 hover:bg-noir-surface/70 px-2 sm:px-4 transition-colors duration-300"
            >
              <RankBadge rank={r.rank} />
              <span className="font-mono text-sm sm:text-base text-cream flex-1 truncate">
                {r.handle}
              </span>
              <span className="hidden sm:block font-mono text-[10px] uppercase tracking-[0.25em] text-ash">
                {r.comments} comments
              </span>
              <span className="font-mono text-sm sm:text-base font-bold text-gold tabular-nums">
                {r.points.toLocaleString("en-IN")}
                <span className="text-ash text-[10px] ml-1.5 uppercase tracking-widest">pts</span>
              </span>
            </motion.div>
          ))}
          {!loading && rows.length === 0 && (
            <p data-testid="leaderboard-empty" className="py-10 text-center font-mono text-xs uppercase tracking-[0.25em] text-ash">
              No handle found · comment on the latest Reel to get listed
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Leaderboard;
