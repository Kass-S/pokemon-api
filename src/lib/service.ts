import { GetPokemonInterface } from "@/interfaces/interfaces";

const GetPokemon = async (userSearch: string) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${userSearch}`);
    if(!response.ok){
        alert("Invalid. Please enter a pokemon from gens 1-5");
    }else{
        const data: GetPokemonInterface = await response.json();
        console.log(data);
        return data;
    }
    
}

export {GetPokemon}