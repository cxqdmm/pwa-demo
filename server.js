
require('babel-register')

const webpack = require('webpack');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

// var cookieParser = require('cookie-parser');
const config = require('./webpack.config');

const fs = require("fs");

const isProduction = process.env.NODE_ENV === 'production';
const isDeveloping = true;
const app = express();


// Webpack developer
if (isDeveloping) {
    const compiler = webpack(config);
    app.use(require('webpack-dev-middleware')(compiler, {
        publicPath: config.output.publicPath,
        noInfo: true
    }));

    app.use(require('webpack-hot-middleware')(compiler));
}
app.get('/', function(req, res) {
    res.sendFile(path.resolve(__dirname, '', 'index.html'));
})

const publicPath = path.resolve(__dirname,'webapp');
app.use(express.static(publicPath));
const port = isProduction ? (process.env.PORT || 80) : 4003;

app.listen(port, function(err, result) {
    if (err) {
        console.log(err);
    }
    console.log('Server running on port ' + port);
});

