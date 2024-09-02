import React from 'react'
import { useForm } from 'react-hook-form';
import { createRating, getRecipeRatings } from '../../../services/operations/ratingAndReviewsAPI';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import ReactStars from 'react-stars';
import { useState } from 'react';

function RatingRecipe({recipeId,setRatingsData,setReviews}) {

    const[rating,setRating] = useState(0);

    const {
        formState: {errors},
        handleSubmit,
        register,
        reset
    } = useForm();

    const {token} = useSelector((state)=>state.auth);

    const OnSubmit = async(data) => {
        if(!token){
            toast.error("Please Login To Proceed!");
            return;
        }
        const formData = new FormData();
        formData.append("rating",rating);
        formData.append("review",data.Review);
        formData.append("recipeId",recipeId);
        await createRating(formData,token);
        const response = await getRecipeRatings(recipeId);
        if(response){
            setRatingsData(response);
            setReviews(response.allRecipeRatings);
        }
        setRating(0);
        reset();
    }

    const HandleRating = (rating) => {
        setRating(rating);
    }

  return (
    <div className='mt-6'>
        <div>
        <h1 className='text-xl font-semibold'>Rating And Reviews</h1>
        </div>
        <div className='mt-4 flex flex-col gap-y-3'>
        <form onSubmit={handleSubmit(OnSubmit)}>
            <div className='flex items-center gap-x-2'>
                <div>
                    <ReactStars
                        count={5}
                        onChange={HandleRating}
                        edit={true}
                        size={30}
                        color1={'gray'}
                        color2={'#eec4e9'} 
                        half={true}
                    />
                </div>
                <div>
                    {`(${rating})`}
                </div>
            </div>
            <div>
                <textarea 
                    className='w-full border-2 px-5 py-3 mt-4 outline-none h-[100px] border-gray-300 rounded-lg' 
                    {...register("Review",{required:true})}
                    placeholder='Please Add Review'
                />
                {
                    errors.Review && (
                        <span className='text-xs text-black font-medium'>Please add Review!</span>
                    )
                }
            </div>
            <button type='submit' className='w-full py-2 bg-pink-100 rounded-lg mt-2'>Submit Review</button>
        </form>
        </div>
    </div>
  )
}

export default RatingRecipe;
