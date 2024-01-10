// import path from 'node:path';
const path = require('path');
module.exports = {
    entry: './client/main.js',
    mode:'development',
    target:"node10",
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                      presets: [
                        ['@babel/preset-env', { targets: "defaults" }]
                      ]
                    }
                  }
                        }
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        // roots: path.resolve('.')
        // alias: {
        //     vue: 'vue/dist/vue.cjs.js'
        //     }
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    devtool:'source-map',
};