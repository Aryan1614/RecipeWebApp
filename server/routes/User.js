const express = require("express");
const router = express.Router();

const {
    login,
    sendotp,
    signup,
    changePassword
} = require("../controllers/Auth");

const {auth} = require("../middlewares/auth");

router.post("/login",login);
router.post("/signup",signup);
router.post("/sendotp",sendotp);
router.post("/changepassword",auth,changePassword);

module.exports = router;