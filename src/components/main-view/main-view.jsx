import { useState, useEffect } from "react";
import { MovieDetails } from "../movie-details/movie-details";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

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

  const renderLoginAndSignup = () => {
    return (
      <div>
        <LoginView onLoginSuccess={onLoginSuccess} />
        or
        <SignupView />
      </div>
    );
  };

  const renderMovieView = () => {
    return (
      <MovieView
        movie={selectedMovie}
        style={{ border: "1px solid green" }}
        onBackClick={() => {
          updateSelectedMovie(null);
        }}
      />
    );
  };
  const renderMovieList = () => {
    return (
      <>
        {movies.map((movie) => {
          return (
            <Col key={movie._id} md={3} className="mb-5">
              <MovieDetails
                movie={movie}
                onMovieClick={(newSelectedMovie) => {
                  updateSelectedMovie(newSelectedMovie);
                }}
              />
            </Col>
          );
        })}
        <button onClick={onLogout}>Logout</button>
      </>
    );
  };

  return (
    <Row className="justify-content-md-center">
      {!user ? (
        <Col md={5}>{renderLoginAndSignup()}</Col>
      ) : loading ? (
        <div>LOADING...</div>
      ) : selectedMovie ? (
        <Col md={8} style={{ border: "1px solid black" }}>
          {renderMovieView()}
        </Col>
      ) : movies.length === 0 ? (
        <div>Movie list is empty.</div>
      ) : (
        renderMovieList()
      )}
    </Row>
  );
};
