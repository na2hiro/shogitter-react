const path = require('path');

const entry = process.env.WEBPACK_DEV_SERVER ? {main: './src/main.tsx'} : {Shogitter: './src/Shogitter.tsx'};

module.exports = {
    entry,
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    { loader: "babel-loader" },
                    {loader: 'ts-loader'}
                ],
                exclude: /node_modules/,
            },
        ],
    },
    devtool: "source-map",
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: '[name].js',
        libraryTarget: 'commonjs',
        path: path.resolve(__dirname, 'dist'),
    },
    devServer: {
        open: true,
        host: "192.168.11.7",
        contentBase: path.join(__dirname, 'dist'),
        compress: true
    },
    externals: {
        react: "react",
        "react-dom": "react-dom"
    }
};