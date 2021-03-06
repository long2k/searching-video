const Minio = require('../service/minio/index');
require('dotenv').config();
const { transFPS, LBP_Feature, flatIndex } = require('../helper/parse');
import { v4 as uuidv4 } from 'uuid';
const path = require('path');
const redisClient = require('../service/redis/redis-cli');
const fs = require('fs');


module.exports = async (req, res) => {
    try {
        let file = req.file
        let origin = file.originalname;
        let info = path.parse(origin);
        let fn = uuidv4().toLocaleLowerCase();
        if (info.ext && info.ext != '') fn += info.ext;
        await fs.rm(path.resolve('./img'), { recursive: true, force: true }, (err) => {
            console.log(err)
        });
        let upload = {
            fn,
            path: file.path,
        }
        let bucket = await Minio.makeBucket(process.env.BUCKET);
        if (!bucket) {
            return res.status(500).json({ msg: "Server is error." });
        }

        let saveVideo = await Minio.putItem(process.env.BUCKET, upload.fn, upload.path);
        if (!saveVideo) {
            return res.status(500).json({ msg: "Not save video in minio." })
        }  
        upload.url = "http://localhost:8081/" + process.env.BUCKET + '/' + upload.fn;
        let frames = await transFPS(file.path);
        // await flatIndex();
        if (frames.length) {
            frames.forEach(async function (filename) {
                try {
                    let imgPath = path.resolve(`./${filename}`);
                    await LBP_Feature(imgPath, upload.url);
                } catch (error) {
                    console.log(error);
                }
            });
        }


        return res.status(200).json({ msg: "Save Successfully!", url: upload.url })
    } catch (error) {
        console.log(error);
    }
}