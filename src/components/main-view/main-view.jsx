import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";

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

        fetch("https://movie-api-es93.herokuapp.com/movies", {
            headers: { Authorization: `Bearer ${token}`}
        })
        .then((response) => response.json())
        .then((data) => {
            const moviesFromApi = data.map((movie) => {
                return {
                    id: movie._id,
                    title: movie.Title,
                    image: movie.ImagePath,
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
        })
        .catch((error) => {
            console.log(error)
        })
    }, [token]);

    return (
        <Row className="justify-content-md-center">
            {!user ? (
            <Col md={5}>
                <LoginView onLoggedIn={(user, token) => {
                setUser(user);
                setToken(token);
                }} />
                or
                <SignupView />
            </Col>
        ) : selctedMovie ? (
            movies.length === 0 ? (
                <Col>This list is empty!</Col>
            ) : (
            <Col md={8} style={{ border: "1px solid black" }}>
                <MovieView
                    style={{ border: "1px solid green" }}
                    movie={selctedMovie} 
                    onBackClick={() => setSelectedMovie(null)}
                />
            </Col>
            )
        ) : movies.length === 0 ? (
            <Col>This list is empty!</Col>
        ) : (
            <>
            {movies.map((movie) => (
                <Col className="mb-5" key={movie.id} md={4}>
                    <MovieCard
                        movie={movie}
                        onMovieClick={(newSelectedMovie) => {
                            setSelectedMovie(newSelectedMovie);
                        }}
                    />
                </Col>
            ))}
            </>
        )}

        {user && (
            <Col md={1}>
                <Button
                    variant="secondary"
                    onClick={() => {
                        setUser(null);
                        setToken(null);
                        localStorage.clear();
                    }}
                >
                    Logout
                </Button>
            </Col>
        )}
    </Row>
    );
};
