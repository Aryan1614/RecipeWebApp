const BASE_URL = process.env.REACT_APP_BASE_URL;

export const endpoints = {
    LOGIN_API: BASE_URL + "/auth/login",
    SIGNUP_API: BASE_URL + "/auth/signup",
    SEND_OTP_API: BASE_URL + "/auth/sendotp",
    CHANGE_PASSWORD_API: BASE_URL + "/auth/changepassword"
}

export const profileEndpoints = {
    UPDATE_PROFILE_API: BASE_URL + "/profile/updateDetails",
    DELETE_ACCOUNT_API: BASE_URL + "/profile/deleteAccount"
}

export const RecipeTypeEndpoints = {
    FETCH_RECIPE_TYPE_API: BASE_URL + "/RecipeType/allRecipeTypes",
    FETCH_RECIPE_TYPE_DETAILS_API: BASE_URL + "/RecipeType/RecipeTypeDetails"
}

export const RecipeEndpoints = {
    CREATE_RECIPE_API: BASE_URL + "/Recipe/createRecipe",
    UPDATE_RECIPE_API: BASE_URL + "/Recipe/updateRecipe",
    DELETE_RECIPE_API: BASE_URL + "/Recipe/deleteRecipe",
    FETCH_ALL_RECIPE_API: BASE_URL + "/Recipe/getAllRecipes",
    FETCH_RECIPE_DETAILS_API: BASE_URL + "/Recipe/getRecipeDetails",
    FETCH_ALL_RECIPE_EXISTED_API: BASE_URL + "/Recipe/allRecipes",
    FETCH_LIKED_RECIPE_USER_API: BASE_URL + "/Recipe/likedRecipe"
}

export const RatingAndReviewsEndpoints = {
    LIKE_RECIPE_API: BASE_URL + "/reach/addLike",
    UNLIKE_RECIPE_API: BASE_URL + "/reach/removeLike",
    CREATE_RATING_API: BASE_URL + "/reach/addRating",
    GET_RECIPE_RATINGS_API: BASE_URL + "/reach/getRecipeRatings",
    GET_ALL_RATING: BASE_URL + "/reach/getAllRating"
}