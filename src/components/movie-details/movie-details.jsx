import PropTypes from "prop-types";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import useManageFavouriteMovie from "../../hooks/useManageFavouriteMovie";

export const MovieDetails = ({ movie, userInfo }) => {
  const { addToFavourite, removeFromFavourite } =
    useManageFavouriteMovie(userInfo);

  const isFavouriteMovie = userInfo.user.FavouriteMovies.includes(movie._id);

  const handleAddToFavourite = () => {
    const userPromise = addToFavourite(movie._id);

    userPromise.then((userData) => {
      if (userData) {
        userInfo.updateUser(userData);
      }
    });
  };

  const handleRemoveFromFavourite = () => {
    const userPromise = removeFromFavourite(movie._id);
    userPromise.then((userData) => {
      if (userData) {
        userInfo.updateUser(userData);
      }
    });
  };
  return (
    <Card className="h-100">
      <Card.Img variant="top" src={movie.ImagePath} />
      <div className="d-flex flex-column align-items-center my-4">
        {isFavouriteMovie ? (
          <Button variant="danger" onClick={handleRemoveFromFavourite}>
            Remove from Favourite
          </Button>
        ) : (
          <Button variant="success" onClick={handleAddToFavourite}>
            Add to Favourite
          </Button>
        )}
      </div>
      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>

        <Link to={"/movie/" + movie._id}>Open</Link>
      </Card.Body>
    </Card>
  );
};
MovieDetails.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
  }).isRequired,
  userInfo: PropTypes.shape({
    user: PropTypes.shape({
      Username: PropTypes.string.isRequired,
      Password: PropTypes.string.isRequired,
      Email: PropTypes.string.isRequired,
      Birthday: PropTypes.string.isRequired,
      FavouriteMovies: PropTypes.array,
    }),
    token: PropTypes.string.isRequired,
  }).isRequired,
};
