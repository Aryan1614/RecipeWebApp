import toast from "react-hot-toast";
import { RecipeTypeEndpoints } from "../apis";
import { apiconnector } from "../apiconnector";

const {
    FETCH_RECIPE_TYPE_DETAILS_API
} = RecipeTypeEndpoints;

export async function fetchRecipeTypeDetails(data,setLoading) {
    let result = {};
    setLoading(true);
    try{
        const response = await apiconnector("POST",FETCH_RECIPE_TYPE_DETAILS_API,data);
        if(!response.data.success){
            throw new Error(response.data.message);
        }

        result = response.data.RecipeTypeDetails;
    } catch(error){
        console.log(error);
        toast.error(error.response.data.message);
    }
    setLoading(false);
    return result;
}