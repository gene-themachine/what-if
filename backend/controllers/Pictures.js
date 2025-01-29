const axios = require('axios');
const photoRouter = require('express').Router();
const config = require('../utils/config');


const getAccessKey = () => {
    return config.UNSPLASH_ACCESS_KEY;
}

photoRouter.get('/', async (req, res) => {
    const { query } = req.query; 

    try {
        const response = await axios.get(`https://api.unsplash.com/search/photos`, {
            params: {
                query,
                client_id: getAccessKey(),
            },
            headers: { 'Accept-Version': 'v1' } 
        });


        const photo = response.data.results?.[0] || {};
        res.json(photo);

    } catch (error) {
        console.error('Error fetching photo from Unsplash:', error);

        if (error.response) {
            res.status(error.response.status).json({ message: error.response.data.errors || 'Error fetching photo' });
        } else {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
});


module.exports = photoRouter;
