import { Router } from "express";
import { movies } from "../data/movies";
import { jwtCheck } from "../middleware/auth";

const router = Router();

router.get("/", (req, res) => {
    res.json(movies);
});

router.post("/", jwtCheck, (req, res) => {
    const movie = req.body;

    movies.push({
        id: movies.length + 1,
        ...movie,
    });

    res.status(201).json(movie);
});

export default router;