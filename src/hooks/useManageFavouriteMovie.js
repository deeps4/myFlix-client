import { useState } from "react";
import PropTypes from "prop-types";



const useManageFavouriteMovie = (userInfo) => {

    const addToFavourite = async (movieId) => {
        return fetch(
            `https://my-movies-flix-05-b51bd5948ca6.herokuapp.com/users/${userInfo.user.Username}/movies/${movieId}`,
            {
                method: "POST",
                headers: { Authorization: `Bearer ${userInfo.token}` },
            }
        )
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    alert("Unable to add movie to favourites.")
                }
            })
    };
    const removeFromFavourite = async (movieId) => {
        return fetch(
            `https://my-movies-flix-05-b51bd5948ca6.herokuapp.com/users/${userInfo.user.Username}/movies/${movieId}`,
            {
                method: "DELETE",
                headers: { Authorization: `Bearer ${userInfo.token}` },
            }
        )
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    alert("Unable to remove movie from favourites.")
                }
            })


    }
    return { addToFavourite, removeFromFavourite }
}

export default useManageFavouriteMovie;

useManageFavouriteMovie.PropTypes = {
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
