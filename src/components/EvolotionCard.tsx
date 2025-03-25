import React from 'react'

const EvolotionCard = () => {
  return (
    <div className='bg-blue-800 border-blue-950 border-6 rounded-xl drop-shadow-lg min-h-[28.6rem] max-h-[28.6rem]'>
        <p className="flex justify-center text-3xl mt-5">Type:</p>
        <p className="flex justify-center text-xl mx-5"></p>
    
        <p className="flex justify-center text-3xl mt-10">Evolution Line:</p>
        <p className="flex justify-center text-xl my-5 mx-5"></p>
    
        <p className="flex justify-center text-3xl mt-10">Location:</p>
        <p className="flex justify-center text-xl m-5"></p>
    </div>
  )
}

export default EvolotionCard