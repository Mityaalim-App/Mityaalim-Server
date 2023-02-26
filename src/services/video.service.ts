import { google } from 'googleapis';
import { MongoClient } from 'mongodb';
const axios = require('axios')
import { Video } from '../models/videoModel';
const keys = require('../config/keys');

const url = `https://www.googleapis.com/youtube/v3/search?channelId=${keys.youtubeChannelId}&order=date&part=snippet&type=video&maxResults=100&key=${keys.youtubeApiKey}`

module.exports = {
  query
}

async function fetchAndSaveVideos(): Promise<Video[]> {
  try {

    const response = axios.get(url)
    
    const videos: Video[] = response.data.items.map((item: any) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnailUrl: item.snippet.thumbnails.high.url,
      publishedAt: new Date(item.snippet.publishedAt),
    }));
    
    const client = await MongoClient.connect('mongodb://localhost:27017');
    const db = client.db('mityaalim');
    const videosCollection = db.collection('video');
    const existingVideos = await videosCollection.find().toArray();
    const newVideos = videos.filter(video => !existingVideos.some(existingVideo => existingVideo.id === video.id));
    await videosCollection.insertMany(newVideos);
    
    // Return videos
    return videos;
  } catch (error) {
    throw error
  }
}

async function getVideosFromDatabase(): Promise<any[]> {
  const client = await MongoClient.connect('mongodb://localhost:27017');
  const db = client.db('mityaalim');
  const videosCollection = db.collection('video');
  const videos = await videosCollection.find().toArray();
  return videos
}

setInterval(() => {
  fetchAndSaveVideos();
}, 604800000); // 1 week in milliseconds

async function query(): Promise<Video[]> {
  const videos = await getVideosFromDatabase();
  if (videos.length > 0) {
    return videos;
  } else {
    return fetchAndSaveVideos();
  }
}
