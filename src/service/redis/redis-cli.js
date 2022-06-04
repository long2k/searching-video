const { SchemaFieldTypes } = require('redis');
const redis = require('redis');
require('dotenv').config();
const redisClient = redis.createClient({
    host: "localhost",
    port: 6379,
    password: ''
});

redisClient.on('error', err => {
    console.log('Error ' + err) 
    
})

redisClient.connect()
    .then(res => { console.log("Connect to Redis") })
    .catch(err => console.log(err))
    
module.exports = redisClient;





