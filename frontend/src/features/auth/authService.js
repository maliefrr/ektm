import axios from "axios"

const API_URL = "http://localhost:5000/api/users"


// register
const register = async (userData) => {
    const response = await axios.post(`${API_URL}/register`,userData);

    if(response){
        localStorage.setItem("user",JSON.stringify(response.data))
    }

    return response.data
}

// login
const login = async (userData) => {

    const response = await axios.post(`${API_URL}/login`,userData);

    if(response) {
        localStorage.setItem("user",JSON.stringify(response.data))
    }
    return response.data
}


// logout
const logout = () => {
    localStorage.removeItem("user")
}

const authService = {
    login,logout,register
}

export default authService