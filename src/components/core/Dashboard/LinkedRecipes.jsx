import React, { useEffect } from 'react'
import { useState } from 'react';
import RecipeCard from './RecipeCard';
import { fetchLikedRecipes } from '../../../services/operations/recipeAPI';
import { useSelector } from 'react-redux';

function LinkedRecipes() {
  const[likedRecipe,setLikedRecipe] = useState([]);
  const[loading,setLoading] = useState(false);
  const {token} = useSelector((state)=>state.auth);

  useEffect(()=>{
    const fetchRecipe = async() => {
      await fetchLikedRecipes(token,setLoading,setLikedRecipe);
    }
    fetchRecipe();
  },[]);

  return (
    <div>
      <div className='flex flex-row w-full'>
        <h1 className='text-3xl font-semibold underline'>Liked Recipes</h1>
      </div>
      {
        loading ? (<div className='w-full h-[400px] flex items-center justify-center'><div className='loader'></div></div>) : 
        likedRecipe?.length === 0 ? (<div className='flex items-center justify-center h-[calc(100vh-200px)]'><div className='text-center text-3xl font-semibold text-black'>No Recipe Liked!</div></div>) :
        (
          likedRecipe && (
          <div className='w-full rounded-lg mt-10 flex flex-row flex-wrap gap-4 mb-10'>
            {
              likedRecipe && likedRecipe.map((recipe,index) => (
                <RecipeCard setLikedRecipe={setLikedRecipe} likedRecipe={likedRecipe} recipe={recipe} key={index} isLikedRecipe={true}  />
              ))
            }
          </div>)
        )
      }
    </div>
  )
}

export default LinkedRecipes;
