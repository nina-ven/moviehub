import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function MoviesPage({ keycloak }) {

    const [movies, setMovies] = useState([]);

    const [title, setTitle] = useState("");
    const [genre, setGenre] = useState("");
    const [year, setYear] = useState("");



    async function loadMovies() {

        const response =
            await fetch(
                "http://localhost:3000/movies"
            );

        const data =
            await response.json();

        setMovies(data);
    }



    useEffect(() => {

        loadMovies();

    }, []);




    async function addMovie() {

        const response =
            await fetch(
                "http://localhost:3000/movies",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json",

                        Authorization:
                            `Bearer ${keycloak.token}`
                    },

                    body: JSON.stringify({
                        title,
                        genre,
                        year
                    })
                }
            );



        if (response.ok) {

            loadMovies();

            setTitle("");
            setGenre("");
            setYear("");

        }

    }





    async function deleteMovie(id) {

        const response =
            await fetch(
                `http://localhost:3000/movies/${id}`,
                {
                    method: "DELETE",

                    headers: {
                        Authorization:
                            `Bearer ${keycloak.token}`
                    }
                }
            );



        if (response.ok) {

            setMovies(
                movies.filter(
                    movie => movie.id !== id
                )
            );

        }

    }




    return (
        <>

            <h1>MovieHub</h1>

            <p>
                Zalogowany:
                {" "}
                {keycloak.tokenParsed.preferred_username}
            </p>

            <button
                onClick={() =>
                    keycloak.logout()
                }
            >
                Wyloguj
            </button>


            <hr />

            <h2>Dodaj film</h2>

            <input
                placeholder="Tytuł"
                value={title}
                onChange={(e) =>
                    setTitle(
                        e.target.value
                    )
                }
            />

            <br />

            <input
                placeholder="Gatunek"
                value={genre}
                onChange={(e) =>
                    setGenre(
                        e.target.value
                    )
                }
            />

            <br />

            <input
                placeholder="Rok"
                value={year}
                onChange={(e) =>
                    setYear(
                        e.target.value
                    )
                }
            />

            <br />

            <button
                onClick={addMovie}
            >
                Dodaj
            </button>

            <hr />

            <h2>Filmy</h2>

            {
                movies.map(movie => (

                    <div
                        key={movie.id}
                    >

                        <h3>
                            {movie.title}
                        </h3>

                        <p>
                            {movie.genre}
                        </p>

                        <p>
                            {movie.year}
                        </p>

                        <Link
                            to={`/movie/${movie.id}`}
                        >
                            Szczegóły
                        </Link>

                        <br />

                        <button
                            onClick={() =>
                                deleteMovie(
                                    movie.id
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

export default MoviesPage;