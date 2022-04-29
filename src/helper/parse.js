const ffmpeg = require('ffmpeg');
const uuid = require('uuid');
const { spawn } = require('child_process');


const transFPS = async (filepath) => {
    return new Promise((resolve, reject) => {
        let process = new ffmpeg(filepath);
        process.then(video => {
            video.fnExtractFrameToJPG('./img', {
                frame_rate: 1,
                number: 50,
                keep_pixel_aspect_ratio: true,
                keep_aspect_ratio: true,
                file_name: uuid.v4() + 'vd'
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
        const pypro = spawn('python', ['../python/index.python', filepath]);
        pypro.stdout.on("data", (data) => {
            resolve(data.toString());
        })
        pypro.stderr.on('data', (data) => {
            reject(data);
        })
    })
}


module.exports = {
    transFPS,
    LBP_Feature
}