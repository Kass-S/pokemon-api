'use client'
import AbilityCard from "@/components/AbilityCard";
import EvolotionCard from "@/components/EvolotionCard";
import ImageCard from "@/components/ImageCard";
import { GetEvolutionLine, GetLocation, GetPokemon } from "@/lib/service";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faHeart, faShuffle } from "@fortawesome/free-solid-svg-icons";


export default function Home() {
  const [pkmnInput, setPkmnInput] = useState<string | number>('pikachu');
  const [pkmnName, setPkmnName] = useState<string>('');
  const [pkmnId, setPkmnId] = useState<number>(25);
  const [pkmnImg, setPkmnImg] = useState<string>('image');
  const [shinyImg, setShinyImg] = useState<string>('image');
  const [pkmnTypes, setPkmnTypes] = useState<string>('types');
  const [pkmnAbilities, setPkmnAbilities] = useState<string>('abilities');
  const [pkmnMoves, setPkmnMoves] = useState<string>('moves');
  const [pkmnEvoLine, setPkmnEvoLine] = useState<string>('evolution line');
  const [pkmnLocation, setPkmnLocation] = useState<string>('location');
  

  const AllPokemon = async () => {
    const pkmnData = await GetPokemon(pkmnInput);
    if(pkmnData != undefined){
      if(pkmnData.id < 650){
        const typeList: string[] = [];
        const abilityList: string[] = [];
        const moveList: string[] = [];
        const evoList: string[] = [];

        const pkmnEvoLine = await GetEvolutionLine(pkmnData.id);
        const pkmnLocation = await GetLocation(pkmnData.id);

        setPkmnName(pkmnData.name);
        setPkmnId(pkmnData.id);
        setPkmnImg(pkmnData.sprites.other["official-artwork"].front_default);
        setShinyImg(pkmnData.sprites.other["official-artwork"].front_shiny);

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

              const evoLineCheck = await GetPokemon(pkmnEvoLine.chain.evolves_to[i].species.name);
              if(evoLineCheck != undefined){
                if(evoLineCheck.id < 650){
                  evoList.push(pkmnEvoLine.chain.evolves_to[i].species.name);
                }

                if(pkmnEvoLine.chain.evolves_to[i].evolves_to.length > 0){
                  for(let j: number = 0; j < pkmnEvoLine.chain.evolves_to[i].evolves_to.length; j++){

                    const evoLineCheck2 = await GetPokemon(pkmnEvoLine.chain.evolves_to[i].evolves_to[j].species.name);
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
            const locationList: string[] = [];
            for(let i: number = 0; i < pkmnLocation.length; i++){
              locationList.push(pkmnLocation[i].location_area.name);
            }
            setPkmnLocation(locationList.join(" | "));
            
          }else{
            setPkmnLocation("N/A");
          }
        }
      }else{
        alert("Invalid. Please enter a pokemon from gens 1-5");
      }
    }  
  }

  const RandomPokemon = async () =>{
    setPkmnInput(Math.floor(Math.random() * 649));
  }

  useEffect(()=>{ 
    AllPokemon();
  },[])

  useEffect(() => {
    AllPokemon();
  }, [pkmnInput])
  return (
    <div className="bg-[url(/assets/bgPkmn.png)] bg-no-repeat bg-cover min-h-screen min-w-screen float-left font-imprima">
      {/* <!-- drawer component --> */}
      {/* <div id="drawer-top-example" className="fixed top-0 left-0 right-0 z-40 w-full p-4 transition-transform -translate-y-full bg-blue-800 border-b-blue-950 border-b-4 drop-shadow-lg text-white" tabIndex={-1} aria-labelledby="drawer-top-label">
        <h5 id="drawer-top-label" className="inline-flex items-center text-3xl text-white mb-5 mx-5">Favorites</h5>
        <button id="exitFavorites" type="button" data-drawer-hide="drawer-top-example" aria-controls="drawer-top-example" className="text-white bg-transparen hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 inline-flex items-center justify-center cursor-pointer" >
          <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
          </svg>
          <span className="sr-only">Close menu</span>
        </button>
        <p id="favoritesList" className="mt-5"></p>
      </div> */}

      <div className="text-white grid grid-cols-1 gap-5 mx-10 sm:mx-20 xl:gap-x-20 lg:mx-30 lg:gap-x-10 lg:grid-cols-3 md:gap-x-0 md:mx-0 md:gap-10 md:grid-cols-4 mb-10">
        <div className="bg-blue-800 border-blue-950 border-4 rounded-xl text-lg text-white my-10 drop-shadow-lg h-13 lg:col-[2] md:col-start-2 md:col-end-4">

          

          <button className="mx-2 cursor-pointer" onClick={AllPokemon}><FontAwesomeIcon icon={faMagnifyingGlass} size="sm" style={{color: "#ffffff",}} /></button>
          

          <input type="text" placeholder=" Search" className="bg-blue-500 rounded-md py-2 xl:pr-25 lg:pr-5 pr-5 md:ml-5 md:pr-24 lg:ml-0" onChange={(e) => setPkmnInput(e.target.value)}  />
          
          <FontAwesomeIcon className="mx-2 cursor-pointer" icon={faShuffle} size="sm" style={{color: "#ffffff",}} onClick={RandomPokemon}/>

          <button type="button" data-drawer-target="drawer-top-example" data-drawer-show="drawer-top-example" data-drawer-placement="top" aria-controls="drawer-top-example" className="cursor-pointer"><FontAwesomeIcon icon={faHeart} size="sm" style={{color: "#ffffff",}} />
          </button> 
        </div>

        <div className="lg:row-[2] lg:col-[1] md:col-start-2 md:col-end-4 row-[4]">
          <AbilityCard abilities={pkmnAbilities} moves={pkmnMoves} />
        </div>

        <div className="lg:row-[2] lg:col-[2] row-[2] md:col-start-2 md:col-end-4">
          <ImageCard name={pkmnName} id={pkmnId} image={pkmnImg} shinyImage={shinyImg} />
        </div>

        <div className="lg:row-[2] lg:col-[3] md:col-start-2 md:col-end-4 row-[3]">
          <EvolotionCard types={pkmnTypes} evolutionLine={pkmnEvoLine} location={pkmnLocation} />
        </div>
        
      </div>
    </div>
  );
}
