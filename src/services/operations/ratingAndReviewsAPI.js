import toast from "react-hot-toast";
import { setUser } from "../../slices/profileSlice";
import { apiconnector } from "../apiconnector";
import { RatingAndReviewsEndpoints } from "../apis";

const {
  LIKE_RECIPE_API,
  UNLIKE_RECIPE_API,
  CREATE_RATING_API,
  GET_RECIPE_RATINGS_API,
  GET_ALL_RATING
} = RatingAndReviewsEndpoints;

export const addLike = async(recipeId,token,dispatch) => {
    const toastId = toast.loading("Loading...");
    try{
      const response = await apiconnector("POST",LIKE_RECIPE_API,{recipeId: recipeId},{
        Authorization: `Bearer ${token}`
      });

      if(!response.data.success){
        throw new Error(response.data.message);
      }

      dispatch(setUser(response.data.updatedUser));
      localStorage.setItem("user",JSON.stringify(response.data.updatedUser));
      toast.success("Recipe Liked!")
    } catch(error){
      console.log(error);
      toast.error(error.response.data.message);
    }
    toast.dismiss(toastId);
}

export const removeLike = async(recipeId,token,dispatch) => {
    const toastId = toast.loading("Loading...");
    try{
      const response = await apiconnector("POST",UNLIKE_RECIPE_API,{recipeId: recipeId},{
        Authorization: `Bearer ${token}`
      });

      if(!response.data.success){
        throw new Error(response.data.message);
      }

      dispatch(setUser(response.data.updatedUser));
      localStorage.setItem("user",JSON.stringify(response.data.updatedUser));
      toast.success("Recipe Unliked!");
    } catch(error){
      console.log(error);
      toast.error(error.response.data.message);
    }
    toast.dismiss(toastId);
}

export const createRating = async(data,token) => {
  const toastId = toast.loading("Loading...");
  try{
    const response = await apiconnector("POST",CREATE_RATING_API,data,{
      Authorization: `Bearer ${token}`
    });

    if(!response.data.success){
      throw new Error(response.data.message);
    }

    toast.success("Rating Created!");
  } catch(error){
    console.log(error);
    toast.error(error.response.data.message);
  }
  toast.dismiss(toastId);
}

export const getAllRating = async() => {
  let result = [];
  try{
    const response = await apiconnector("GET",GET_ALL_RATING,null);

    if(!response.data.message){
      throw new Error(response.data.message);
    }
    
    result = response.data.allRatings;
  } catch(error){
    console.log(error);
    toast.error(error.response.data.message);
  }
  return result;
}

export const getRecipeRatings =  async(recipeId) => {
  let result = {};
  try{
    const response = await apiconnector("POST",GET_RECIPE_RATINGS_API,{recipeId:recipeId});

    if(!response.data.success){
      throw new Error(response.data.message);
    }

    result = response.data.data;
  } catch(error){
    console.log(error);
    toast.error(error.response.data.message);
  }
  return result;
}