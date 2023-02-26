const videoService = require('../services/video.service') 

module.exports = {
    getVideos
}

async function getVideos(req, res) {
    try {
    //   logger.debug('Getting Boards')
      const videos = await videoService.query()
      res.json(videos)
    } catch (err) {
    //   logger.error('Failed to get boards', err)
      res.status(500).send({ err: 'Failed to get boards' })
    }
  }