import { GetEvolutionChainInterface, GetEvolutionLineInterface, GetLocationInterface, GetPokemonInterface } from "@/interfaces/interfaces";

const GetPokemon = async (userSearch: string | number) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${userSearch}`);
    if(!response.ok){
        alert("Invalid. Please enter a pokemon from gens 1-5");
    }else{
        const data: GetPokemonInterface = await response.json();
        return data;   
    }
    
}

const GetEvolutionChain = async (url: string) =>{
    const response = await fetch(url);
    const data: GetEvolutionChainInterface = await response.json();
    return data;
}
const GetEvolutionLine = async (pkmnId: number) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pkmnId}`);
    const data: GetEvolutionLineInterface = await response.json();
    let evoChainUrl = data.evolution_chain.url;

    let evoChain = await GetEvolutionChain(evoChainUrl);
    console.log(evoChain.chain.species.name);
    return evoChain;
}


const GetLocation = async (pkmnId: number) => {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pkmnId}/encounters`)
        const data: GetLocationInterface[] = await response.json();
        let location = data[0].location_area.name;
        return location;
    } catch (error) {
        console.error("N/A")
        return "N/A";
    }
    
}

export {GetPokemon, GetEvolutionLine, GetLocation }