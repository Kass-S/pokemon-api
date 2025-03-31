'use client'
import AbilityCard from "@/components/AbilityCard";
import EvolotionCard from "@/components/EvolotionCard";
import ImageCard from "@/components/ImageCard";
import { GetEvolutionLine, GetLocation, GetPokemon } from "@/lib/service";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faHeart, faShuffle } from "@fortawesome/free-solid-svg-icons";
import { Drawer, DrawerHeader, DrawerItems } from "flowbite-react";
//import { getFromFavorites, removeFromFavorites } from "@/lib/localStorage";
//import { faX } from "@fortawesome/free-solid-svg-icons";


export default function Home() {
  const [pkmnInput, setPkmnInput] = useState<string | number>('pikachu');
  const [random, setRandom] = useState<number>(0);
  const [pkmnName, setPkmnName] = useState<string>('');
  const [pkmnId, setPkmnId] = useState<number>(25);
  const [pkmnImg, setPkmnImg] = useState<string>('image');
  const [shinyImg, setShinyImg] = useState<string>('image');
  const [pkmnTypes, setPkmnTypes] = useState<string>('types');
  const [pkmnAbilities, setPkmnAbilities] = useState<string>('abilities');
  const [pkmnMoves, setPkmnMoves] = useState<string>('moves');
  const [pkmnEvoLine, setPkmnEvoLine] = useState<string>('evolution line');
  const [pkmnLocation, setPkmnLocation] = useState<string>('location');

  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => setIsOpen(false);
  

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

        setPkmnName(pkmnData.species.name);
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
              if(pkmnEvoLine.chain.evolves_to[i].species.name == 'basculegion'){
                setPkmnEvoLine("N/A");
              }else{
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
        alert("Invalid. Please enter a pokemon from gens 1-5, or use pokedex number");
      }
    }  
  }

  const RandomPokemon = async () =>{
    setPkmnInput(Math.floor(Math.random() * 649));
    setRandom(Math.floor(Math.random() * 649));
  }

  useEffect(()=>{ 
    AllPokemon();
  })

  useEffect(() => {
    AllPokemon();
  }, [random])
  return (
    <div className="bg-[url(/assets/bgPkmn.png)] bg-no-repeat bg-cover min-h-screen min-w-screen float-left font-imprima">
      
      <div className="text-white grid grid-cols-1 gap-5 mx-10 sm:mx-20 xl:gap-x-20 lg:mx-30 lg:gap-x-10 lg:grid-cols-3 md:gap-x-0 md:mx-0 md:gap-10 md:grid-cols-4 mb-10">

        <Drawer className="bg-blue-800 border-blue-950 border-4 drop-shadow-lg" open={isOpen} onClose={handleClose} position="top">
        <DrawerHeader  />
          <DrawerItems>
          <h5 className="inline-flex items-center text-3xl text-white mb-5 mx-5">Favorites</h5>
            <div className="mb-6 ">
              {/* {
                getFromFavorites().map((pokemon:string, key: number) => {
                  return(
                    <div className="mx-2" key={key}>
                      <p className="text-lg text-white" >{pokemon}</p>
                      <button onClick={() => removeFromFavorites(pokemon)} ><FontAwesomeIcon icon={faX} size="sm" style={{color: "#ffffff",}} /></button>
                    </div>
                )})
              } */}
            </div>
          </DrawerItems>
        </Drawer>

        <div className="bg-blue-800 border-blue-950 border-4 rounded-xl text-lg text-white my-10 drop-shadow-lg h-13 lg:col-[2] md:col-start-2 md:col-end-4">

          <button className="mx-2 cursor-pointer" onClick={AllPokemon}><FontAwesomeIcon icon={faMagnifyingGlass} size="sm" style={{color: "#ffffff",}} /></button>
          

          <input type="text" placeholder=" Search" className="bg-blue-500 rounded-md py-2 xl:pr-25 lg:pr-5 pr-5 md:ml-5 md:pr-24 lg:ml-0" onChange={(e) => setPkmnInput(e.target.value)}  />
          
          <FontAwesomeIcon className="mx-2 cursor-pointer" icon={faShuffle} size="sm" style={{color: "#ffffff",}} onClick={RandomPokemon}/>

          <button className="max-w-2 cursor-pointer" onClick={() => setIsOpen(true)}><FontAwesomeIcon icon={faHeart} size="sm" style={{color: "#ffffff",}} /></button>
          
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
