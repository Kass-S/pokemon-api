import AbilityCard from "@/components/AbilityCard";
import EvolotionCard from "@/components/EvolotionCard";
import ImageCard from "@/components/ImageCard";


export default function Home() {
  return (
    <div className="">

      <div>
        <div>
          <ImageCard />
        </div>
        <div>
          <EvolotionCard />
        </div>
        <div>
          <AbilityCard />
        </div>
        
      </div>
    </div>
  );
}
