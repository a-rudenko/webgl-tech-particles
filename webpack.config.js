const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    mode: 'production',
    output: {
        filename: 'webgl-tech-particles.js',
        path: path.resolve(__dirname, 'dist'),
        library: {
            type: 'module',
        },
        clean: true,
    },
    experiments: {
        outputModule: true,
    },
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()],
    },
    performance: {
        hints: false,
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
            ],
        }),
    ],
};
