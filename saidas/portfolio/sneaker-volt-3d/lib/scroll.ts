import type Lenis from "lenis";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

export function scrollToId(id: string) {
  const target = document.getElementById(id);
  if (!target) return;

  const lenis = window.__lenis;
  if (lenis) {
    lenis.scrollTo(target, { offset: -40, duration: 1.4 });
  } else {
    target.scrollIntoView({ behavior: "smooth" });
  }
}
