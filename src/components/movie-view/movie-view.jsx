import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useState } from "react";
import "./movie-view.scss";

import useUserInfo from "../../hooks/useUserInfo";
import { useEffect } from "react";

export const MovieView = () => {
  const { movieId } = useParams();
  const userInfo = useUserInfo();
  console.log(userInfo);
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
  return (
    <div>
      <div>
        <img src={movie.ImagePath} className="w-100" />
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
