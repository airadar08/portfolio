import { useEffect } from "react";
import "@/App.css";
import { initLenis } from "@/lib/lenis";
import GrainOverlay from "@/components/GrainOverlay";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Ticker from "@/components/Ticker";
import Episodes from "@/components/Episodes";
import LiveVote from "@/components/LiveVote";
import StatusMeters from "@/components/StatusMeters";
import Characters from "@/components/Characters";
import Leaderboard from "@/components/Leaderboard";
import WaysIn from "@/components/WaysIn";
import FullFilm from "@/components/FullFilm";
import Newsletter from "@/components/Newsletter";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";

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

  return (
    <div className="App bg-noir-bg text-cream font-body">
      <GrainOverlay />
      <Nav />
      <main>
        <Hero />
        <Ticker />
        <Episodes />
        <LiveVote />
        <StatusMeters />
        <Characters />
        <Leaderboard />
        <WaysIn />
        <FullFilm />
        <Newsletter />
        <Faq />
      </main>
      <Footer />
    </div>
  );
}

export default App;
