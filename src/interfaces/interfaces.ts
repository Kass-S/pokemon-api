export interface GetPokemonInterface {
    id: number,
    name: string,
    sprites: {
        other: {
            "official-artwork": {
                front_default: string,
                front_shiny: string
            }
        }
    }
    types: Types[],
    abilities: Abilities[];
    moves: Moves[]
}

interface Types {
    type: {
        name: string
    }
}

interface Abilities {
    ability: {
        name: string
    }
}

interface Moves {
    move: {
        name: string
    }
}

export interface GetEvolutionChainInterface {
    chain: {
        species: {
            name: string
        },
        evolves_to : EvolvesTo[]
    },    
}

interface EvolvesTo {
    species: {
        name: string
    }
    evolves_to: EvolvesMore[]
}

interface EvolvesMore {
    species: {
        name: string
    }
}