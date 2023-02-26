const express = require('express')
const router = express.Router()
const videoController = require('../controllers/videoController')


router.get('/api/video', (req, res) => {
    videoController.getVideos()
    .then((videos: any) => res.status(200).send(videos))
    .catch((err: any) => res.status(500).send(err))
    
});

module.exports = router