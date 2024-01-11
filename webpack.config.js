// import path from 'node:path';
const path = require('path');
module.exports = {
    entry: './client/main.js',
    mode:'development',
    target:"node20",
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', { targets: "defaults" }]
                        ]
                    }
                }
            },
            // {
            //     test: /\.css$/i,
            //     use: ["style-loader", "css-loader"],
            // },        
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        // roots: path.resolve('.')
        modules: [path.resolve(__dirname, 'node_modules'), 'node_modules'],
        alias: {
            vue: 'vue/dist/vue.esm-browser.js'
            // vue$: "vue/dist/vue.runtime.esm-browser.js",
            
        }
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    devtool:'source-map',
};