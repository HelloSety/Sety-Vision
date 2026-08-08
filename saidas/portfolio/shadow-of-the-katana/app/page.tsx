import Navbar from "@/components/Navbar";
import HeroBlade from "@/components/sections/HeroBlade";
import Bushido from "@/components/sections/Bushido";
import FinalScene from "@/components/sections/FinalScene";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroBlade />
        <Bushido />
        <FinalScene />
      </main>
      <Footer />
    </>
  );
}
