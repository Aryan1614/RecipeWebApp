const mongoose = require("mongoose");

const RecipeSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
        },
        description:{
            type:String,
            required: true,
            trim:true
        },
        Owner:{
            type:mongoose.Schema.ObjectId,
            ref:"User",
            required:true
        },
        Image:{
            type:String,
            required:true
        },
        PreparationTime:{
            type:String,
            required:true,
        },
        CookingTime:{
            type:String,
            required:true,
        },
        Tags:[
            {
                type:String,
                required: true
            }
        ],
        servings:{
            type:Number,
            required: true
        },
        country:{
            type:String,
            required:true
        },
        RecipeType:{
            type:mongoose.Schema.ObjectId,
            ref:"RecipeType",
            required:true
        },
        Ingredients:[
            {
                type: String,
                required: true
            }
        ],
        Procedure:[
            {
                type: String,
                required: true
            }
        ],
        CreatedAt:{
            type:Date,
            default:Date.now(),
            required:true
        },
        UpdatedAt:{
            type:Date,
            default:Date.now(),
            requried:true
        }
    }
);

module.exports = mongoose.model("Recipe",RecipeSchema);