import { useState } from "react";

const useUserInfo = () => {
    const userFromStorage = localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user"))
        : undefined;
    const tokenFromStorage = localStorage.getItem("token");
    const [user, setUser] = useState(userFromStorage);
    const [token, setToken] = useState(tokenFromStorage);

    const updateUser = (userData) => {
        if (userData) {
            localStorage.setItem('user', JSON.stringify(userData));
        } else {
            localStorage.removeItem('user');
        }

        setUser(userData);
    }

    const updateToken = (newToken) => {
        if (newToken) {
            localStorage.setItem('token', newToken);
        } else {
            localStorage.removeItem('token');
        }
        setToken(newToken);
    }

    return {
        user,
        token,
        updateUser,
        updateToken
    }
}

export default useUserInfo;