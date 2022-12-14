import axios from 'axios'

const API_URL = "http://localhost:5000/api/users"

// show all user data
const getUserData = async (token) => {
    const config = {
        headers : {
            Authorization : `Bearer ${token}`
        }
    }

    const response = await axios.get(`${API_URL}/all`,config)
    return response.data.data
}


const userService = {
    getUserData
}

export default userService