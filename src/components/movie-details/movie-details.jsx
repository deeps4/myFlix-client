import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";

export const MovieDetails = ({ movie, onMovieClick }) => {
  return (
    <Card className="h-100">
      <Card.Img variant="top" src={movie.ImagePath} />
      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <Button
          onClick={() => {
            onMovieClick(movie);
          }}
          variant="link"
        >
          Open
        </Button>
      </Card.Body>
    </Card>
  );
};
MovieDetails.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};
