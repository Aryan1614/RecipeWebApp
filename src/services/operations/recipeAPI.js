import toast from "react-hot-toast";
import { apiconnector } from "../apiconnector";
import { RecipeEndpoints } from "../apis";
import { resetRecipeState, setIsRecipeCreated } from "../../slices/RecipeSlice";
import { setUser } from "../../slices/profileSlice";

const {
    CREATE_RECIPE_API,
    UPDATE_RECIPE_API,
    DELETE_RECIPE_API,
    FETCH_ALL_RECIPE_API,
    FETCH_RECIPE_DETAILS_API,
    FETCH_ALL_RECIPE_EXISTED_API,
    FETCH_LIKED_RECIPE_USER_API
} = RecipeEndpoints;

export function createRecipe(formData,token,reset,navigate) {
    return async(dispatch) => {
        const toastId = toast.loading("Loading...");
        try{
            console.log("In Backend Function OF Frontend");
            console.log(formData);
            console.log(token);
            const response = await apiconnector("POST",CREATE_RECIPE_API,formData,{
                Authorization: `Bearer ${token}`
            });

            if(!response.data.success){
                throw new Error(response.data.message);
            }

            toast.success("Recipe Created Successfully!");
            dispatch(setIsRecipeCreated(true));
            reset();
            navigate("/dashboard/userRecipe");
        } catch(error){
            console.log(error);
            toast.error(error.response.data.message);
        }
        toast.dismiss(toastId);
    }
}

export const fetchAllRecipes = async(token,setLoading) => {
    let result = {};
    setLoading(true);
    try{    
        const response = await apiconnector("GET",FETCH_ALL_RECIPE_API,null,{
            Authorization: `Bearer ${token}`
        });

        console.log(response);

        if(!response.data.success){
            throw new Error(response.data.message);
        }

        result = response.data.AllRecipes;
    } catch(error){
        console.log(error);
        toast.error(error.response.data.message);
    }
    setLoading(false);
    return result;
}

export const deleteRecipe = async(data,token,dispatch) => {
    let result = {};
    const toastId = toast.loading("Loading...");
    try{
        const response = await apiconnector("DELETE",DELETE_RECIPE_API,data,{
            Authorization: `Bearer ${token}`
        });

        if(!response.data.success){
            throw new Error(response.data.message);
        }

        result = response.data.updatedUser.Recipe;
        dispatch(setUser(response.data.updatedUser));
        toast.success("Recipe Deleted!");
    } catch(error){
        console.log(error);
        toast.error(error.response.data.message);
    }
    toast.dismiss(toastId);
    return result;
}

export const fetchAllRecipe = async() => {
    let result = [];
    try{
        const response = await apiconnector("GET",FETCH_ALL_RECIPE_EXISTED_API,null);
        if(!response.data.success){
            throw new Error(response.data.message);
        }

        result = response.data.allRecipes;
    } catch(error){
        console.log(error);
        toast.error(error.response.data.message);
    }
    return result;
}

export const fetchRecipeInformation = async(data,setLoading) => {
    let result = {};
    setLoading(true);
    try{
        const response = await apiconnector("POST",FETCH_RECIPE_DETAILS_API,data);
        
        console.log(response);
        if(!response.data.success){
            throw new Error(response.data.message);
        }

        result = response.data.details;
    } catch(error){
        console.log(error);
        toast.error(error.response.data.message);
    }
    setLoading(false);
    return result;
}

export const fetchLikedRecipes = async(token,setLoading,setLikedRecipe) => {
    setLoading(true);
    try{
        const response = await apiconnector("GET",FETCH_LIKED_RECIPE_USER_API,null,{
            Authorization: `Bearer ${token}`
        });
        console.log(response);
        if(!response.data.success){
            throw new Error(response.data.message);
        }

        setLikedRecipe(response?.data?.user?.LikedRecipe);
    } catch(error){
        console.log(error);
        toast.error(error.response.data.message);
    }
    setLoading(false);
}

export const updateRecipe = async(data,token,navigate,dispatch,setLoading) => {
    const toastId = toast.loading("Loading...");
    setLoading(true);
    try{
        const response = await apiconnector("POST",UPDATE_RECIPE_API,data,{
            Authorization: `Bearer ${token}`
        });

        if(!response.data.success){
            throw new Error(response.data.message);
        }

        toast.success("Recipe Updated!");
        dispatch(resetRecipeState());
        navigate("/dashboard/userRecipe");
    } catch(error){
        console.log(error);
        toast.error(error.response.data.message);
    }
    toast.dismiss(toastId);
    setLoading(false);
}