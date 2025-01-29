require('dotenv').config();

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;
const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;

module.exports = {
    PORT,
    MONGODB_URI,
    UNSPLASH_ACCESS_KEY
};