var express = require('express');
var router = express.Router();
const fetch = require('node-fetch')
const redis = require('redis');
const REDIS_PORT = 6379;
const client = redis.createClient(REDIS_PORT);

/* GET users listing. */
router.get('/', cache, async function (req, res, next) {
  const photosRedisKey = 'user:photos';
  fetch('https://jsonplaceholder.typicode.com/photos')
    .then(response => response.json())
    .then(photos => {

      // Save the  API response in Redis store,  data expire time in 3600 seconds, it means one hour
      client.setex(photosRedisKey, 3600, JSON.stringify(photos))

      // Send JSON response to client
      res.status(200)
      return res.json({ source: 'api', data: photos })

    })
    .catch(error => {
      // log error message
      console.log(error)
      // send error to the client 
      return res.json(error.toString())
    })

});


module.exports = router;

function cache(req, res, next) {
  const photosRedisKey = 'user:photos';

  client.get(photosRedisKey, (err, data) => {
    if (err) throw err;
    if (data != null) {
      console.log('cache found')
      return res.json({
        data: data
      })
    } else {
      console.log('cache not found')
      next();
    }
  })
}