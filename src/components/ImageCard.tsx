import React from 'react'

const ImageCard = () => {
  return (
    <div className='bg-blue-800 border-blue-950 border-6 rounded-xl drop-shadow-lg min-h-[28.6rem] max-h-[28.6rem]'>
        <div className="max-w-80 flex justify-center">
            {/* <img src="" alt="pokemon image" className="h-60 bg-blue-800 drop-shadow-lg rounded-lg w-100% m-5" /> */}
        </div>
                    
        <p className="flex justify-center text-3xl mt-10 mx-5">Name - Number</p>

        <div className="flex justify-between lg:mb-0  mb-10">
            <i className="fa-solid fa-spray-can-sparkles fa-2xl mx-8 cursor-pointer mt-20" ></i>
            {/* style="color: #ffffff;" */}
    
            <i className="fa-regular fa-heart fa-2xl mx-8 cursor-pointer mt-20"></i>
        </div>
    </div>
  )
}

export default ImageCard