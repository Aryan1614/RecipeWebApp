const AdditionalDetails = require("../models/AdditionalDetails");
const RatingAndReviews = require("../models/RatingAndReviews");
const Receipe = require("../models/Receipe");
const RecipeType = require("../models/RecipeType");
const User = require("../models/User");

exports.updateUserDetails = async(req,res) => {
    try{
        const {
            firstName,
            lastName,
            About,
            Contact,
            DateOfBirth,
            Gender
        } = req.body;

        const id = req.user.id;

        if(!id){
            return res.status(404).json({
                success: false,
                message: "Id Not FOund",
            });
        }

        const user = await User.findById(id).populate("AdditionalDetails");
        const profile = await AdditionalDetails.findById(user.AdditionalDetails._id);

        if(!user || !profile){
            return res.status(404).json({
                success: false,
                message: "User Not Found!",
            })
        }

        if(firstName){
            user.firstName = firstName;
        }

        if(lastName){
            user.lastName = lastName;
        }

        if(About){
            profile.About = About;
        }

        if(Gender){
            console.log(Gender);
            profile.Gender = Gender;
        }

        if(DateOfBirth){
            profile.DateOfBirth = DateOfBirth;
        }

        if(Contact){
            profile.contact = Contact;
        }

        await user.save();
        await profile.save();

        const updatedUser = await User.findById(user._id).populate("AdditionalDetails");

        return res.status(200).json({
            success: true,
            message: "Acccount Details Updated!",
            updatedUser
        });

    } catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "User Details Updation Failure!",
        });
    }
}

exports.deleteAccount = async(req,res) => {
    try{
        const id = req.user.id;

        if(!id){
            return res.status(404).json({
                success: false,
                message: "Id Not Found!",
            });
        }

        const user = await User.findById(id);

        if(!user){
            return res.status(404).json({
                success: false,
                message: "User Not Found!",
            })
        }

        const Recipes = user.Recipe;

        for(let i=0;i<Recipes.length;i++){
            const Recipe = await Receipe.findById(Recipes[i]);
            if(Recipe){
                const recipeTypeId = Recipe.RecipeType;
                if(recipeTypeId){
                    await RecipeType.findById(
                        {_id:recipeTypeId},
                        {
                            $pull:{
                                Recipe:Recipe._id
                            }
                        },
                        {new:true}
                    );
                }
                await Receipe.findByIdAndDelete(Recipe._id);
            }
        }

        await RatingAndReviews.deleteMany({
            user:user._id
        });

        await AdditionalDetails.findByIdAndDelete(user.AdditionalDetails._id);
        
        await User.findByIdAndDelete(user._id);

        return res.status(200).json({
            success: true,
            message: "Account Deleted Successfully!",
        });

    } catch(e){
        console.log(e);
        return res.status(500).json({
            success: false,
            message: "Account Deletion Failure!",
        });
    }
}