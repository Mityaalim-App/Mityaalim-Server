import { MongoClient } from 'mongodb';
const axios = require('axios')
import { Podcast } from '../models/podcastModel';
const keys = require('../config/keys');

const url = `https://api.spotify.com/v1/shows/${keys.spotifyShowId}/episodes?offset=0&limit=100`

module.exports = {
  query
}

async function fetchAndSavePodcasts(): Promise<Podcast[]> {
  try {

    axios.defaults.headers.common['Authorization'] = `Bearer ${keys.spotifyOAuthToken}`;
    const response = axios.get(url)
    
    
    const podcasts: Podcast[] = response.data.items.map((item: any) => ({
      ytid: item.id,
      title: item.name,
      description: item.description,
      thumbnailUrl: item.images[1].url,
      publishedAt: item.release_date,
      audio: item.audio_preview_url
    }));
    
    const client = await MongoClient.connect('mongodb://localhost:27017');
    const db = client.db('mityaalim');
    const podcastCollection = db.collection('podcast');
    const existingPodcasts = await podcastCollection.find().toArray();
    const newPodcasts = podcasts.filter(podcast => !existingPodcasts.some(existingPodcast => existingPodcast.id === podcast.id));
    await podcastCollection.insertMany(newPodcasts);
    
    // Return videos
    return podcasts;
  } catch (error) {
    throw error
  }
}

async function getPodcastsFromDatabase(): Promise<any[]> {
  const client = await MongoClient.connect('mongodb://localhost:27017');
  const db = client.db('mityaalim');
  const podcastsCollection = db.collection('podcasts');
  const podcasts = await podcastsCollection.find().toArray();
  return podcasts
}

setInterval(() => {
  fetchAndSavePodcasts();
}, 604800000 * 2); // 2 week in milliseconds

async function query(): Promise<Podcast[]> {
  const videos = await getPodcastsFromDatabase();
  if (videos.length > 0) {
    return videos;
  } else {
    return fetchAndSavePodcasts();
  }
}