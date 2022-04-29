const express = require('express');
require('dotenv').config();
const path = require('path');
const app = express();
const bodyparser = require('body-parser');

require('./src/service/redis/redis-cli');
app.use(express.json());
app.use(bodyparser.urlencoded({extended: true}));
app.use(require('./src/router/index'))

app.listen(process.env.PORT, ()=>{
    console.log(`server is running on ${
        process.env.PORT
    }`);
})