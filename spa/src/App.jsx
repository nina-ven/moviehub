import { BrowserRouter, Routes, Route } from "react-router-dom";

import MoviesPage from "./pages/MoviesPage";
import MovieDetails from "./pages/MovieDetails";

function App({ keycloak }) {

    return (
        <BrowserRouter>

            <Routes>

                <Route
                    path="/"
                    element={
                        <MoviesPage
                            keycloak={keycloak}
                        />
                    }
                />

                <Route
                    path="/movie/:id"
                    element={
                        <MovieDetails
                            keycloak={keycloak}
                        />
                    }
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;