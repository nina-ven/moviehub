const express = require("express");
const cors = require("cors");
require("dotenv").config();

const moviesRoutes = require("./routes/movies");
const reviewsRoutes = require("./routes/reviews");


const app = express();


app.use(cors());
app.use(express.json());


app.get("/", (req,res)=>{
    res.json({
        message:"MovieHub API działa"
    });
});


app.use("/movies", moviesRoutes)
app.use("/reviews", reviewsRoutes);



app.listen(process.env.PORT, ()=>{
    console.log(
        `API działa na porcie ${process.env.PORT}`
    );
});