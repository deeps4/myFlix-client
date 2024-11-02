import { useState, useEffect } from "react";
import { MovieDetails } from "../movie-details/movie-details";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import useUserInfo from "../../hooks/useUserInfo";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { number } from "prop-types";

export const MainView = () => {
  const [movies, updateMovies] = useState([]);

  const [loading, setLoading] = useState(true);
  const userInfo = useUserInfo();
  const [user, setUser] = useState(userInfo.user);
  const [token, setToken] = useState(userInfo.token);

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
    setToken(null);
    localStorage.clear();
  };

  const renderMovieView = () => {
    return <MovieView style={{ border: "1px solid green" }} />;
  };
  const renderMovieList = () => {
    return (
      <>
        {movies.map((movie) => {
          return (
            <Col key={movie._id} md={3} className="mb-5">
              <MovieDetails movie={movie} />
            </Col>
          );
        })}
        <button onClick={onLogout}>Logout</button>
      </>
    );
  };

  return (
    <>
      <BrowserRouter>
        <Row className="justify-content-md-center">
          <NavigationBar onLoggedOut={onLogout} />
          <Routes>
            <Route
              path="/login"
              element={
                user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <LoginView onLoginSuccess={onLoginSuccess} />
                  </Col>
                )
              }
            />
            <Route
              path="/signup"
              element={
                user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <SignupView />
                  </Col>
                )
              }
            />

            <Route
              path="/"
              element={
                !user ? (
                  <Navigate to="/login" />
                ) : loading ? (
                  "LOADING..."
                ) : (
                  renderMovieList()
                )
              }
            />
            <Route
              path="/movie/:movieId"
              element={
                !user ? (
                  <Navigate to="login" />
                ) : (
                  <Col md={8} style={{ border: "1px solid black" }}>
                    {renderMovieView()}
                  </Col>
                )
              }
            />
          </Routes>
        </Row>
      </BrowserRouter>
    </>
  );
};
