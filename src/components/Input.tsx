import { usePkmncontext } from '@/Context/DataContext';
import React from 'react'

const Input = () => {
  const {name, setName} = usePkmncontext();
  return (
    <div className="bg-blue-800 border-blue-950 border-4 rounded-xl text-lg text-white my-10 drop-shadow-lg h-13 lg:col-[2] md:col-start-2 md:col-end-4">

          <button className="mx-2 cursor-pointer"><i className="fa-solid fa-magnifying-glass fa-sm " ></i></button>
                   
          {/* style="color: #ffffff;"> */}

          <input type="text" placeholder=" Search" className="bg-blue-500 rounded-md py-2 xl:pr-25 lg:pr-5 pr-5"  />
          {/* onChange={(e) => setPkmnName(e.target.value)} */}

          <i className="fa-solid fa-shuffle fa-sm sm:ml-2 cursor-pointer"> </i>

          <button type="button" data-drawer-target="drawer-top-example" data-drawer-show="drawer-top-example" data-drawer-placement="top" aria-controls="drawer-top-example"><i className="fa-solid fa-heart fa-sm cursor-pointer"></i>
          </button> 
        </div>
  )
}

export default Input