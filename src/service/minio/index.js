const minioClient = require('./minio-cli');
const fs = require('fs');

const makeBucket = (bucket) => {
    return new Promise((resolve, reject) => {
        minioClient.makeBucket(bucket, (err) => {
            if (err.code != 'BucketAlreadyOwnedByYou') resolve(null);
			else resolve(bucket);
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

const putItem = (bucket, fn, fp) => {
    return new Promise((resolve, reject) => {
		if (!fs.existsSync(fp)) return resolve(null);
		let meta = {'Content-Type': 'application/octet-stream'};
		minioClient.fPutObject(bucket, fn, fp, meta, (err, etag) => {
			if (err) return resolve(null);
			return resolve(fn);
		});
	});
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