const OTP = require("../models/OTP");
const User = require("../models/User");
const otpgenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const AdditionalDetails = require("../models/AdditionalDetails");
const { mailSender } = require("../utils/mailSender");
const {passwordUpdated} = require("../mails/templates/passwordUpdate");
 
exports.sendotp = async(req,res) => {
    try{

        const {email} = req.body;

        if(!email){
            return res.status(404).json({
                success: false,
                message: "Email Not Found!",
            });
        }

        const existingUser = await User.findOne({email: email});

        if(existingUser){
            return res.status(401).json({
                success: false,
                message: "User Already Exists",
            });
        }

        const otp = otpgenerator.generate(6,{
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false,
        });

        const existOtp = await OTP.findOne({otp:otp});

        while(existOtp){
            otp = otpgenerator.generate(6,{
                upperCaseAlphabets:false,
                lowerCaseAlphabets:false,
                specialChars:false
            });

            existOtp = await OTP.findOne({otp:otp});
        }

        const otpBody = await OTP.create({email,otp});

        return res.status(200).json({
            success: true,
            message: "OTP Created Successfully",
            otp,
        });

    } catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Something Went Wrong While Sending Otp",
        });
    }
}

exports.login = async(req,res) => {
    try{
        const {email,password} = req.body;

        if(!email || !password){
            return res.status(404).json({
                success: false,
                message: "All Data Required!",
            });
        }

        const user = await User.findOne({email: email}).populate("AdditionalDetails");

        if(!user){
            return res.status(401).json({
                success: false,
                message: "User Not Registered!",
            });
        }

        const isMatch = await bcrypt.compare(password,user.password);

        if(!isMatch){
            return res.status(401).json({
                success: false,
                message: "Invalid Password!",
            });
        }

        const payload = {
            email: user.email,
            id: user._id,
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET,{
            expiresIn: "5h",
        });

        user.token = token;
        user.password = undefined;

        const options = {
            expiresIn: new Date(Date.now() + 3*24*60*60*1000),
            httpOnly: true
        }

        res.cookie("token",token,options).status(200).json({
            success: true,
            message: "User Login Success!",
            user,
            token
        });

    } catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Login Failure",
        });
    }
}

exports.signup = async(req,res) => {
    try{

        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            otp
        } = req.body;

        if(!firstName || !lastName || !email || !password || !confirmPassword){
            return res.status(404).json({
                success: false,
                message: "All Details Required!",
            });
        }

        if(password!==confirmPassword){
            return res.status(401).json({
                success: false,
                message: "Password Not Matched!",
            });
        }

        const user = await User.findOne({email});

        if(user){
            return res.status(401).json({
                success: false,
                message: "User Already Exists!",
            });
        }

        const recentOtp = await OTP.find({email}).sort({createdAt: -1}).limit(1);

        if(recentOtp.length === 0){
            return res.status(401).json({
                success: false,
                message: "OTP not Found!"
            });
        }

        if(otp !== recentOtp[0].otp){
            return res.status(401).json({
                success: false,
                message: "Invalid Otp",
            });
        }

        const encryptedPassword = await bcrypt.hash(password,10);

        const profileDetails = await AdditionalDetails.create({
            About: null,
            Gender: null,
            contact: null,
            DateOfBirth: null
        });

        const newUser = await User.create({
            firstName:firstName,
            lastName:lastName,
            email:email,
            password: encryptedPassword,
            AdditionalDetails: profileDetails._id,
            image: `https://xsgames.co/randomusers/assets/avatars/pixel/4.jpg`, 
        });

        return res.status(200).json({
            success: true,
            message: "User Cretaed Successfully!",
            newUser
        });

    } catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "SignUp Failure!"
        });
    }
}

exports.changePassword = async(req,res) => {
    try{

        const {Newpassword,oldPassword} = req.body;
        const id = req.user.id;

        if(!Newpassword || !oldPassword || !id){
            return res.status(404).json({
                success: false,
                message: "All Fields Required!"
            });
        }

        const user = await User.findById(id);

        if(!user){
            return res.status(404).json({
                success: false,
                message: "User Not Found!",
            });
        }

        if(!await bcrypt.compare(oldPassword,user.password)){
            return res.status(401).json({
                success: false,
                message: "Incorrect Password!",
            });
        }

        const encryptedPassword = await bcrypt.hash(Newpassword,10);

        user.password = encryptedPassword;
        await user.save();

        try{

            const mailResponse = await mailSender(
                user.email,
                "Password for your Account has been updated",
                passwordUpdated(
                    user.email,
                    `password updated successfully for ${user.firstName} ${user.lastName}`,
                )
            );

            // console.log("Email sent successfully:", mailResponse.response)
        } catch(error){
            console.error("Error occurred while sending email:", error)
            return res.status(500).json({
                success: false,
                message: "Error occurred while sending email",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Password Changed Successfully!"
        });

    } catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Password Changing Failure!"
        });
    }
}