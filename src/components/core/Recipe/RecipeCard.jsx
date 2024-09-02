import React from 'react'
import { useNavigate } from 'react-router-dom';

function RecipeCard({recipe}) {
  const navigate = useNavigate();
  return (
    <div className='w-[420px] bg-white flex flex-col rounded-lg p-6 gap-y-4'>
      <div className=''>
        <img src={recipe.Image} alt='card' className='rounded-lg object-cover w-full h-[340px]'/>
      </div>
      <div className='flex flex-col gap-y-2'>
        <h1 className='font-semibold'>{recipe?.name.length > 40 ? (recipe?.name.substring(0,40)+"...") : (recipe?.name)}</h1>
        <p>{recipe?.description.length > 70 ? (recipe?.description?.substring(0,70)+"...") : (recipe?.description)}</p>
      </div>
      <div>
        <div className='underline cursor-pointer' onClick={() => navigate(`/recipe/${recipe._id}`)}>View Recipe</div>
      </div>
    </div>
  )
}

export default RecipeCard;