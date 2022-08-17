// Differentiate keys between development and production. 
// This assumes deployment to Heroku.NODE_ENV is set by heroku:
if (process.env.NODE_ENV === 'production') { 
    module.exports = require('./prod')
} else {
    module.exports = require('./dev')
};