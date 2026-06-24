import Link from "next/link";

async function getMovies() {

  const response =
      await fetch(
          "http://api:3000/movies",
          {
            cache: "no-store"
          }
      );

  return response.json();
}

export default async function Home() {

  const movies =
      await getMovies();

  return (
      <div>

        <h1>
          MovieHub SSR
        </h1>

        {
          movies.map(movie => (

              <div key={movie.id}>

                <h2>
                  {movie.title}
                </h2>

                <p>
                  {movie.genre}
                </p>

                <Link
                    href={`/movie/${movie.id}`}
                >
                  Szczegóły
                </Link>

                <hr />

              </div>

          ))
        }

      </div>
  );
}