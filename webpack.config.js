const path = require('path');
const {BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

const config = {
    entry: {},
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
    plugins: [],
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
    externals: {},
    optimization: {
        usedExports: true
    }
};

if(process.env.WEBPACK_DEV_SERVER) {
    config.entry.main = './src/main.tsx';
    config.output.libraryTarget = "var";
} else {
    config.entry.Shogitter ='./src/Shogitter.tsx';
    config.plugins.push(new BundleAnalyzerPlugin());
    config.externals = {
        react: "react",
        "react-dom": "react-dom"
    }
}

module.exports = config;