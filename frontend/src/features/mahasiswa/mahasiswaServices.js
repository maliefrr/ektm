import axios from 'axios'

const API_URL = "http://localhost:5000/api/mahasiswa"

// show all mahasiswa data
const getMahasiswaData = async (token) => {
    const config = {
        headers : {
            Authorization : `Bearer ${token}`
        }
    }

    const response = await axios.get(`${API_URL}/all`,config)
    return response.data.data
}


const mahasiswaService = {
    getMahasiswaData
}

export default mahasiswaService