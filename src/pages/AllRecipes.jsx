import React, { useEffect, useState } from 'react'
import { fetchAllRecipe } from '../services/operations/recipeAPI';
import RecipeCard from '../components/core/Recipe/RecipeCard';

function AllRecipes() {

    const[data,setData] = useState([]);
    const[loading,setLoading] = useState(true);

    useEffect(()=>{
        const fetchAllRecipes = async() => {
            setLoading(true);
            const response = await fetchAllRecipe();
            if(response){
                setData(response);
            }
            // setLoading(false);
        }
        fetchAllRecipes();
    },[]);

  return (
    <div className='flex flex-col pt-24 px-10 bg-[#f0f9fc]'>
      <div>
        <h1 className='underline text-4xl font-semibold pl-20'>All Recipes</h1>
      </div>
      <div className='mt-10 flex flex-row gap-x-3 flex-wrap lg:pl-20 lg:pr-20 mb-10'>
        {
            loading ? (
                <div className='w-screen h-[500px] flex items-center justify-center'>
                    <div className='loader'></div>
                </div>
            ) : 
            (data && data.length === 0) ? (
                <div className='w-full h-[calc(100vh-220px)] flex items-center justify-center'>
                    <div className='text-3xl font-semibold'>No Recipes Found!</div>
                </div>
            ) : (
                <div className='flex flex-row flex-wrap gap-4'>
                    {
                        data.map((recipe,index) => (
                            <RecipeCard key={index} recipe={recipe} />
                        ))
                    }
                </div>
            )
        }
      </div>
    </div>
  )
}

export default AllRecipes
