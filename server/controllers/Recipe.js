const Receipe = require("../models/Receipe");
const User = require("../models/User");
const RecipeType = require("../models/RecipeType");
const { uploadImageToCloudinary } = require('../utils/imageUploader');

exports.createRecipe = async(req,res) => {
    try{
        const{
            name,
            description,
            preparationTime,
            cookingTime,
            Tags,
            servings,
            country,
            Ingredients,
            Procedure,
        } = req.body;

        const RecipeTypes = req.body.RecipeType;
        const Image = req.files.Image;
        const id = req.user.id;

        if(!name || !description || !Image || !preparationTime || !cookingTime || !Tags || !RecipeTypes || !Ingredients || !Procedure || !id ||!servings){
            return res.status(404).json({
                success: false,
                message: "All Data Required!"
            })
        }

        const user = await User.findById(id).populate("AdditionalDetails");
        if(!user){
            return res.status(404).json({
                success: false,
                message: "User Not Found!"
            });
        }

        // upload Image To Cloudinary
        const imageUrl = await uploadImageToCloudinary(
            Image,
            process.env.FOLDER_NAME
        );

        const newRecipe = await Receipe.create({
            name:name,
            description:description,
            Owner:user._id,
            Image:imageUrl.secure_url,
            PreparationTime:preparationTime,
            CookingTime:cookingTime,
            servings:servings,
            country:country,
            Tags:JSON.parse(Tags),
            RecipeType:RecipeTypes,
            Ingredients:JSON.parse(Ingredients),
            Procedure:JSON.parse(Procedure),
        });

        await RecipeType.findByIdAndUpdate(
            {_id:RecipeTypes},
            {
                $push:{
                    Recipe: newRecipe._id,
                }
            },
            {new:true}
        );

        const updatedUser = await User.findByIdAndUpdate(
            {_id: user._id},
            {
                $push:{
                    Recipe: newRecipe._id
                }
            },
            {new:true}
        ).populate("AdditionalDetails").populate("Recipe").populate("LikedRecipe");

        return res.status(200).json({
            success: true,
            message: "Recipe Created Successfully",
            updatedUser,
            newRecipe,
        });

    } catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Add Recipe Failure!",
        })
    }
}

exports.updateRecipe = async(req,res) => {
    try{

        const {
            recipeId,
            name,
            description,
            Tags,
            cookingTime,
            preparationTime,
            Procedure,
            Ingredients,
            servings,
            country,
            RecipeType
        } = req.body;

        const recipe = await Receipe.findById(recipeId);

        if(!recipe){
            return res.status(404).json({
                success: false,
                message: "Recipe Not Found!"
            });
        }

        if(name && name !== recipe.name){
            recipe.name = name;
        }

        if(description && description !== recipe.description){
            recipe.description = description;
        }

        if(Tags && JSON.parse(Tags) && JSON.parse(Tags)?.length !== recipe?.Tags?.length){
            recipe.Tags = JSON.parse(Tags);
        }

        if(cookingTime && cookingTime !== recipe.CookingTime){
            recipe.CookingTime = cookingTime;
        }

        if(preparationTime && preparationTime !== recipe.PreparationTime){
            recipe.PreparationTime = preparationTime;
        }

        if(Procedure && JSON.parse(Procedure) && JSON.parse(Procedure).length !== recipe.Procedure.length){
            recipe.Procedure = JSON.parse(Procedure);
        }

        if(Ingredients && JSON.parse(Ingredients) && JSON.parse(Ingredients).length !== recipe.Ingredients.length){
            recipe.Ingredients = JSON.parse(Ingredients);
        }

        if(country && country !== recipe.country){
            recipe.country = country;
        }

        if(servings && servings !== recipe.servings){
            recipe.servings = servings;
        }

        if(RecipeType){
            await RecipeType.findByIdAndUpdate(
                {_id:recipe._id},
                {
                    $pull:{
                        Recipe: recipeId,
                    }
                },
                {new:true}
            );
            const updatedRecipeType = await RecipeType.findByIdAndUpdate(
                {_id:RecipeType._id},
                {
                    $push:{
                        Recipe: recipe._id
                    }
                },
                {new:true}
            );
            recipe.RecipeType = updatedRecipeType._id;
        }

        if(req.files && req.files.Image !== undefined){
            const imageUrl = await uploadImageToCloudinary(
                req.files.Image,
                process.env.FOLDER_NAME,
            );
            recipe.Image = imageUrl.secure_url;
        }

        await recipe.save();

        return res.status(200).json({
            success: true,
            message: "Recipe Updated!",
        });

    } catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Recipe Updation Failure!"
        });
    }
}

