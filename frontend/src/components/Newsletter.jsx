import { useState } from "react";
import { motion } from "framer-motion";
import { subscribe } from "../lib/api";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [state, setState] = useState("idle");
  const [message, setMessage] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setState("loading");
    try {
      const res = await subscribe(email.trim());
      setMessage(res.message);
      setState("done");
    } catch {
      setMessage("The line is dead. Try again in a moment.");
      setState("error");
    }
  };

  return (
    <section id="join" className="py-20 sm:py-28 border-t border-gold/10 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.3em] text-gold mb-4">
            Dead drop · Join the list
          </p>
          <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-cream">
            Be the first to <em className="italic text-gold">know.</em>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-ash max-w-xl mx-auto leading-relaxed">
            One email before every drop. No spam — just the signal.
          </p>

          {state === "done" ? (
            <p
              data-testid="newsletter-success"
              className="mt-10 font-mono text-xs sm:text-sm uppercase tracking-[0.2em] text-gold"
            >
              {message}
            </p>
          ) : (
            <form
              onSubmit={submit}
              className="mt-10 flex flex-col sm:flex-row gap-3 max-w-xl mx-auto"
            >
              <input
                data-testid="newsletter-email-input"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                className="flex-1 bg-noir-surface border border-gold/20 focus:border-gold/60 outline-none font-mono text-xs tracking-[0.15em] text-cream placeholder:text-ash/60 px-5 py-4 transition-colors duration-300"
              />
              <button
                data-testid="newsletter-submit-btn"
                type="submit"
                disabled={state === "loading"}
                className="font-mono text-xs uppercase tracking-[0.25em] bg-gold text-noir-bg px-7 py-4 hover:bg-gold-hover transition-colors duration-300 disabled:opacity-60"
              >
                {state === "loading" ? "Sending…" : "Join the story"}
              </button>
            </form>
          )}
          {state === "error" && (
            <p
              data-testid="newsletter-error"
              className="mt-4 font-mono text-[11px] uppercase tracking-[0.2em] text-neon"
            >
              {message}
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;
