import React from 'react'
import ReactStar from '../../utils/ReactStar';
import { useNavigate } from 'react-router-dom';

function ReviewItem({review,isHomePageReviews}) {
    const navigate = useNavigate();
  return (
    <div className={`rounded-lg ${isHomePageReviews ? "w-[350px]" : "w-[250px]"} bg-blue-50 h-[150px] py-3 px-4 flex flex-col justify-between`}>
        <div className='flex items-center gap-x-2'>
            <ReactStar 
                size={24}
                value={review.rating}
            />
            <span className='text-sm text-gray-500'>{`(${review.rating})`}</span>
        </div>
        <p className=''>{review?.review?.length > 50 ? (review?.review.substring(0,50)+"...") : (review?.review)}</p>
        <div className='w-full flex flex-row justify-between items-center mt-3'>
            <div className='flex items-center gap-x-2 text-sm'>
                <span>-</span>
                <span>{review?.user?.firstName}{" "}{review?.user?.lastName}</span>
            </div>
            <div className={`${isHomePageReviews ? "flex" : "hidden"} underline pr-2`}>
                <span className='cursor-pointer text-xs' onClick={() => navigate(`/recipe/${review?.recipe?._id}`)}>{review?.recipe?.name}</span>
            </div>
        </div>
    </div>
  )
}

export default ReviewItem;
