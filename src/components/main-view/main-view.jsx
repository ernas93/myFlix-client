import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
    const [movies, setMovies] = useState([]);

    const [selctedMovie, setSelectedMovie] = useState(null);

    useEffect(() => {
        fetch("https://movie-api-es93.herokuapp.com/movies")
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
    }, []);

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
    );
};
 