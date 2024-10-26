import { useState, useEffect } from "react";
import { MovieDetails } from "../movie-details/movie-details";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, updateMovies] = useState([]);

  const [selectedMovie, updateSelectedMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://my-movies-flix-05-b51bd5948ca6.herokuapp.com/movies")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        updateMovies(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>LOADING...</div>;
  }

  if (selectedMovie) {
    return (
      <MovieView
        movie={selectedMovie}
        onBackClick={() => {
          updateSelectedMovie(null);
        }}
      />
    );
  }

  if (movies.length === 0) {
    return <div>Movie list is empty.</div>;
  }

  return (
    <div>
      {movies.map((movie) => {
        return (
          <MovieDetails
            key={movie._id}
            movie={movie}
            onMovieClick={(newSelectedMovie) => {
              updateSelectedMovie(newSelectedMovie);
            }}
          />
        );
      })}
    </div>
  );
};
