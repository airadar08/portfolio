import Lenis from "lenis";

let lenis = null;

export const initLenis = () => {
  if (!lenis) {
    lenis = new Lenis({ duration: 1.15, smoothWheel: true });
  }
  return lenis;
};

export const scrollToId = (hash) => {
  const el = document.querySelector(hash);
  if (!el) return;
  if (lenis) {
    lenis.scrollTo(el, { offset: -72 });
  } else {
    el.scrollIntoView({ behavior: "smooth" });
  }
};
