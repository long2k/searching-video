const {compareVector } = require('../helper/parse');
const redisClient = require('../service/redis/redis-cli');
const { getObject } = require('../service/redis/index');
const distance = require('euclidean-distance');

module.exports = async (req, res) => {
    try {
        let file = req.file;
        let result = await compareVector(file.path);
        if(result)
        {
           console.log(result);
           return res.status(200).json({data: result});
        }
        

    } catch (error) {
        console.log(error)
        return res.status(500).json({ error })
    }
}