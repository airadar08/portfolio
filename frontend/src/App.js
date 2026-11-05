import { useEffect } from "react";
import "@/App.css";
import "@/portfolio/portfolio.css";
import { initLenis } from "@/lib/lenis";
import Portfolio from "@/portfolio/Portfolio";

// The original "Four Minutes" series site lives on in src/LegacyApp.js.
function App() {
  useEffect(() => {
    const lenis = initLenis();
    let rafId;
    const loop = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return <Portfolio />;
}

export default App;
