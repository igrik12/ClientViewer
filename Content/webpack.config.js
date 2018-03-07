const path = require('path');

const APP_DIR = path.resolve(__dirname, './src');
const BUILD_DIR = path.resolve(__dirname, './Content');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: [
        APP_DIR + '/index.js'
    ],
    output: {
        path: BUILD_DIR,
        filename: 'bundle.js'
    },

    plugins: [
        new CopyWebpackPlugin(
            [{ from: "./Content/", to: "../../_output/Debug/Content", force: true },
            { from: "./Views/", to: "../../_output/Debug/Views", force: true }
            ]),
        //  new UglifyJsPlugin()
    ],

    module: {
        loaders: [
            {
                test: /\.jsx?/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    compact: false,
                    presets: ['react', 'stage-0', 'stage-1']
                }
            }
        ],
    }
};