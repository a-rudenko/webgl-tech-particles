const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    entry: './src/demo/demo.js',
    mode: 'production',
    output: {
        filename: 'webgl-tech-particles.demo.js',
        path: path.resolve(__dirname, 'dist'),
        library: {
            type: 'module',
        },
        clean: true,
    },
    experiments: {
        outputModule: true,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|jpg|gif|webp)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/icons/[name][ext]',
                },
            },
        ],
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                {from: 'settings.json', to: 'settings.json'},
                {from: 'src/assets/icons', to: 'assets/icons'},
                {from: 'src/demo/favicon.ico', to: 'favicon.ico'},
            ],
        }),
        new HtmlWebpackPlugin({
            template: 'src/demo/demo.html',
            filename: 'demo.html',
            title: 'WebGL Tech Particles Demo',
            inject: true,
            scriptLoading: 'module',
        }),
        new webpack.DefinePlugin({
            ICON_FOLDER: JSON.stringify('./assets/icons'),
        }),
    ],
};