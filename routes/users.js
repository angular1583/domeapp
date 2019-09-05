var express = require('express');
var router = express.Router();
const fetch = require('node-fetch')
const redis = require('redis');
const REDIS_PORT = 6379;
const client = redis.createClient(REDIS_PORT);

/* GET users listing. */
router.get('/', async function(req, res, next) {
  fetch('https://jsonplaceholder.typicode.com/photos')
  .then(response => response.json())
  .then(photos => {

      // Save the  API response in Redis store,  data expire time in 3600 seconds, it means one hour
      client.setex(photosRedisKey, 3600, JSON.stringify(photos))

      // Send JSON response to client
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
