const redisClient = require('./redis-cli');


const save =  (filename,buffer) => {

    return new Promise((resovle, reject) => {
        console.log(1);
        redisClient.set(filename, new Buffer(buffer,'base64'));
        return resovle(true);
    })
}
const search = async () => {
    return new Promise((resovle, reject) => {

    })
}

module.exports = {
    save,
    search
}