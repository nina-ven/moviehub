import { useEffect, useState } from "react";
import {
    useParams,
    Link
} from "react-router-dom";

function MovieDetails({ keycloak }) {

    const { id } = useParams();

    const [movie, setMovie] =
        useState(null);

    const [reviews, setReviews] =
        useState([]);

    const [content, setContent] =
        useState("");

    const [rating, setRating] =
        useState("");



    async function loadMovie() {

        const response =
            await fetch(
                `http://localhost:3000/movies/${id}`
            );

        const data =
            await response.json();

        setMovie(data);

    }




    async function loadReviews() {

        const response =
            await fetch(
                `http://localhost:3000/reviews/movie/${id}`
            );

        const data =
            await response.json();

        setReviews(data);

    }




    useEffect(() => {

        loadMovie();
        loadReviews();

    }, []);





    async function addReview() {

        const response =
            await fetch(
                `http://localhost:3000/reviews/movie/${id}`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json",

                        Authorization:
                            `Bearer ${keycloak.token}`
                    },

                    body: JSON.stringify({
                        content,
                        rating
                    })
                }
            );



        if (response.ok) {

            setContent("");
            setRating("");

            loadReviews();

        }

    }






    async function deleteReview(
        reviewId
    ) {

        const response =
            await fetch(
                `http://localhost:3000/reviews/${reviewId}`,
                {
                    method: "DELETE",

                    headers: {
                        Authorization:
                            `Bearer ${keycloak.token}`
                    }
                }
            );



        if (response.ok) {

            loadReviews();

        }

    }




    if (!movie) {

        return <h2>Ładowanie...</h2>;

    }



    return (
        <>

            <Link to="/">
                Powrót
            </Link>

            <h1>
                {movie.title}
            </h1>

            <p>
                {movie.genre}
            </p>

            <p>
                {movie.year}
            </p>

            <hr />

            <h2>
                Dodaj recenzję
            </h2>

            <textarea
                value={content}
                onChange={(e) =>
                    setContent(
                        e.target.value
                    )
                }
            />

            <br />

            <input
                type="number"
                min="1"
                max="10"
                value={rating}
                onChange={(e) =>
                    setRating(
                        e.target.value
                    )
                }
            />

            <br />

            <button
                onClick={addReview}
            >
                Dodaj recenzję
            </button>

            <hr />

            <h2>
                Recenzje
            </h2>

            {
                reviews.map(review => (

                    <div
                        key={review.id}
                    >

                        <h3>
                            {review.rating}/10
                        </h3>

                        <p>
                            {review.content}
                        </p>

                        <button
                            onClick={() =>
                                deleteReview(
                                    review.id
                                )
                            }
                        >
                            Usuń
                        </button>

                        <hr />

                    </div>

                ))
            }

        </>
    );
}

export default MovieDetails;