const express = require('express');
const Router = express.Router();
require('dotenv').config();
const multer = require('multer');
const upload = multer({dest:"./tmp"});

Router.post('/upload', upload.single('file'), require('../controller/upload.controller'));
Router.post('/search', upload.single('file'), require('../controller/search.controller'))
Router.get('/:bucket/:fn', require('../controller/download'));
module.exports = Router;