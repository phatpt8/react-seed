const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

function getEntries(entries) {
    if (process.env.NODE_ENV === 'development') {
        return entries.concat([
            'webpack-dev-server/client?http://localhost:8080',
            'webpack/hot/only-dev-server']
        )
    }
    return entries;
}

const env = process.env.NODE_ENV || 'development';
const publicPath = process.env.PUBLIC_PATH || "/";
const isDev = env !== "production";
const distPath = path.resolve(__dirname, 'dist');
const sourcePath = path.resolve(__dirname, 'src');
const indexPath = sourcePath + "/index";

module.exports = {
    entry: isDev ? getEntries([indexPath]) : indexPath,
    output: {
        path: distPath,
        filename: 'ie.[hash].js',
        publicPath: publicPath
    },
    resolve: {
        modules: [
            './src',
            'node_modules',
        ],
        alias: {
            main: 'src',
            components: sourcePath + '/components'
        },
        extensions: ['.js', '.jsx', '.css', '.less', '.svg', '.html', '.ico']
    },
    devtool: isDev ? 'eval-source-map' : 'source-map',
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: [{
                loader: 'babel-loader',
                options: {
                    presets: ['es2015', 'stage-0', 'react']
                }
            }]
        }, {
            test: /\.(less|css)$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                loader: [
                    'css-loader',
                    'less-loader'
                ]
            })
        }, {
            test: /\.svg$/,
            use: 'svg-sprite-loader'
        }, {
            test: /\.woff2$/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 99990000,
                    mimetype: 'application/font-woff2',
                    name: 'public/fonts/[name].[ext]',
                }
            }],
        }, {
            test: /\.woff$/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 99990000,
                    mimetype: 'application/font-woff',
                    name: 'public/fonts/[name].[ext]',
                }
            }],
        }, {
            test: /\.[ot]tf$/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 99990000,
                    mimetype: 'application/octet-stream',
                    name: 'public/fonts/[name].[ext]',
                }
            }],
        }, {
            test: /\.(jpg|png)$/,
            loader: 'file-loader',
            options: {
                name: 'images/[name].[ext]'
            },
        },
        ]
    },
    devServer: {
        historyApiFallback: true
    },
    plugins: prodPlugins([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(env)
            }
        }),
        new HtmlWebpackPlugin({
            template: './src/index.ejs',
            filename: './index.html'
        }),
        new ExtractTextPlugin('ie.[contenthash].css')
    ])
};

function prodPlugins(commonPlugins) {
    return isDev ? commonPlugins : commonPlugins.concat([
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.optimize.AggressiveMergingPlugin(),
        new webpack.NoErrorsPlugin()
    ])
}