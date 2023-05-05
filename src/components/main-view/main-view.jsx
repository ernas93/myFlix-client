import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";

export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [user, setUser] = useState(storedUser? storedUser : null);
    const [token, setToken] = useState(storedToken? storedToken : null);
    const [movies, setMovies] = useState([]);
    const [selctedMovie, setSelectedMovie] = useState(null);

    useEffect(() => {
        if (!token) {
            return;
        }

        fetch("https://movie-api-es93.herokuapp.com/movies"), {
            headers: { Authorisation: `Bearer ${token}`}
        }
        .then((response) => response.json())
        .then((data) => {
            const moviesFromApi = data.map((movie) => {
                return {
                    id: movie._id,
                    title: movie.Title,
                    image: "",
                    director: {
                        name: movie.Director.Name,
                        bio: movie.Director.Bio,
                    },
                    description: movie.Description,
                    genre:{ 
                        name: movie.Genre.Name,
                        description: movie.Genre.Description,
                    }
                };
            });
            setMovies(moviesFromApi);
        });
    }, [token]);

    if(!user) {
        return (
            <>
                <LoginView
        onLoggedIn={(user, token) => {
            setUser(user);
            setToken(token);
            }} />
            or
                <SignupView />
            </>
        );
    }

    if (selctedMovie) {
        return (
            <MovieView movie={selctedMovie} onBackClick={() => setSelectedMovie(null)} />
        ); 
    }

    if (movies.length === 0) {
        return <div>This list is empty!</div>;
    }

    return (
        <div>
            <div>
                {movies.map((movie) => (
                    <MovieCard
                        key={movie.id}
                        movie={movie}
                        onMovieClick={(newSelectedMovie) => {
                            setSelectedMovie(newSelectedMovie);
                        }}
                    />
                ))
                }
            </div>
            <button
            onClick={() => {
                setUser(null);
                setToken(null);
                localStorage.clear();
            }}
            >
                Logout
            </button>
        </div>
    );
};
 