const express = require("express");
const router = express.Router();

const {
    createRecipeType,
    fetchAllRecipeType,
    fetchRecipeTypeDetails
} = require("../controllers/RecipeType"); 
  
const {auth} = require("../middlewares/auth");

router.post("/createRecipeType",auth,createRecipeType);
router.get("/allRecipeTypes",fetchAllRecipeType);
router.post("/RecipeTypeDetails",fetchRecipeTypeDetails);

module.exports = router;