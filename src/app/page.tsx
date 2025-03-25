'use client'
import AbilityCard from "@/components/AbilityCard";
import EvolotionCard from "@/components/EvolotionCard";
import ImageCard from "@/components/ImageCard";
import { GetPokemon } from "@/lib/service";
import { useEffect } from "react";


export default function Home() {
  

  useEffect(()=>{
    const test = async () => {
      await GetPokemon('pikachu');
    }
    test()
  },[])
  return (
    <div className="bg-[url(/assets/bgPkmn.png)] bg-no-repeat bg-cover min-h-screen min-w-screen float-left font-imprima">

      <div className="text-white grid grid-cols-1 gap-5 mx-10 sm:mx-20 xl:gap-x-20 lg:mx-30 lg:gap-x-10 lg:grid-cols-3 md:gap-x-0 md:mx-0 md:gap-10 md:grid-cols-4 mb-10">
        <div className="bg-blue-800 border-blue-950 border-4 rounded-xl text-lg text-white my-10 drop-shadow-lg h-13 lg:col-[2] md:col-start-2 md:col-end-4">

          <button className="mx-2 cursor-pointer"><i className="fa-solid fa-magnifying-glass fa-sm " ></i></button>
                   
          {/* style="color: #ffffff;"> */}

          <input type="text" placeholder=" Search" className="bg-blue-500 rounded-md py-2 xl:pr-25 lg:pr-5 pr-5" />

          <i className="fa-solid fa-shuffle fa-sm sm:ml-2 cursor-pointer"> </i>

          <button type="button" data-drawer-target="drawer-top-example" data-drawer-show="drawer-top-example" data-drawer-placement="top" aria-controls="drawer-top-example"><i className="fa-solid fa-heart fa-sm cursor-pointer"></i>
          </button> 
        </div>

        <div className="lg:row-[2] lg:col-[1] md:col-start-2 md:col-end-4 row-[4]">
          <AbilityCard />
        </div>

        <div className="lg:row-[2] lg:col-[2] row-[2] md:col-start-2 md:col-end-4">
          <ImageCard />
        </div>

        <div className="lg:row-[2] lg:col-[3] md:col-start-2 md:col-end-4 row-[3]">
          <EvolotionCard />
        </div>
        
      </div>
    </div>
  );
}
