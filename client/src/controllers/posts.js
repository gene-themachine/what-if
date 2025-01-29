import axios from 'axios'
const baseUrl = '/api/posts'

const getAllPosts = async () => {
    const response = await axios.get(`${baseUrl}/all`)
    return response.data
}

const createPost = async (newObject) => {
    const response = await axios.post(`${baseUrl}/create`, newObject)
    return response.data

}

const getPost = async (id) => {
    const response = await axios.get(`${baseUrl}/${id}`)
    return response.data
}

export default { getAllPosts, createPost, getPost }
