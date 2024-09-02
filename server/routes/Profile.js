const express = require("express");
const router = express.Router();

const {
    updateUserDetails,
    deleteAccount
} = require("../controllers/Profile");

const {
    auth
} = require("../middlewares/auth");

router.delete("/deleteAccount",auth,deleteAccount);
router.post("/updateDetails",auth,updateUserDetails);

module.exports = router;