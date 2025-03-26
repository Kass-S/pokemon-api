'use client'
import AbilityCard from "@/components/AbilityCard";
import EvolotionCard from "@/components/EvolotionCard";
import ImageCard from "@/components/ImageCard";
import { GetEvolutionLine, GetLocation, GetPokemon } from "@/lib/service";
import { useEffect, useState } from "react";


export default function Home() {
  const [pkmnName, setPkmnName] = useState<string>('pikachu');
  const [pkmnId, setPkmnId] = useState<number>(25);
  const [pkmnImg, setPkmnImg] = useState<string>('');
  const [pkmnTypes, setPkmnTypes] = useState<string>('');
  const [pkmnAbilities, setPkmnAbilities] = useState<string>('');
  const [pkmnMoves, setPkmnMoves] = useState<string>('');
  const [pkmnEvoLine, setPkmnEvoLine] = useState<string>('');
  const [pkmnLocation, setPkmnLocation] = useState<string>('');
  

  useEffect(()=>{
    const AllPokemon = async () => {
      const pkmnData = await GetPokemon(pkmnName);
      if(pkmnData != undefined){
        let typeList: string[] = [];
        let abilityList: string[] = [];
        let moveList: string[] = [];
        let evoList: string[] = [];

        const pkmnEvoLine = await GetEvolutionLine(pkmnData.id);
        const pkmnLocation = await GetLocation(pkmnData.id);

        setPkmnImg(pkmnData.name);
        setPkmnId(pkmnData.id);
        setPkmnImg(pkmnData.sprites.other["official-artwork"].front_default);

        for(let i: number = 0; i < pkmnData.types.length; i++){
          typeList.push(pkmnData.types[i].type.name);
        }
        setPkmnTypes(typeList.join(", "));

        for(let i: number = 0; i < pkmnData.abilities.length; i++){
          abilityList.push(pkmnData.abilities[i].ability.name);
        }
        setPkmnAbilities(abilityList.join(", "));

        for(let i = 0; i < pkmnData.moves.length; i++)
        {
          moveList.push(pkmnData.moves[i].move.name);
        }
        setPkmnMoves(moveList.join(" | "));

        if(pkmnEvoLine != undefined){
          if(pkmnEvoLine.chain.evolves_to.length > 0){

            for(let i: number = 0; i < pkmnEvoLine.chain.evolves_to.length; i++){

              let evoLineCheck = await GetPokemon(pkmnEvoLine.chain.evolves_to[i].species.name);
              if(evoLineCheck != undefined){
                if(evoLineCheck.id < 650){
                  evoList.push(pkmnEvoLine.chain.evolves_to[i].species.name);
                }

                if(pkmnEvoLine.chain.evolves_to[i].evolves_to.length > 0){
                  for(let j = 0; j < pkmnEvoLine.chain.evolves_to[i].evolves_to.length; j++){

                    let evoLineCheck2 = await GetPokemon(pkmnEvoLine.chain.evolves_to[i].evolves_to[j].species.name);
                    if(evoLineCheck2 != undefined){
                      if(evoLineCheck2.id < 650){
                        evoList.push(pkmnEvoLine.chain.evolves_to[i].evolves_to[j].species.name);
                      }
                    }   
                  }
                }
              }
            }
            setPkmnEvoLine(pkmnEvoLine.chain.species.name + " - " + evoList.join(" - "));
          }else{
            setPkmnEvoLine("N/A");    
          }
        }

        if(pkmnLocation != undefined){
          if(pkmnLocation.length > 0){
            pkmnLocation;
            
          }else{
            setPkmnLocation("N/A");
          }
        }
      }  
    }
    AllPokemon();
  },[])
  return (
    <div className="bg-[url(/assets/bgPkmn.png)] bg-no-repeat bg-cover min-h-screen min-w-screen float-left font-imprima">

      <div className="text-white grid grid-cols-1 gap-5 mx-10 sm:mx-20 xl:gap-x-20 lg:mx-30 lg:gap-x-10 lg:grid-cols-3 md:gap-x-0 md:mx-0 md:gap-10 md:grid-cols-4 mb-10">
        <div className="bg-blue-800 border-blue-950 border-4 rounded-xl text-lg text-white my-10 drop-shadow-lg h-13 lg:col-[2] md:col-start-2 md:col-end-4">

          <button className="mx-2 cursor-pointer"><i className="fa-solid fa-magnifying-glass fa-sm " ></i></button>
                   
          {/* style="color: #ffffff;"> */}

          <input type="text" placeholder=" Search" className="bg-blue-500 rounded-md py-2 xl:pr-25 lg:pr-5 pr-5" onChange={(e) => setPkmnName(e.target.value)} />

          <i className="fa-solid fa-shuffle fa-sm sm:ml-2 cursor-pointer"> </i>

          <button type="button" data-drawer-target="drawer-top-example" data-drawer-show="drawer-top-example" data-drawer-placement="top" aria-controls="drawer-top-example"><i className="fa-solid fa-heart fa-sm cursor-pointer"></i>
          </button> 
        </div>

        <div className="lg:row-[2] lg:col-[1] md:col-start-2 md:col-end-4 row-[4]">
          <AbilityCard abilities={pkmnAbilities} moves={pkmnMoves} />
        </div>

        <div className="lg:row-[2] lg:col-[2] row-[2] md:col-start-2 md:col-end-4">
          <ImageCard name={pkmnName} id={pkmnId} image={pkmnImg} />
        </div>

        <div className="lg:row-[2] lg:col-[3] md:col-start-2 md:col-end-4 row-[3]">
          <EvolotionCard types={pkmnTypes} evolutionLine={pkmnEvoLine} location={pkmnLocation} />
        </div>
        
      </div>
    </div>
  );
}
