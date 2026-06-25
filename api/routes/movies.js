const express = require("express");
const {
    auth,
    requireRole
} = require("../middleware/auth");
const db = require("../db");


const router = express.Router();



router.get("/", async(req,res)=>{

    const result =
        await db.query(
            "SELECT * FROM movies ORDER BY id"
        );


    res.json(result.rows);

});



router.get("/:id", async(req,res)=>{


    const result =
        await db.query(
            "SELECT * FROM movies WHERE id=$1",
            [req.params.id]
        );


    res.json(result.rows[0]);

});


router.post(
    "/",
    auth,
    requireRole("ADMIN", "MODERATOR"),
    async(req,res)=>{


        const {
            title,
            description,
            year,
            genre
        } = req.body;



        const result =
            await db.query(
                `
    INSERT INTO movies
    (title,description,year,genre)

    VALUES($1,$2,$3,$4)

    RETURNING *
    `,
                [
                    title,
                    description,
                    year,
                    genre
                ]
            );


        res.json(result.rows[0]);

    });



router.delete(
    "/:id",
    auth,
    requireRole("ADMIN", "MODERATOR"),
    async(req,res)=>{


        await db.query(
            "DELETE FROM movies WHERE id=$1",
            [
                req.params.id
            ]);


        res.json({
            message:"usunieto"
        });

    });



module.exports=router;