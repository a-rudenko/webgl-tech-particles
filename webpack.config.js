const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
    entry: {
        demo: './src/demo/demo.js',
        app: './src/index.js',
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
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
        new HtmlWebpackPlugin({
            title: 'WebGL Tech Particles - Demo',
            template: './src/index.html',
            filename: 'demo.html',
            chunks: ['demo'],
        }),
        new HtmlWebpackPlugin({
            title: 'WebGL Tech Particles',
            template: './src/index.html',
            filename: 'app.html',
            chunks: ['app'],
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: 'settings.json', to: 'settings.json' },
                { from: 'src/assets/icons', to: 'assets/icons' },
            ],
        }),
    ],
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        open: '/demo.html',
        compress: true,
        port: 9000,
    },
    mode: 'development',
};