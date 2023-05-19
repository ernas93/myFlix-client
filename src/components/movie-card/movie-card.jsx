import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card"

export const MovieCard = ({ movie, onMovieClick }) => {
    return (
        <Card className="h-100">
            <Card.Img variant="top" src={movie.image} />
            <Card.Body>
                <Card.Title>{movie.title}</Card.Title>
                <Card.Text>Director: {movie.director.name}</Card.Text>
                <Card.Text>Description: {movie.description}</Card.Text>
                <Button onClick={() => onMovieClick(movie)} variant="link">
                    Open
                </Button>
            </Card.Body>
        </Card>
    );
};

MovieCard.propTypes = {
    movie: PropTypes.shape({
        title: PropTypes.string,
        description: PropTypes.string,
        director: PropTypes.shape({
            name: PropTypes.string,
            bio: PropTypes.string
        }),
        genre: PropTypes.shape({
            name: PropTypes.string,
            description: PropTypes.string
        }),
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
};