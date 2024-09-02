const mongoose = require("mongoose");

const ReceipeTypeSchema = new mongoose.Schema(
    {
        RecipeName:{
            type:String,
            required:true,
        },
        RecipeDesc:{
            type:String,
            required:true,
        },
        Recipe:[
            {
                type:mongoose.Schema.ObjectId,
                ref:"Recipe",
            }
        ]
    }
);

module.exports = mongoose.model("RecipeType",ReceipeTypeSchema);