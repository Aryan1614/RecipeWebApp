const mongoose = require("mongoose");

const RatingAndReviewSChema = new mongoose.Schema(
    {
        user:{
            type:mongoose.Schema.ObjectId,
            ref:"User",
            requried:true
        },
        recipe:{
            type:mongoose.Schema.ObjectId,
            ref:"Recipe",
            requried:true
        },
        rating:{
            type:Number,
            required:true
        },
        review:{
            type:String,
            required:true
        }
    }
);

module.exports = mongoose.model("RatingAndReviews",RatingAndReviewSChema);