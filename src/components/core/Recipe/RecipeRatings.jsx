import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { Autoplay,FreeMode,Pagination } from "swiper/modules";
import ReviewItem from '../../common/ReviewItem';

function RecipeRatings({name,Reviews}) {

    console.log("Reviews From RecipeRatings -> ",Reviews);

  return (
    <div className='mt-4 mb-4'>
      <h1 className='text-lg font-semibold'>Reviews Of <span className=''>{name}</span></h1>
      <Swiper 
        className='mt-4'
        slidesPerView={4}
        spaceBetween={24}
        loop={true}
        freeMode={true}
        autoplay={{
            delay: 2500
        }}
        modules={[FreeMode,Pagination,Autoplay]}
    >
        {
            Reviews?.length === 0 ? (
                <div className='w-full h-[150px] flex items-center justify-center'>
                    <div className='font-semibold text-xl'>Reviews Not Found!</div>
                </div>
            ) : (
                Reviews?.map((review,index)=>(
                    <SwiperSlide key={index}>
                        <ReviewItem review={review} />
                    </SwiperSlide>
                ))
            )
        }
      </Swiper>
    </div>
  )
}

export default RecipeRatings;
