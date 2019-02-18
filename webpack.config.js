//var webpack = require('webpack');
const path = require('path');
const StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    //mode: process.env.WEBPACK_SERVE ? 'development' : 'production',
    mode: 'production',

    entry: {
        'index': './src/index.tsx',
        'main': './src/client-entry.tsx',
    },

    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },

    externals: ["fs"],
    performance: { hints: false },

    plugins: [
        new StaticSiteGeneratorPlugin({
            globals: {
                window: {},
            },
            locals: {
                cwd: process.cwd(),
                analytics_code: process.env.ANALYTICS_CODE
            },
            entry: 'index'
        }),
        new CopyWebpackPlugin([
            {
                context: 'ranked-vote-data/reports',
                from: '**/report.json',
            },
            {
                from: 'static',
            }
        ]),
    ],
    output: {
        libraryTarget: 'umd'
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
            }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        inline: false, // https://github.com/markdalgleish/static-site-generator-webpack-plugin/issues/131#issuecomment-429144580
    }
}