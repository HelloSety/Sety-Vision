import GarageHome from "@/components/sections/GarageHome";
import CinematicStory from "@/components/sections/CinematicStory";
import Collection from "@/components/sections/Collection";
import FinalCTA from "@/components/sections/FinalCTA";

export default function Home() {
  return (
    <>
      <main>
        <GarageHome />
        <CinematicStory />
        <Collection />
      </main>
      <FinalCTA />
    </>
  );
}
