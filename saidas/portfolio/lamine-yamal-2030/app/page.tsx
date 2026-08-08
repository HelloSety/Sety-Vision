import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import Journey from "@/components/sections/Journey";
import Stats from "@/components/sections/Stats";
import Highlights from "@/components/sections/Highlights";
import Gallery from "@/components/sections/Gallery";
import FutureHud from "@/components/sections/FutureHud";
import Legacy from "@/components/sections/Legacy";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Journey />
        <Stats />
        <Highlights />
        <Gallery />
        <FutureHud />
        <Legacy />
      </main>
      <Footer />
    </>
  );
}
