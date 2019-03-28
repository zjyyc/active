const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: {
        'user-info' : './src/p1/user-info.js',
        'list' : './src/p1/list.js',
        'detail' : './src/p1/detail.js'
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            filename : 'user-info.htm',
            template : './src/template.htm',
            jsList : [],
            inject : false,
            hash : true,
        }),
        new HtmlWebpackPlugin({
            filename : 'list.htm',
            template : './src/template.htm',
            jsList : [],
            inject : false,
            hash : true,
        }),
        new HtmlWebpackPlugin({
            filename : 'detail.htm',
            template : './src/template.htm',
            jsList : [],
            inject : false,
            hash : true,
        }),
    ],
    output: {
        filename: '[name]-[hash].js',
        path: path.resolve(__dirname, 'build/p1')
    },
    module: {
        rules : [{
            test: /\.less$/,
            use : ['style-loader' , 'css-loader' , 'less-loader']
        },
        {
            test: /\.(js|jsx)$/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['es2015', 'react'],
                }
            },
            exclude: /node_modules/
        }]
    }
};  