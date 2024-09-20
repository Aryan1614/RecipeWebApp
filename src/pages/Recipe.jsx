import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { fetchRecipeInformation } from '../services/operations/recipeAPI';
import { GiCampCookingPot } from 'react-icons/gi';
import { PiCookingPot } from 'react-icons/pi';
import { FaPlateWheat } from 'react-icons/fa6';
import { DateConverter } from '../utils/TimeStampToDate';
import { useDispatch, useSelector } from 'react-redux';
import { FcLike, FcLikePlaceholder } from 'react-icons/fc';
import { addLike, getRecipeRatings, removeLike } from '../services/operations/ratingAndReviewsAPI';
import toast from 'react-hot-toast';
import RatingRecipe from '../components/core/Recipe/RatingRecipe';
import ReactStar from '../utils/ReactStar';
import RecipeRatings from '../components/core/Recipe/RecipeRatings';

function Recipe() {
  const dispatch = useDispatch();
  const {recipeId} = useParams();
  const[loading,setLoading] = useState(false);
  const[details,setDetails] = useState({});
  const {user} = useSelector((state)=>state.profile);
  const {token} = useSelector((state)=>state.auth);
  const[RatingsData,setRatingsData] = useState({});
  const[Reviews,setReviews] = useState([]);

  useEffect(()=>{
    const fetchRecipeDetails = async() => {
      const response = await fetchRecipeInformation({RecipeId:recipeId},setLoading);
      if(response){
        setDetails(response);
      }
    }
    if(recipeId){
      fetchRecipeDetails();
    }
  },[]);

  useEffect(() => {
    const fetchRatingDetails = async() => {
      const response = await getRecipeRatings(recipeId);
      if(response){
        console.log("RatingData Response=?>",response);
        setRatingsData(response);
        setReviews(response.allRecipeRatings);
      }
    };
    if(recipeId){
      fetchRatingDetails();
    }
  },[recipeId]);

  const HandleLike = async() => {
    if(!token){
      toast.error("Please Login To Like Recipe!");
      return;
    }
    await addLike(recipeId,token,dispatch);
  }

  const HandleUnlike = async() => {
    if(!token){
      toast.error("Please Login To UnLIke Recipe!");
      return;
    }
    await removeLike(recipeId,token,dispatch);
  }

  return (
    <div className='flex flex-col py-24 px-10 overflow-x-hidden'>
      <div>
        <h1 className='pl-20 underline text-3xl font-semibold'>Recipe Details</h1>
      </div>
      <div className='overflow-x-hidden'>
        {
          loading ? (
            <div className='w-full flex items-center justify-center h-[calc(100vh-240px)]'>
              <div className='loader'></div>
            </div>
          ) : 
          !details ? (
            <div className='w-full flex items-center justify-center h-[calc(100vh-240px)]'>
              <div className=''>Details Not Found!</div>
            </div>
          ) : (
            <div className='border-2 px-20 rounded-md flex flex-col justify-between py-10 mt-8 mx-auto w-11/12 max-w-[1200px]' >  
              <div className='flex flex-row justify-between flex-wrap'>
                <div className='lg:w-[38%]'>
                <img src={details.Image} alt='logo' className=' object-fill aspect-auto rounded-lg w-11/12 h-11/12 max-h-[300px] max-w-[320px] text-end mx-auto'/>
              </div>
              <div className='flex flex-col gap-y-5 lg:w-[58%]'> 
                <div>
                  <h1 className='text-4xl font-semibold'>{details.name}</h1>
                </div>
                <div className='flex items-center gap-x-3'>
                  <ReactStar 
                    value={RatingsData.avgRating || 0}
                  />
                  <div className='text-xl'>{`(${RatingsData.avgRating || 0})`}</div>
                </div>
                <div>
                  <button 
                  onClick={() => {user && user?.LikedRecipe?.includes(recipeId) ? (HandleUnlike()) : (HandleLike())}} className='w-fit rounded-xl py-2 px-3  border-2'
                  >
                    { user && user?.LikedRecipe?.includes(recipeId) ? 
                    (
                      <div className='flex items-center gap-2'>
                        <FcLike />
                        <div>UnLike</div>
                      </div>
                    ) 
                    : (
                      <div className='flex items-center gap-2'>
                        <FcLikePlaceholder />
                        <div>Like</div>
                      </div>
                    )}                  
                  </button>
                </div>
                <div>
                  <p>{details.description}</p>
                </div>
                <div className='flex flex-col gap-2'>
                  <div className='flex items-center gap-x-2'><GiCampCookingPot /> Preparation Time: {details.PreparationTime} min</div>
                  <div className='flex items-center gap-x-2'><PiCookingPot/>Cooking Time: {details.CookingTime} min</div>
                  <div className='flex items-center gap-x-2'><FaPlateWheat /> Servings: {details.servings}</div> 
                </div>
                <div>
                  <p className='text-2xl font-semibold mt-2'>Ingredients</p>
                  <ul className='pl-2 mt-2'>
                    {
                      details.Ingredients && Array.isArray(details.Ingredients) ? (
                        details.Ingredients.map((Ingredient, index) => (
                          <li key={index}>{Ingredient}</li>
                        ))
                      ) : (
                        <li>No Ingredients Available</li>
                      )
                    }
                  </ul>
                </div>
                <div>
                  <p className='text-2xl font-semibold mt-2'>Procedure</p>
                  <ul className='pl-2 mt-2 flex flex-col gap-y-2'>
                    {
                      details.Procedure && Array.isArray(details.Procedure) ? (
                        details.Procedure.map((val, index) => (
                          <li key={index}>{val}</li>
                        ))
                      ) : (
                        <li>No Procedure Available</li>
                      )
                    }
                  </ul>
                </div>
                <div className='mt-10'>
                    <div className='text-md font-semibold'>CreatedAt: {DateConverter(details.CreatedAt)}</div>
                    <div className='text-md font-semibold'>UpdatedAt: {DateConverter(details.UpdatedAt)}</div>
                </div>
              </div>
              </div>
              <RecipeRatings name={details.name} Reviews={Reviews} rating={RatingsData.avgRating} />
              <RatingRecipe RatingsData={RatingsData} setRatingsData={setRatingsData} setReviews={setReviews}  recipeId={recipeId} />
            </div>
          )
        }
      </div>
    </div>
  )
}

export default Recipe;
