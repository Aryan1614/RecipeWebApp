import React from 'react'
import { AiOutlineClockCircle,AiOutlineDelete } from 'react-icons/ai'
import { MdEditDocument } from 'react-icons/md'
import { BiDish } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'
import { FcLike } from 'react-icons/fc'
import { removeLike } from '../../../services/operations/ratingAndReviewsAPI'
import { useDispatch, useSelector } from 'react-redux'

function RecipeCard({recipe,HandleDelete,isLikedRecipe,setModalData}) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {token} = useSelector((state)=>state.auth);

    const handleUnlikeRecipe = async(recipeId) => {
        await removeLike(recipeId,token,dispatch)
        navigate("/dashboard/Liked");
    }

  return (
    <div className='cursor-pointer max-w-[255px] border-2 rounded-xl p-3 flex flex-col gap-y-3' onClick={() => navigate(`/Recipe/${recipe._id}`)}>
        <div className='h-[200px] w-full flex justify-between items-center'>
            <img src={recipe?.Image} alt='recipeLogo' className='object-cover w-full h-[180px] rounded-md' />
        </div>
        <div className='flex flex-col gap-y-2'>
            <div className='flex items-center justify-between'>
                <h1 className='font-semibold'>{recipe?.name?.length > 25 ? (recipe?.name?.substring(0,25)+"...") : (recipe?.name)}</h1>
            </div>
            <p>{recipe?.description.substring(0,40)+"..."}</p>
        </div>
        <div className='flex w-full items-center justify-between'>
            <span className='flex items-center gap-x-1 flex-row'><AiOutlineClockCircle/> {recipe?.CookingTime} min</span>
            <span className='flex items-center gap-x-1 flex-row'><BiDish/><p>4 servings</p></span>
        </div>
        <div className={`${isLikedRecipe ? "hidden" : "flex"} items-center gap-x-3 border-t-2 border-gray-200 pt-3`}>
            <div onClick={(e) => e.stopPropagation()} className='flex items-center gap-x-2'>
                <button onClick={() => navigate(`/dashboard/editRecipe/${recipe._id}`)}><MdEditDocument /></button>
                <button onClick={() => setModalData({
                    heading1: "Are You Sure?",
                    heading2: "Your Recipe Will Be Deleted!",
                    btn1text: "Delete",
                    btn2text: "Cancel",
                    btn1handler: () => HandleDelete({RecipeId:recipe._id},setModalData),
                    btn2handler: () => setModalData(null)
                })} ><AiOutlineDelete /></button>
            </div>
        </div>
        <div className={`${isLikedRecipe ? "flex" : "hidden"}`} onClick={() => handleUnlikeRecipe(recipe._id)}>
            <div className='rounded-full w-fit bg-blue-200 p-1'>
                <FcLike />
            </div>
        </div>
    </div>
  )
}

export default RecipeCard
