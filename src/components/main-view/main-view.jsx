import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
    const [movies, setMovies] = useState([
        {
            id: 1,
            title: "Home Alone",
            image: "https://c8.alamy.com/comp/2K5M2X9/home-alone-1990-home-alone-movie-poster-2K5M2X9.jpg",
            description: "Eight-year-old Kevin is accidentally left behind when his family leaves for France. At first, he is happy to be in charge, but when thieves try to break into his home, he tries to put up a fight.",
            director: "Chris Columbus",
            genre: "Comedy"
        },
        {
            id: 2,
            title: "Harry Potter and the Philosopher's Stone",
            image: "https://cdn11.bigcommerce.com/s-ydriczk/images/stencil/1280x1280/products/84605/93507/Harry-Potter-and-the-philosophers-stone-original-movie-poster-buy-now-at-starstills__45891.1577476239.jpg?c=2",
            description: "Harry Potter, an eleven-year-old boy, whose parents died as he was a just a baby, discovers that he is a wizard and is invited to atend at Hogwarts School. Even as he escapes a dreary life and enters a world of magic, he finds trouble awaiting him.",
            director: "Chris Columbus",
            genre: "Fantasy"
        },
        {
            id: 3,
            title: "The Godfather Part II",
            image: "https://m.media-amazon.com/images/M/MV5BMWMwMGQzZTItY2JlNC00OWZiLWIyMDctNDk2ZDQ2YjRjMWQ0XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
            description: "Michael, Vito Corleone's son, attempts to expand his family's criminal empire. While he strikes a business deal with gangster Hyman Roth, he remains unaware of the lurking danger.",
            director: "Francis Ford Coppola",
            genre: "Crime"
        },
    ]);

    const [selctedMovie, setSelectedMovie] = useState(null);

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