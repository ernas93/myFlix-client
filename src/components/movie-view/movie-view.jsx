import Button from "react-bootstrap/Button";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

export const MovieView = ({ movies }) => {
    const { movieId } = useParams();

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
            <Link to={"/"}>
            <Button>Back</Button>
            </Link>
        </div>
    )
}
