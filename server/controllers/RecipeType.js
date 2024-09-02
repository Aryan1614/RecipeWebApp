const RecipeType = require("../models/RecipeType");

exports.createRecipeType = async(req,res) => {
    try{
        const id = req.user.id;
        const {RecipeName,RecipeDesc} = req.body;

        if(!id || !RecipeName || !RecipeDesc){
            return res.status(404).json({
                success: false,
                message: "All Data Required!"
            });
        }

        const recipeType = await RecipeType.findOne({RecipeName:RecipeName});

        if(recipeType){
            return res.status(404).json({
                success: false,
                message: "Recipe Type Already Present!",
            });
        }

        const newRecipeType = await RecipeType.create({
            RecipeName,
            RecipeDesc,
        });

        return res.status(200).json({
            success: true,
            message: "Recipe Type Created Successfully!"
        });

    } catch(error){
        return res.status(500).json({
            success: false,
            message: "Recipe Type Creation Failure!",
        })
    }
}

exports.fetchAllRecipeType = async(req,res) => {
    try{
        
        const AllCategories = await RecipeType.find({}).populate("Recipe");

        return res.status(200).json({
            success: true,
            message: "All Recipe Types Fectched Successfully!",
            AllCategories
        });

    } catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Recipe Type Fetching Error!"
        });
    }
}

exports.fetchRecipeTypeDetails = async(req,res) => {
    try{
        const {RecipeName} = req.body;

        if(!RecipeName){
            return res.status(404).json({
                success: false,
                message: "Recipe Type Not Found!",
            });
        }

        const RecipeTypeDetails = await RecipeType.findOne({RecipeName:RecipeName}).populate({
            path:"Recipe",
            populate:{
                path:"Owner",
            }
        }).exec();

        if(!RecipeTypeDetails){
            return res.status(404).json({
                success: false,
                message: "Recipe Type Details Not Found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Details Fetched Successfully!",
            RecipeTypeDetails
        });

    } catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Failed To Fetch RecipeType Details!"
        })
    }
}