"use client";

import Script from "next/script";
import { useEffect } from "react";

const PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID;

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

// Delega o clique em qualquer link de WhatsApp (href com "wa.me") pra evento
// "Contact" do Pixel — cobre todos os CTAs do site (Hero, Navbar, Footer,
// Pricing, FloatingWhatsApp, páginas de nicho, VSL etc.) sem precisar
// instrumentar cada componente individualmente.
function useWhatsAppClickTracking() {
  useEffect(() => {
    if (!PIXEL_ID) return;

    function handleClick(e: MouseEvent) {
      const link = (e.target as HTMLElement)?.closest?.("a[href*='wa.me']");
      if (link && window.fbq) {
        window.fbq("track", "Contact");
      }
    }

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, []);
}

export function MetaPixel() {
  useWhatsAppClickTracking();

  if (!PIXEL_ID) return null;

  return (
    <>
      <Script id="meta-pixel-base" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${PIXEL_ID}');
          fbq('track', 'PageView');
        `}
      </Script>
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  );
}
