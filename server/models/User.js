const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        firstName:{
            type: String,
            required: true
        },
        lastName:{
            type:String,
            required: true
        },
        email:{
            type:String,
            required: true,
        },
        password:{
            type:String,
            required:true,
        },
        Recipe:[
            {
                type:mongoose.Schema.ObjectId,
                ref:"Recipe"
            }
        ],
        AdditionalDetails:{
            type:mongoose.Schema.ObjectId,
            ref:"AdditionalDetails"
        },
        token:{
            type:String,
        },
        createdAt:{
            type:Date,
            default: Date.now(),
            required: true
        },
        LikedRecipe:[
            {
                type:mongoose.Schema.ObjectId,
                ref:"Recipe"
            }
        ],
        image:{
            type:String,
            required: true
        }
    }
);

module.exports = mongoose.model("User",UserSchema);