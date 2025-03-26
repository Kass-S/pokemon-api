import { AbilityCompInterface } from '@/interfaces/interfaces'
import React from 'react'

const AbilityCard: React.FC<AbilityCompInterface> = ({abilities, moves}) => {
  return (
    <div className='bg-blue-800 border-blue-950 border-6 rounded-xl drop-shadow-lg min-h-[28.6rem] max-h-[28.6rem]'>
        <p className="flex justify-center text-3xl mt-5">Abilities:</p>
        <p className="flex justify-center text-xl mx-5">{abilities}</p>
    
        <p className="flex justify-center text-3xl mt-5">Moves:</p>
        <p className="overflow-y-scroll mx-5 my-2 h-73">{moves}</p>  
    </div>
  )
}

export default AbilityCard