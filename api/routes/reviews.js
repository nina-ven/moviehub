const express = require("express");
const db = require("../db");

const {
    auth,
    requireRole
} = require("../middleware/auth");


const router = express.Router();



router.get(
    "/movie/:movieId",
    async(req,res)=>{


        const result =
            await db.query(
                `
        SELECT *
        FROM reviews
        WHERE movie_id=$1
        `,
                [
                    req.params.movieId
                ]
            );


        res.json(result.rows);

    });



router.post(
    "/movie/:movieId",
    auth,
    requireRole("USER"),
    async(req,res)=>{


        const {
            content,
            rating
        } = req.body;


        const userId =
            req.user.sub;



        const result =
            await db.query(
                `
        INSERT INTO reviews
        (
            content,
            rating,
            movie_id,
            user_id
        )

        VALUES
        ($1,$2,$3,$4)

        RETURNING *
        `,
                [
                    content,
                    rating,
                    req.params.movieId,
                    userId
                ]
            );



        res.json(result.rows[0]);

    });





router.delete(
    "/:id",
    auth,
    requireRole("ADMIN"),
    async(req,res)=>{


        await db.query(
            `
        DELETE FROM reviews
        WHERE id=$1
        `,
            [
                req.params.id
            ]
        );


        res.json({
            message:"recenzja usunięta"
        });

    });



module.exports = router;