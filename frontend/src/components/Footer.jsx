import { LINKS } from "../lib/data";

const Footer = () => (
  <footer data-testid="site-footer" className="border-t border-gold/15 py-12">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
      <p className="font-display text-sm font-black tracking-[0.22em] text-cream uppercase">
        The <span className="italic text-gold">Four</span> Minutes
      </p>
      <div className="flex items-center gap-6 font-mono text-[11px] uppercase tracking-[0.25em] text-ash">
        <a href={LINKS.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">
          Instagram
        </a>
        <a href={LINKS.youtube} target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">
          YouTube
        </a>
        <a href="mailto:collab@thefourminutes.in" className="hover:text-gold transition-colors">
          Collab
        </a>
      </div>
      <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-ash/70">
        © {new Date().getFullYear()} · A work of fiction
      </p>
    </div>
  </footer>
);

export default Footer;
