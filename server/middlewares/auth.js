const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = async(req,res,next) => {
    try{
        const token = 
        req.cookies.token || 
        req.body.token ||
        req.header("Authorization").replace("Bearer ","");

        if(!token){
            return res.status(404).json({
                success: false,
                message: "Token Not Found!",
            });
        }

        try{
            const decode = jwt.verify(token,process.env.JWT_SECRET);
            req.user = decode;
        } catch(error){
            console.log(error);
            return res.status(401).json({
                success: false,
                message: "Token Is Invalid!"
            });
        }
        
        next();
    } catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Something Went Wrong While Validation Token!",
        });
    }
}
