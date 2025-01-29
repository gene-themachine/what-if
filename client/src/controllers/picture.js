import axios from 'axios'
const baseUrl = '/api/pictures'

const searchPicture = async (query) => {
    const response = await axios.get(`${baseUrl}`, { params: { query } })
    return response.data
}

export default { searchPicture }