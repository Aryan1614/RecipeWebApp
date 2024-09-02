const RatingAndReviews = require("../models/RatingAndReviews");
const Receipe = require("../models/Receipe");
const User = require("../models/User");

exports.addLikedRecipe = async(req,res) => {
    try{
        const id = req.user.id;
        const {recipeId} = req.body;

        if(!id || !recipeId){
            return res.status(403).json({
                success: false,
                message: "All Data Required!",
            });
        }

        const user = await User.findById(id);

        if(!user){
            return res.status(403).json({
                success: false,
                message: "User Not Found!",
            });
        }

        const recipe = await Receipe.findById(recipeId);

        if(!recipe){
            return res.status(403).json({
                success: false,
                message: "Recipe Not Found!"
            });
        }

        if(user.Recipe.includes(recipeId)){
            return res.status(403).json({
                success: false,
                message: "You Can't Like Your Own Recipe"
            });
        }

        if(user.LikedRecipe.includes(recipeId)){
            return res.status(403).json({
                success: false,
                message: "You Liked Recipe Already!"
            });
        }

        const updatedUser = await User.findByIdAndUpdate(
            {_id:user._id},
            {
                $push:{
                    LikedRecipe: recipe._id,
                }
            },
            {new:true}
        );

        return res.status(200).json({
            success: true,
            message: "Recipe Liked Successfully!",
            updatedUser
        });

    } catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Failed To Like Recipe!"
        })
    }
}

exports.removeLikedRecipe = async(req,res) => {
    try{
        const id = req.user.id;
        const {recipeId} = req.body;

        if(!id || !recipeId){
            return res.status(403).json({
                success: false,
                message: "All Data Required!",
            });
        }

        const user = await User.findById(id);

        if(!user){
            return res.status(403).json({
                success: false,
                message: "User Not Found!",
            });
        }

        const recipe = await Receipe.findById(recipeId);

        if(!recipe){
            return res.status(403).json({
                success: false,
                message: "Recipe Not Found!"
            });
        }

        if(user.Recipe.includes(recipeId)){
            return res.status(403).json({
                success: false,
                message: "You Can't UnLike Your Own Recipe"
            });
        }

        if(!user.LikedRecipe.includes(recipeId)){
            return res.status(403).json({
                success: false,
                message: "Recipe Not Liked!"
            });
        }

        const updatedUser = await User.findByIdAndUpdate(
            {_id:user._id},
            {
                $pull:{
                    LikedRecipe: recipe._id,
                }
            },
            {new:true}
        );

        return res.status(200).json({
            success: true,
            message: "Recipe Liked Successfully!",
            updatedUser
        });
        
    } catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Failed To Like Recipe!"
        })
    }
}

exports.createRating = async(req,res) => {
    try{

        const {
            rating,
            review,
            recipeId
        } = req.body;

        const id = req.user.id;

        if(!rating || !review || !recipeId || !id){
            return res.status(403).json({
                success: false,
                message: "All Data Required!"
            });
        }

        const recipe = await Receipe.findById(recipeId);

        if(!recipe){
            return res.status(403).json({
                success: false,
                message: "Recipe Not Found!"
            });
        }

        const user = await User.findById(id);

        if(!user){
            return res.status(404).json({
                success: false,
                message: "User Not Found!"
            });
        }

        const isAlreadyReviewd = await RatingAndReviews.find({
            user:user._id,
            recipe:recipe._id,
        });

        if(isAlreadyReviewd.length > 0){
            return res.status(404).json({
                success: false,
                message: "Already Reviewed!",
            });
        }

        await RatingAndReviews.create({
            user:user._id,
            recipe:recipe._id,
            rating:rating,
            review:review
        });

        return res.status(200).json({
            success: true,
            message: "Rating Created!",
        });

    } catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Failed To Create Rating!"
        });
    }
}

exports.getAllRatingsForRecipe = async(req,res) => {
    try{
        const {
            recipeId
        } = req.body;

        if(!recipeId){
            return res.status(404).json({
                success: false,
                message: "All Data Required!"
            });
        }

        const recipe = await Receipe.findById(recipeId);

        if(!recipe){
            return res.status(404).json({
                success: false,
                message: "Recipe Not Found!",
            });
        }

        const allRecipeRatings = await RatingAndReviews.find({
            recipe:recipe._id,
        }).sort({rating:-1}).populate("user").populate("recipe");

        let avgRating = 0;

        if(allRecipeRatings.length !== 0){
            let totalRating = 0;
            for(let i=0;i<allRecipeRatings.length;i++){
                totalRating += allRecipeRatings[i].rating;
            }
            avgRating = totalRating/allRecipeRatings.length;
        }

        return res.status(200).json({
            success: true,
            message: "Recipe Ratings Fetched Successfully!",
            data:{
                allRecipeRatings,
                avgRating: parseFloat(avgRating.toFixed(1)),
            }
        });

    } catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Failed To Fetch Recipe Ratings"
        });
    }
}

exports.getAllRatings = async(req,res) => {
    try{

        const allRatings = await RatingAndReviews.find({}).populate("user").populate({
            path:"recipe",
        }).exec();

        if(!allRatings){
            return res.status(403).json({
                success: false,
                message: "Ratings Not Found!",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Ratings Fetched Successfully!",
            allRatings
        });

    } catch(error){ 
        console.log(error);
        return res.status(403).json({
            success: false,
            message: "Failed To Fetch Average Ratings!"
        })
    }
}