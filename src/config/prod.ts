// values for each one of these keys will be pulled from Heroku / other deployment host:
module.exports = {
    cookieKey: process.env.COOKIE_KEY,
    jwtKey: process.env.JWT_KEY,
    googleClientID: process.env.GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.GOOGLE_CLIENT_ID,
    facebookClientID: process.env.FACEBOOK_CLIENT_ID,
    facebookClientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    twitterAPIKey: process.env.TWITTER_API_KEY,
    twitterAPISecret: process.env.TWITTER_API_SECRET,
    twitterBearerToken: process.env.TWITTER_BEARER_TOKEN,
    twitterClientId: process.env.TWITTER_CLIENT_ID,
    twitterClientSecret: process.env.TWITTER_CLIENT_SECRET,
    mongoURI: process.env.MONGO_URI,
    youtubeChannelId: process.env.YOUTUBE_CHANNEL_ID,
    youtubeApiKey: process.env.YOUTUBE_API_KEY,
    spotifyClientId: process.env.SPOTIFY_CLIENT_ID,
    spotifyClientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    spotifyOAuthToken: process.env.SPOTIFY_OAUTH_TOKEN,
    spotifyShowId: process.env.SPOTIFY_SHOW_ID
};