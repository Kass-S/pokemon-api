import { EvolutionCardInterface } from '@/interfaces/interfaces'
import React from 'react'

const EvolotionCard: React.FC<EvolutionCardInterface> = ({types, evolutionLine, location}) => {
  return (
    <div className='bg-blue-800 border-blue-950 border-6 rounded-xl drop-shadow-lg min-h-[28.6rem] max-h-[28.6rem] font-imprima'>
        <p className="flex justify-center text-3xl mt-5">Type:</p>
        <p className="flex justify-center text-xl mx-5">{types}</p>
    
        <p className="flex justify-center text-3xl mt-10">Evolution Line:</p>
        <p className="flex justify-center text-xl my-5 mx-5">{evolutionLine}</p>
    
        <p className="flex justify-center text-3xl mt-8">Location:</p>
        <p className="flex justify-center text-xl mx-5 overflow-y-scroll h-33">{location}</p>
    </div>
  )
}

export default EvolotionCard