exports.deleteRecipe = async(req,res) => {
    try{
        const {RecipeId} = req.body;
        const id = req.user.id;

        if(!id || !RecipeId){
            return res.status(404).json({
                success: false,
                message: "All Data Required!",
            });
        }

        const Recipe = await Receipe.findById(RecipeId);
        
        if(!Recipe){
            return res.status(404).json({
                success: false,
                message: "Recipe Not Found!",
            });
        }

        await Receipe.findByIdAndDelete(Recipe._id);

        await User.updateMany(
            {LikedRecipe:Recipe._id},
            {
                $pull:{
                    LikedRecipe:Recipe._id
                }
            },
            {new:true}
        );

        await RecipeType.findByIdAndUpdate(
            {_id:Recipe.RecipeType},
            {
                $pull:{
                    Recipe: Recipe._id
                }
            },
            {new:true}
        );

        const updatedUser = await User.findByIdAndUpdate(
            {_id: id},
            {
                $pull:{
                    Recipe: Recipe._id,
                }
            },
            {new:true}
        ).populate({
            path:"Recipe",
            populate:{
                path:"Owner"
            }
        });

        return res.status(200).json({
            success: true,
            message: "Recipe Deleted Successfully!",
            updatedUser,
        });

    } catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Recipe deletion Failure!",
        });
    }
}

exports.getRecipeDetails = async(req,res) => {
    try{
        const {RecipeId} = req.body;

        if(!RecipeId){
            return res.status(404).json({
                success: false,
                message: "All Data Required!",
            });
        }

        const details = await Receipe.findById(RecipeId).populate("Owner").exec();

        return res.status(200).json({
            success: true,
            message: "Details Fetched Successfully!",
            details
        });

    } catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Recipe Details Fetching Failure!",
        })
    }
} 

exports.getAllUserRecipes = async(req,res) => {
    try{
        const id = req.user.id;

        if(!id){
            return res.status(404).json({
                success: false,
                message: "Id Not Found!",
            });
        }

        const AllRecipes = await Receipe.find({Owner:id});

        return res.status(200).json({
            success: true,
            message: "All Recipes Fetched Successfully!",
            AllRecipes
        });

    } catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Recipes Fetching Failure"
        })
    }
}

exports.getAllRecipes = async(req,res) => {
    try{

        const allRecipes = (await Receipe.find({}).populate("Owner"));

        if(!allRecipes){
            return res.status(403).json({
                success: false,
                message: "Recipes Not Found!",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Recipes Fetched Successfully!",
            allRecipes,
        });

    } catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Failed To Fetch All Recipes!",
        })
    }
}

exports.fetchLikedRecipes = async(req,res) => {
    try{
        const {id} = req.user;

        if(!id){
            return res.status(403).json({
                success: false,
                message: "Token Expired Please ReLogin!",
            })
        }

        const user = await User.findById({_id:id}).populate({
            path:"LikedRecipe",
            populate:{
                path:"Owner"
            }
        }).exec();

        if(!user){
            return res.status(404).json({
                success: false,
                message: "User Not Found!"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Liked Recipes Fetched Successfully!",
            user
        });

    } catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Failed To Fetch Liked Recipes",
        })
    }
}