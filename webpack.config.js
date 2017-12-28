var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var fs = require('fs');


var config = {
    devtool: "source-map",
    entry: './src/index',
    output: {
        path: path.resolve(__dirname,'webapp/script'),
        filename: 'bundle.js',
        publicPath: '/script/',
        chunkFilename: "chunk/[name].chunk.js"
    },
    module: {
        rules: [{
            test: /\.less$/,
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: ['css-loader?minimize', 'less-loader']
            })
        },
        {
            test: /\.js/,
            loader: 'babel-loader',
            query: {
                plugins: [
                    "transform-decorators-legacy"
                ],
                presets: ['react', 'es2015','stage-0']
            }
        }]
    },
    plugins:[],
    externals: {
        jQuery  :  'window.jQuery',
        $        :  'window.jQuery',
        jquery  :  'window.jQuery',
        zepto: 'zepto',
        "react": 'React',
        'react-dom': 'ReactDOM'
    }
};

if (process.env.NODE_ENV === 'production') {
    delete config.devtool;
    config.plugins.push(new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
    }));
    config.plugins.push(new webpack.DefinePlugin({
        "process.env": {
            NODE_ENV: JSON.stringify("production")
        }
    }));
}
module.exports = config;