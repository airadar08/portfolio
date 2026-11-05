import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

// Vertical 9:16 video in a white device frame with the soft glow ring.
// Autoplays muted while on screen, pauses when scrolled away; tap toggles sound.
export default function VideoPhone({ src, poster, label, hero = false }) {
  const ref = useRef(null);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.45 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
    if (!v.muted) {
      // only one video with sound at a time
      document.querySelectorAll("video").forEach((o) => {
        if (o !== v) o.muted = true;
      });
      document.dispatchEvent(new CustomEvent("pf-mute-others", { detail: v }));
    }
  };

  useEffect(() => {
    const h = (e) => {
      if (e.detail !== ref.current) setMuted(true);
    };
    document.addEventListener("pf-mute-others", h);
    return () => document.removeEventListener("pf-mute-others", h);
  }, []);

  return (
    <figure className={`phone ${hero ? "phone--hero" : ""}`}>
      <div className="phone__frame">
        <video
          ref={ref}
          src={src}
          poster={poster}
          muted
          loop
          playsInline
          preload="metadata"
          className="phone__video"
          onClick={toggle}
        />
        <button className="phone__sound" onClick={toggle} aria-label={muted ? "Unmute" : "Mute"}>
          {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </button>
      </div>
      {label && <figcaption className="phone__label">{label}</figcaption>}
    </figure>
  );
}
