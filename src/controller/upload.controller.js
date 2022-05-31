const Minio = require('../service/minio/index');
require('dotenv').config();
const { transFPS, LBP_Feature } = require('../helper/parse');
import { v4 as uuidv4 } from 'uuid';
const parse = require('../helper/parse');
const fs = require('fs');
const path = require('path');
const redisClient = require('../service/redis/redis-cli')

module.exports = async (req, res) => {
    try {

        req.files.forEach(async (file) => {
            let origin = file.originalname;
            let info = path.parse(origin);
            let fn = uuidv4().toLocaleLowerCase();
            if (info.ext && info.ext != '') fn += info.ext;
            let upload = {
                fn: fn,
                path: file.path
            }
            if(! await Minio.checkBucket(process.env.BUCKET)) {
                let bucket = await Minio.makeBucket(process.env.BUCKET);
                if (!bucket) {
                    return res.status(500).json({ msg: "Server is error." });
                }
            }
            let saveVideo = await Minio.putItem(process.env.BUCKET, upload.fn, upload.path);
            if(!saveVideo) {
                return res.status(500).json({msg: "Not save video in minio."})
            }
            let frames = await transFPS(file.path);
            if(frames.length){
                frames.forEach(async (filename) => {
                    try {
                        let imgPath = path.resolve(`./${filename}`);
                        let data = await LBP_Feature(imgPath);
                         console.log(data)
                    } catch (error){
                        console.log(error);
                    }
                });
            }
        })
    } catch (error) {
        console.log(error);
    }
}