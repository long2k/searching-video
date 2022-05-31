const ffmpeg = require('ffmpeg');
const uuid = require('uuid');
const { spawn } = require('child_process');
require('dotenv').config()
const path = require('path');

const transFPS = async (filepath) => {
    return new Promise((resolve, reject) => {
        let process = new ffmpeg(filepath);
        process.then(video => {
            video.fnExtractFrameToJPG('./img', {
                frame_rate: 1,
                // size:(256, 256),
                number: 10,
                keep_pixel_aspect_ratio: true,
                keep_aspect_ratio: true,
                file_name: uuid.v4() + 'vd',
                
            }, function (error, file) {
                if (error) {
                    console.log(error);
                    return resolve(null)
                } else {
                    return resolve(file);
                }
            })
        }, (err) => {
            console.log(err)
            return resolve(null)
        })
    })
}

const LBP_Feature = async (filepath) => {
    return new Promise((resolve, reject) => {
        const pypro = spawn('python', [path.resolve(`./src/python/index.py`), filepath]);
        pypro.stdout.on("data", (data) => {
            // console.log(data);
            resolve(data.toString());
        })
        pypro.stderr.on('data', (data) => {
            console.log(`LBP lỗi : ${data}`)
            reject(null);
        })
    })
}


module.exports = {
    transFPS,
    LBP_Feature
}