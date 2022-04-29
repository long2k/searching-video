const Minio = require('minio');

const minioClient = new Minio.Client({
    endPoint:process.env.END_POINT,
    port:9000,
    accessKey:process.env.ACCESSKEY,
    secretKey: process.env.secretKey, 
    useSSL: false
})

module.exports = minioClient;