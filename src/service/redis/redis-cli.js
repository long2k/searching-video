const redis = require('redis');

const client = redis.createClient({
    host: 'localhost',
    port: 6379,
    password: ''
});

client.on('connect', function(){
    console.log('Connected.. ');
})
client.on('error', err=>{
    console.log('Error '+err)
})





