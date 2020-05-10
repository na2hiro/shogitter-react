const isDevServer = process.env.WEBPACK_DEV_SERVER;
console.log(`is ${isDevServer ? "" : "NOT"} dev`)

const presets = [
    ["@babel/preset-env", {
        "modules": /*isDevServer ? false :*/ "commonjs",
    }]
];

const plugins = isDevServer ? ["emotion"] : [];

module.exports = {presets, plugins}
