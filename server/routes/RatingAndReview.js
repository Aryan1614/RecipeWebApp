const express = require("express");
const router = express.Router();

const {
    addLikedRecipe,
    removeLikedRecipe,
    createRating,
    getAllRatingsForRecipe,
    getAllRatings
} = require("../controllers/RatingAndReviews");

const {auth} = require("../middlewares/auth");

router.post("/addLike",auth,addLikedRecipe);
router.post("/removeLike",auth,removeLikedRecipe);
router.post("/addRating",auth,createRating);
router.post("/getRecipeRatings",getAllRatingsForRecipe);
router.get("/getAllRating",getAllRatings);

module.exports = router;