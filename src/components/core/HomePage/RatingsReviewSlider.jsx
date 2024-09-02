import React, { useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { Autoplay,FreeMode,Pagination } from "swiper/modules";
import { useState } from 'react';
import { getAllRating } from '../../../services/operations/ratingAndReviewsAPI';
import ReviewItem from '../../common/ReviewItem';

function RatingsReviewSlider() {

    const[reviews,setReviews] = useState([]);

    useEffect(()=>{
        const fetchReviews = async() => {
            const response = await getAllRating();
            if(response){
                setReviews(response);
            }
        }
        fetchReviews();
    },[]);
    

  return (
    <div className='flex flex-col mt-2 mb-2 pl-10 pr-10'>
        <div>
            <h1 className='text-2xl font-semibold'>What Our Users Say's</h1>
        </div>
        {
            reviews?.length === 0 ? (
                <div className='h-[180px] mt-4 rounded-lg flex items-center justify-center mb-4'>
                    <div className='text-xl font-semibold'>Reviews Not Found!</div>
                </div>
            ) : (
                <div className=''>
                    <Swiper
                        className='mt-4 mb-4'
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
                            reviews?.map((review,index) => (
                                <SwiperSlide key={index}>
                                    <ReviewItem review={review} isHomePageReviews={true}/>
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>
                </div>
            )
        }
    </div>
  )
}

export default RatingsReviewSlider;
