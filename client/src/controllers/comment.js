import axios from 'axios'
const baseUrl = '/api/comments'

const getCommentsByPostId = async (postId) => {
    const response = await axios.get(`${baseUrl}/${postId}`)
    return response.data
}

const createComment = async (postId, content) => {
    const response = await axios.post(baseUrl, { content, postId })
    return response.data
}

export default { getCommentsByPostId, createComment }
