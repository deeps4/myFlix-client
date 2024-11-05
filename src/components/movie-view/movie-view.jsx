import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useState } from "react";
import "./movie-view.scss";
import { useEffect } from "react";
import PropTypes from "prop-types";

export const MovieView = ({ userInfo }) => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    if (userInfo.token) {
      fetch(
        `https://my-movies-flix-05-b51bd5948ca6.herokuapp.com/movies/${movieId}`,
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setMovie(data);
        });
    }
  }, [userInfo.token]);

  if (!movie) {
    return null;
  }
  console.log(userInfo.user, "-------");

  return (
    <div>
      <div className="d-flex flex-column align-items-center my-4">
        <img src={movie.ImagePath} className="w-25 m-3" />
      </div>
      <div>
        <span>Title: </span>
        <span>{movie.Title}</span>
      </div>
      <div>
        <span>Description: </span>
        <span>{movie.Description}</span>
      </div>
      <div>
        <span>Genre: </span>
        <span>{movie.Genre.Name}</span>
      </div>
      <div>
        <span>Director: </span>
        <span>{movie.Director.Name}</span>
      </div>
      <Link to={"/"}>Back</Link>
    </div>
  );
};

MovieView.propTypes = {
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
