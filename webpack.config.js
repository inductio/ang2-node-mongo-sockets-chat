const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

module.exports = {
    entry: "./src/index.js",
    output: {
        path: __dirname,
        filename: "./public/app.js"
    },
    module: {
        preLoaders: [
            {
                test: /\.js$/,
                loader: 'eslint',
                include: path.resolve(__dirname, 'src/')
            }
        ],
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel',
                query: {
                    presets: ['es2015','angular2']
                }
            },
            {
                test: /\.scss$/,
                include: path.join(__dirname, 'src'),
                loader: ExtractTextPlugin.extract(
                    'styles',
                    'css?minimize&-autoprefixer!postcss!sass'
                )
            }
        ]
    },
    postcss() {
        return [autoprefixer({
            browsers: ['last 3 versions']
        })];
    },
    plugins: [
        new ExtractTextPlugin('app.min.css')
    ]
};