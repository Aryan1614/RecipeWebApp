import { combineReducers } from "@reduxjs/toolkit";
import authReducer from '../slices/authSlice';
import profileReducer from "../slices/profileSlice";
import RecipeReducer from "../slices/RecipeSlice";


const rootReducer = combineReducers({
    auth: authReducer,
    profile: profileReducer,
    Recipe: RecipeReducer
});

export default rootReducer;