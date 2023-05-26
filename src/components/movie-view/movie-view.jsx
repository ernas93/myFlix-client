import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

export const MovieView = ({ movies, user, setUser, token }) => {
    const { movieId } = useParams();
    const [ isFavorite, setIsFavorite ] = useState(false);

    useEffect(() => {
       const isFavorited = user.FavoriteMovies.includes(movieId)
       setIsFavorite(isFavorited)
    }, []);

    const removeFavorite = () => {
        fetch(`https://movie-api-es93.herokuapp.com/users/${user.Username}/${movieId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        }).then((response) => {
            if (response.ok) {
                return response.json()
            }
        }).then((data) => {
            setIsFavorite(false);
            localStorage.setItem("user", JSON.stringify(data));
            setUser(data);
        })
    };

    const addToFavorite = () => {
        fetch(`https://movie-api-es93.herokuapp.com/users/${user.Username}/${movieId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        }).then((response) => {
            if (response.ok) {
                return response.json()
            }
        }).then((data) => {
            setIsFavorite(true);
            localStorage.setItem("user", JSON.stringify(data));
            setUser(data);
        })
    }

    const movie = movies.find((m) => m.id === movieId);

    return (
        <div>
            <div>
                <img src={movie.image} width="30%" />
            </div>
            <div>
                <span>Title: </span>
                <span>{movie.title}</span>
            </div>
            <div>
                <span>Description: </span>
                <span>{movie.description}</span>
            </div>
            <div>
                <span>Director: </span>
                <span>{movie.director.name}</span>
                <div>
                    <span>Bio: </span>
                    <span>{movie.director.bio}</span>
                </div>
            </div>
            <div>
                <span>Genre: </span>
                <span>{movie.genre.name}</span>
                <div>
                    <span>Description: </span>
                    <span>{movie.genre.description}</span>
                </div>
            </div>

            {isFavorite ? (
                <Button onClick={removeFavorite}>Remove from favorites</Button>
            ) : (
                <Button onClick={addToFavorite}>Add to favorites</Button>
            )}

            <Link to={"/"}>
            <Button>Back</Button>
            </Link>
        </div>
    )
}
