import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { scrollToId } from "../lib/lenis";

const LINKS = [
  { label: "Watch", href: "#watch", testid: "nav-link-watch" },
  { label: "Episodes", href: "#episodes", testid: "nav-link-episodes" },
  { label: "Characters", href: "#characters", testid: "nav-link-characters" },
  { label: "Leaderboard", href: "#leaderboard", testid: "nav-link-leaderboard" },
  { label: "FAQ", href: "#faq", testid: "nav-link-faq" },
];

const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (href) => {
    setOpen(false);
    scrollToId(href);
  };

  return (
    <header
      data-testid="site-nav"
      className={`fixed top-0 inset-x-0 z-50 border-b transition-colors duration-500 ${
        scrolled
          ? "bg-noir-bg/85 backdrop-blur-md border-gold/20"
          : "bg-transparent border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        <button
          data-testid="nav-wordmark"
          onClick={() => go("#watch")}
          className="font-display text-sm sm:text-base font-black tracking-[0.22em] text-cream uppercase"
        >
          The <span className="italic text-gold">Four</span> Minutes
        </button>

        <nav className="hidden md:flex items-center gap-8">
          {LINKS.map((l) => (
            <button
              key={l.href}
              data-testid={l.testid}
              onClick={() => go(l.href)}
              className="font-mono text-[11px] uppercase tracking-[0.25em] text-ash hover:text-gold transition-colors duration-300"
            >
              {l.label}
            </button>
          ))}
          <button
            data-testid="nav-join-story-btn"
            onClick={() => go("#join")}
            className="font-mono text-[11px] uppercase tracking-[0.25em] bg-gold text-noir-bg px-5 py-2.5 hover:bg-gold-hover transition-colors duration-300"
          >
            Join the story
          </button>
        </nav>

        <button
          data-testid="nav-mobile-menu-btn"
          onClick={() => setOpen(!open)}
          className="md:hidden text-cream p-2"
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-noir-bg/95 backdrop-blur-md border-t border-gold/20 px-4 py-6 flex flex-col gap-5">
          {LINKS.map((l) => (
            <button
              key={l.href}
              data-testid={`${l.testid}-mobile`}
              onClick={() => go(l.href)}
              className="text-left font-mono text-xs uppercase tracking-[0.25em] text-ash hover:text-gold"
            >
              {l.label}
            </button>
          ))}
          <button
            data-testid="nav-join-story-btn-mobile"
            onClick={() => go("#join")}
            className="font-mono text-xs uppercase tracking-[0.25em] bg-gold text-noir-bg px-5 py-3 w-max"
          >
            Join the story
          </button>
        </div>
      )}
    </header>
  );
};

export default Nav;
