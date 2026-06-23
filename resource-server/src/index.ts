import express from "express";
import cors from "cors";

import moviesRouter from "./routes/movies";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/movies", moviesRouter);

app.get("/", (req, res) => {
    res.send("MovieHub API");
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});