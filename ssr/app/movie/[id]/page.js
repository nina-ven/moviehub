async function getMovie(id) {

    const response =
        await fetch(
            `http://api:3000/movies/${id}`,
            {
                cache: "no-store"
            }
        );

    return response.json();
}

export default async function MoviePage({ params }) {

    const { id } = await params;

    const movie = await getMovie(id);

    return (
        <div>
            <h1>{movie.title}</h1>
            <p>{movie.genre}</p>
            <p>{movie.year}</p>
        </div>
    );
}
