import { useState, useEffect } from "react";
import { MovieDetails } from "../movie-details/movie-details";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";

export const MainView = () => {
  const userFromStorage = JSON.parse(localStorage.getItem("user"));
  const tokenFromStorage = localStorage.getItem("token");
  const [movies, updateMovies] = useState([]);

  const [selectedMovie, updateSelectedMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(userFromStorage);
  const [token, setToken] = useState(tokenFromStorage);

  useEffect(() => {
    if (token) {
      fetch("https://my-movies-flix-05-b51bd5948ca6.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          updateMovies(data);
          setLoading(false);
        });
    }
  }, [token]);

  const onLoginSuccess = (userData, userToken) => {
    setUser(userData);
    setToken(userToken);
  };
  const onLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  if (!user) {
    return (
      <div>
        <LoginView onLoginSuccess={onLoginSuccess} />
        or
        <SignupView />
      </div>
    );
  }

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
      <button onClick={onLogout}>Logout</button>
    </div>
  );
};
