import React from 'react'
import { FaBowlFood } from 'react-icons/fa6';
import { GiFoodTruck } from 'react-icons/gi';
import { IoFastFoodSharp } from 'react-icons/io5';
import { MdFastfood } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

function PopularCategories() {
    const navigate = useNavigate();
  return (
    <div className='w-full bg-[#f1f9ff] py-8'>
      <div className='pl-10'>
        <h1 className='text-4xl font-bold text-left'>Popular Categories</h1>
      </div>
      <div className='w-full flex flex-row flex-wrap gap-y-4 justify-between px-10 py-5'>
        <div onClick={() => navigate("/recipeType/Vegen")} className='rounded-lg flex flex-col cursor-pointer gap-y-3 bg-white hover:underline hover:bg-blue-200 w-[350px] py-8 px-5 text-xl font-semibold'>
            <div className='text-2xl'><FaBowlFood/></div>
            <p className=''>Vegen</p>
        </div>
        <div onClick={() => navigate("/recipeType/Veg")} className='rounded-lg flex flex-col cursor-pointer gap-y-3 bg-white hover:underline hover:bg-blue-200 w-[350px] text-xl py-8 px-5 font-semibold'>
            <div className='text-2xl'><MdFastfood/></div>
            <p className=''>Vegetarian</p>
        </div>
        <div onClick={() => navigate("/recipeType/Non-veg")} className='rounded-lg flex flex-col cursor-pointer gap-y-3 bg-white hover:underline hover:bg-blue-200 w-[350px] text-xl py-8 px-5 font-semibold'>
            <div className='text-2xl'><GiFoodTruck/></div>
            <p className=''>Non-Vegetarian</p>
        </div>
        <div onClick={() => navigate("/recipeType/Pescatarian")} className='rounded-lg flex flex-col cursor-pointer gap-y-3 bg-white hover:underline hover:bg-blue-200 w-[350px] text-xl py-8 px-5 font-semibold'>
            <div className='text-2xl'><IoFastFoodSharp/></div>
            <p className=''>Pescatarian</p>
        </div>
      </div>
    </div>
  )
}

export default PopularCategories;
