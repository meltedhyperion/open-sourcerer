const {resolve} = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const tsRule = {
    test:/\.ts(x?)$/,
    exclude: /node_modules/,
    use: 'ts-loader'
}

const cssRule = {
    test: /\.css$/i,
    use: [
        MiniCssExtractPlugin.loader,
        'css-loader',
        'postcss-loader',
    ],
};

const plugins = [
    new HTMLWebpackPlugin({
        template: 'src/popup-page/popup.html',
        filename: 'popup.html',
        chunks: ['popup'],
    }),
    new CopyWebpackPlugin({
        patterns: [
            {from: "public", to: "."}
        ],
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[id].css',
    }),
];

module.exports = {
    mode: "development",
    devtool: 'cheap-module-source-map',
    entry:{
        popup: './src/popup-page/popup.tsx'
    },
    output: {
        filename: '[name].js',
        path: resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            tsRule,
            cssRule,
        ],
    },
    plugins
}