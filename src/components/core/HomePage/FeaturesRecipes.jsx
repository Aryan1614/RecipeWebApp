import React, { useEffect, useState } from 'react'
import { fetchAllRecipe } from '../../../services/operations/recipeAPI';
import { CgProfile } from 'react-icons/cg';
import { IoPersonOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

function FeaturesRecipes() {

    const[allRecipe,setAllRecipe] = useState([]);
    const navigate = useNavigate();

    useEffect(()=>{
        const getAllRecipes = async() => {
            const response = await fetchAllRecipe();
            if(response){
                const ans = shuffleData(response);
                setAllRecipe(ans);
            }
        }
        if(allRecipe){
            getAllRecipes();
        }
    },[]);

    const shuffleData = (array) => {
        let count = 4;
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array.slice(0,count);
    }

  return (
    <div className='w-full py-10'>
      <div className='text-3xl font-semibold pl-10'>
        <h1>Featured Recipes</h1>
      </div>
      <div className='px-10 flex flex-row items-center gap-y-4 justify-between mt-10 pb-6 flex-wrap'>
        {
            allRecipe && allRecipe.length > 0 && allRecipe.map((Recipe,index) => (
                <div onClick={() => navigate(`/recipe/${Recipe._id}`)} key={index} className='bg-white rounded-lg cursor-pointer p-4 w-[350px] gap-y-3 border-2'>
                    <div className='h-[250px]'>
                        <img src={Recipe.Image} alt='ImageFood' className='w-full rounded-lg h-[250px]' />
                    </div>
                    <div className='flex flex-col gap-y-4 mt-2'>
                        <h1 className='text-lg font-semibold'>{Recipe.name.length > 30 ? (Recipe.name.substring(0,30)+"...") : (Recipe.name)}</h1>
                        <p>{Recipe.description.length > 80 ? (Recipe.description.substring(0,80)+"...") : (Recipe.description)}</p>
                    </div>
                    <div className='mt-4 flex flex-row items-center gap-x-3'>
                        <div className='rounded-full p-1 bg-blue-200'><IoPersonOutline/></div>
                        <div>{Recipe.Owner.firstName}{" "}{Recipe.Owner.lastName}</div>
                    </div>
                </div>
            ))
        }
      </div>
    </div>
  )
}

export default FeaturesRecipes;
