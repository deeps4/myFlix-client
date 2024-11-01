const useUserInfo = () => {
    const userFromStorage = localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user"))
        : undefined;
    const tokenFromStorage = localStorage.getItem("token");

    return {
        user: userFromStorage,
        token: tokenFromStorage
    }
}

export default useUserInfo;