const express = require('express');
const Router = express.Router();
require('dotenv').config();
const multer = require('multer');
const upload = multer({dest:'./tmp'});

Router.post('/upload', upload.array('file', 12), require('../controller/upload.controller'));

module.exports = Router;