import axios from "axios"

const API_URL = "/api/users"

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
    login,logout
}

export default authService