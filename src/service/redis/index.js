const redisClient = require('./redis-cli');


let getObject = (key) => {
    return new Promise((resolve, reject) => {
        let obj = redisClient.hGetAll(key);
        if (obj) {
            return resolve(obj);
        }
        return reject(null);
    })
}

let saveObject = (key, data) => {
    return new Promise((resolve, reject) => {
        let obj = redisClient.hSet(key, data);
        if (obj) {
            return resolve(true);
        }
        return reject(null)
    })
}


module.exports ={
    getObject,
    saveObject
}