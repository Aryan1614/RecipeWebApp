const clodinary = require("cloudinary").v2;

exports.clodinaryConnect = () => {
    try{
         clodinary.config({
            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.CLOUD_API_KEY,
            api_secret: process.env.CLOUD_API_SECRET
         })
    } catch(error){
        console.log(error);
    }
}