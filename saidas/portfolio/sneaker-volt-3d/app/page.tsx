import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import Specs from "@/components/sections/Specs";
import Gallery from "@/components/sections/Gallery";
import DropCTA from "@/components/sections/DropCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Specs />
        <Gallery />
        <DropCTA />
      </main>
      <Footer />
    </>
  );
}
