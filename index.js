const express = require('express');
require('dotenv').config();
const app = express();
const bodyparser = require('body-parser');


app.use(express.json());
app.use(bodyparser.urlencoded({extended: true}));
// require('./src/service/redis/redis-cli');



app.use(require('./src/router/index'))

app.listen(process.env.PORT, ()=>{
    console.log(`server is running on ${
        process.env.PORT
    }`);
})