import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    editRecipe: false,
    recipe: {},
    isRecipeCreated: false,
}

const RecipeSlice = createSlice({
    name: "Recipe",
    initialState: initialState,
    reducers:{
        setEditRecipe: (state,value) => {
            state.editRecipe = value.payload;
        },
        setRecipe: (state,value) => {
            state.recipe = value.payload;
        },
        resetRecipeState: (state) => {
            state.editRecipe = false;
            state.recipe = null;
            state.isRecipeCreated = false;
        },
        setIsRecipeCreated: (state,value) => {
            state.isRecipeCreated = value.payload
        },
    }
});

export const {setEditRecipe,setRecipe,resetRecipeState,setIsRecipeCreated} = RecipeSlice.actions;
export default RecipeSlice.reducer;