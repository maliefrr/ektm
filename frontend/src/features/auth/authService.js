import axios from "axios"

const API_URL = "/api/users/"

// login
const login = async (userData) => {

    const response = await axios.post(`${API_URL}/login`,userData);

    if(response) {
        localStorage.setItem(JSON.stringify(response.data))
    }

    return response.data
}

const authService = {
    login
}

export default authService