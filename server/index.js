const express = require("express")
const app = express();
require("dotenv").config();

const database = require("./config/database");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const { clodinaryConnect } = require("./config/cloudinary");
const cors = require("cors");

const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const RecipeRoutes = require("./routes/Recipe");
const RecipeTypeRoutes = require("./routes/RecipeType");
const ratingRoutes = require("./routes/RatingAndReview");

const PORT = process.env.PORT || 4000;

database.connect();

app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: "*",
        credentials: true
    })
);
app.use(
    fileUpload({
        useTempFiles:true,
        tempFileDir: "/temp"
    })
);

app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile",profileRoutes);
app.use("/api/v1/Recipe",RecipeRoutes);
app.use("/api/v1/RecipeType",RecipeTypeRoutes);
app.use("/api/v1/reach",ratingRoutes);

clodinaryConnect();

// server
app.get("/",(req,res) => {
    return res.json({
        success: true,
        message: "Your Server Is Up And Running!"
    })
});

app.listen(PORT,() => {
    console.log(`APP Is Listening At Port ${PORT}`);
});