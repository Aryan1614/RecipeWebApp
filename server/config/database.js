const mongoose = require("mongoose");
require("dotenv").config();

exports.connect = () => {
    mongoose.connect(process.env.DATABASE_URL,{
        useUnifiedTopology: true,
        UseNewUrlParser: true,
    })
    .then(()=>{
        console.log("DB Connection Established!");
    })
    .catch((error)=>{
        console.log("DB Connection Failure");
        console.error(error);
        process.exit(1);
    })
}