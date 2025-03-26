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
    types: {type: {
        name: string
    }}[],
    abilities: {ability: {
        name: string
    }}[],
    moves: {move: {
        name: string
    }}[]
}

export interface GetEvolutionChainInterface {
    chain: {
        species: {
            name: string
        },
        evolves_to : {species: {
            name: string
        },
        evolves_to: {species: {
            name: string
        }}[]
        }[]
    },    
}

export interface GetEvolutionLineInterface {
    evolution_chain: {
        url: string
    }
}

export interface GetLocationInterface {
    location_area: {
        name: string[]
    }
}

export interface ImgCompInterface {
    name: string,
    id: number,
    image: string,   
}

export interface AbilityCompInterface {   
    abilities: string,
    moves: string,
}

export interface EvolutionCardInterface {
    types: string,
    evolutionLine: string,
    location: string
}