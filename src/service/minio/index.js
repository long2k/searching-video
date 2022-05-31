const minioClient = require('./minio-cli');


const makeBucket = (bucket) => {
    return new Promise((resolve, reject) => {
        minioClient.makeBucket(bucket, (err) => {
            console.log(bucket, err);
            if (err) return resolve(null);
            return resolve(bucket);
        })
    })
}

const checkBucket = (bucket) => {
    return new Promise((resolve, reject) => {
        minioClient.bucketExists(bucket, function (err, exists) {
            if (err) {
                console.log(err)
            }
            return resolve(exists);
        })
    })
}

const putItem = (bucket, fn, stream) => {
    return new Promise((resolve, reject) => {
        minioClient.putObject(bucket, fn, stream, (err, objInfo) => {
            if (err) {
               console.log(err);
            } else {
                console.log(objInfo);
                return resolve(objInfo);
            }
        }
        )
    })
}

const getItem = (bucket, fn) => {
    return new Promise((resolve, reject) => {
        minioClient.getObject(bucket, fn, (err, stream) => {
            if (err) return resolve(null);
            else return resolve(stream);
        })
    })
}

module.exports = {
    makeBucket,
    checkBucket,
    putItem,
    getItem
}