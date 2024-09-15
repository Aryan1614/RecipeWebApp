import React, { useEffect, useState } from 'react'
import { fetchRecipeTypeDetails } from '../services/operations/recipeTypeAPI';
import { useParams } from 'react-router-dom';
import RecipeCard from '../components/core/Recipe/RecipeCard';

function RecipeType() {

    const[loading,setLoading] = useState(false);
    const[details,setDetails] = useState({});
    const {RecipeName} = useParams();

    useEffect(() => {
        const RecipeTypeDetails =  async() => {
            const response = await fetchRecipeTypeDetails({RecipeName:RecipeName},setLoading);
            if(response){
                setDetails(response);
                console.log(response);
            }
        }
        RecipeTypeDetails();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

  return (
    <div className='overflow-x-hidden bg-[#f0f9fc]'>
        {
            loading ? (
                <div className='w-screen h-[calc(100vh-120px)] flex items-center justify-center'>
                    <div className='loader'></div>
                </div>
            ) : details && (
                <div className='pt-24 px-10 flex flex-col gap-y-4 overflow-x-hidden'>
                    <h1 className='text-4xl font-bold'>{details.RecipeName}</h1>
                    <div className='w-full border-2 rounded-lg py-4 px-4 flex flex-col gap-y-2 mt-2'>
                        <div className='font-semibold'>{details.RecipeName} Category</div>
                        <div>{details.RecipeDesc}</div>
                    </div>
                    <div className='flex flex-col gap-y-3 mt-4 lg:pl-10 lg:pr-10 mb-10'>
                        <div className='text-xl font-semibold'>
                            {details.RecipeName} Recipes
                        </div>
                        <div className='flex flex-row flex-wrap gap-5 w-full justify-evenly mt-4'>
                            {
                                details?.Recipe?.map((recipe,index) => (
                                    <RecipeCard recipe={recipe} key={index} />
                                ))
                            }
                        </div>
                    </div>
                </div>
            )
        }
    </div>
  )
}

export default RecipeType;
