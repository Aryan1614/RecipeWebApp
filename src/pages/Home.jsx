import React from 'react'
import Footer from '../components/common/Footer'
import { Link } from 'react-router-dom'
import { LuChefHat } from 'react-icons/lu'
import { FaTags } from 'react-icons/fa'
import { FiShare } from 'react-icons/fi'
import PopularCategories from '../components/core/HomePage/PopularCategories'
import FeaturesRecipes from '../components/core/HomePage/FeaturesRecipes'
import { useSelector } from 'react-redux'
import RatingsReviewSlider from '../components/core/HomePage/RatingsReviewSlider'

function Home() {
  const {token} = useSelector((state)=>state.auth);
  return (
    <div className='pt-[80px] bg-[#f0f9fc] h-[100vh] flex flex-col overflow-x-hidden'>
      <div className='flex flex-col mx-auto max-w-[1080px] w-11/12'> 
        <div className='flex flex-col gap-y-2 py-20 mt-10 mb-10'>
          <h1 className='mx-auto text-4xl font-bold'>Discover Delicious Recipes</h1>
          <p className='mx-auto max-w-[600px] text-center mt-4 text-lg'>Our recipe sharing platform connects home cooks and food enthusiasts from around the world. Explore a vast collection of recipes, share your own, and connect with a vibrant community.</p>
          <div className='mx-auto mt-2'>
            <Link to={"/login"}><button className='bg-black text-white py-2 px-2 rounded-lg'>Get Started</button></Link>
          </div>
        </div>
      </div>
      <PopularCategories />
      <FeaturesRecipes />
      <RatingsReviewSlider />
      <div className='bg-[#e6f2ff] w-full flex items-center'>
        <div className='w-11/12 max-w-[1080px] mx-auto flex justify-between gap-y-10 flex-wrap py-20 '>
          <div className='flex flex-col gap-y-2 max-w-[320px] text-center'>
            <div className='mx-auto text-3xl font-bold' ><LuChefHat /></div>
            <h1 className='text-xl font-bold'>Featured Chefs</h1>
            <p>Discover the culinary masterminds behind our most popular recipes.</p>
            <button className='hover:underline outline-none border-none w-fit mx-auto' >View All Chefs</button>
          </div>
          <div className='flex flex-col gap-y-2 max-w-[320px] text-center'>
            <div className='mx-auto text-3xl '><FaTags /></div>
            <h1 className='text-xl font-bold'>Featured Chefs</h1>
            <p>Explore a wide variety of cuisines and dietary preferences.</p>
            <button className='hover:underline  outline-none border-none w-fit mx-auto'>Browse Categories</button>
          </div>
          <div className='flex flex-col gap-y-2 max-w-[320px] text-center'>
            <div className='mx-auto text-3xl font-bold'><FiShare /></div>
            <h1 className='text-xl font-bold'>Featured Chefs</h1>
            <p>Join our community and share your own delicious recipes.</p>
            <Link className='bg-pink-200 py-2 px-4 rounded-lg w-fit mx-auto mt-2 cursor-pointer  outline-none border-none' to={token ? ("/dashboard/addRecipe") : ("/signup")}>{token ? "Add Recipes" : "Sign Up Now"}</Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Home
