const express = require("express");
const router = express.Router();

const {
    createRecipe,
    updateRecipe,
    deleteRecipe,
    getAllUserRecipes,
    getRecipeDetails,
    getAllRecipes,
    fetchLikedRecipes
} = require("../controllers/Recipe");

const {auth} = require("../middlewares/auth");

router.post("/createRecipe",auth,createRecipe);
router.post("/updateRecipe",auth,updateRecipe);
router.delete("/deleteRecipe",auth,deleteRecipe);
router.post("/getRecipeDetails",getRecipeDetails);
router.get("/getAllRecipes",auth,getAllUserRecipes);
router.get("/allRecipes",getAllRecipes);
router.get("/likedRecipe",auth,fetchLikedRecipes);

module.exports = router;