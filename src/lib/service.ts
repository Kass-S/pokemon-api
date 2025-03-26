import { GetEvolutionChainInterface, GetPokemonInterface } from "@/interfaces/interfaces";

const GetPokemon = async (userSearch: string) => {
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
    const data = await response.json();
    console.log(data);
    let evoChainUrl = data.evolution_chain.url;

    let evoChain = await GetEvolutionChain(evoChainUrl);
    console.log(evoChain.chain.species.name);
    return evoChain;
}


export {GetPokemon, GetEvolutionLine}