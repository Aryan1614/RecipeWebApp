const mongoose = require("mongoose");

const AdditionalDetailsSchema = new mongoose.Schema(
    {
        About:{
            type:String,
            trim: true,
        },
        contact:{
            type:Number,
            trim: true,
        },
        Gender:{
            type:String,
            trim: true,
        },
        DateOfBirth:{
            type:Date,
        }
    }
);

module.exports = mongoose.model("AdditionalDetails",AdditionalDetailsSchema);