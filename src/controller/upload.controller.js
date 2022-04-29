const Minio = require('../service/minio/index');
const uuid = require('uuid');
const { transFPS, LBP_Feature } = require('../helper/parse');
const parse = require('../helper/parse');
const fs = require('fs');
const path = require('path');


module.exports = async (req, res) => {
    try {
        req.files.forEach(async (file) => {
            let frames = await transFPS(file.path);
            frames.forEach(async (filename) => {
                try {
                    let imgPath = path.resolve(`./${filename}`);
                    let data = await LBP_Feature(imgPath);
                    
                } catch (error){
                    console.log(error);
                }
            });
        })
    } catch (error) {
        console.log(error);
    }
}