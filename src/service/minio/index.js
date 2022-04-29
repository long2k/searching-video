const minioClient = require('./minio-cli');


const makeBucket = async (bucket) => {
    return new Promise((resolve, reject) => {
        minioClient.makeBucket(bucket, (err) => {
            console.log(bucket, err);
            if (err) return resolve(null);
            return resolve(bucket);
        })
    })
}

const putItem = async (bucket, fn) => {
    return new Promise((resolve, reject) => {
        minioClient.putObject(bucket, fn, (err, objInfo => {
            if (err) {
                return resolve(err);
            } else {
                return resolve(objInfo);
            }
        })
        )
    })
}

const getItem = async (bucket, fn)=>{
    return new Promise((resolve, reject)=>{
        minioClient.getObject(bucket, fn , (err, stream)=>{
            if(err) return resolve(null);
            else return resolve(stream);
        })
    })
}

module.exports = {
    makeBucket,
    putItem,
    getItem
}