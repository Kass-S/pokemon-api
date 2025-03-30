import {ImgCompInterface } from '@/interfaces/interfaces'
import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSprayCanSparkles } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { saveToFavorites } from '@/lib/localStorage';

const ImageCard: React.FC<ImgCompInterface> = ({name, id, image, shinyImage}) => {
  const [shinyBool, setShinyBool] = useState<boolean>(false);

  const handleSwitch = () => {
    setShinyBool(!shinyBool);
  }

  const Favorite = () => {
    saveToFavorites(name);
  }
  
  return (
    <div className='bg-blue-800 border-blue-950 border-6 rounded-xl drop-shadow-lg min-h-[28.6rem] max-h-[28.6rem] font-imprima'>
        <div className="max-w-80 flex justify-self-center">
          {
            shinyBool ? <img src={shinyImage} alt="pokemon image" className="h-60 bg-blue-800 drop-shadow-lg rounded-lg w-100% m-5" /> : <img src={image} alt="pokemon image" className="h-60 bg-blue-800 drop-shadow-lg rounded-lg w-100% m-5" />
          }  
        </div>
                    
        <p className="flex justify-center text-3xl mt-10 mx-5">{name} - {id}</p>

        <div className="flex justify-between lg:mb-0  mb-10">
          <FontAwesomeIcon className="mx-8 cursor-pointer mt-10" icon={faSprayCanSparkles} size="2xl" style={{color: "#ffffff",}} onClick={handleSwitch} />

          <FontAwesomeIcon className="mx-8 cursor-pointer mt-10" icon={faHeart} size="2xl" style={{color: "#ffffff",}} onClick={Favorite} />
        </div>
    </div>
  )
}

export default ImageCard