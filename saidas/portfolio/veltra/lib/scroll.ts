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
    lenis.scrollTo(target, { offset: 0, duration: 1.6 });
  } else {
    target.scrollIntoView({ behavior: "smooth" });
  }
}

export function scrollToBottom() {
  const lenis = window.__lenis;
  const target = document.documentElement.scrollHeight;
  if (lenis) {
    lenis.scrollTo(target, { duration: 1.8 });
  } else {
    window.scrollTo({ top: target, behavior: "smooth" });
  }
}
