
export const getUserId = () => {
    return localStorage.getItem('userId')
};

export const getUserToken = () => {
    return localStorage.getItem('token')
}

export const deleteToken = () => {
 localStorage.removeItem('token')
}

// export const token = localStorage.getItem("token");
// export const userId = localStorage.getItem("userId");

