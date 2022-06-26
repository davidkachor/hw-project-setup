const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isDev = process.env.NODE_ENV === "development";
const isProd = !isDev;
console.log("isDev ", isDev);
const fileName = (ext) => (isDev ? `[name].${ext}` : `[name].[hash].${ext}`);

module.exports = [
    {
        mode: "development",
        entry: {
            main: "./src/index.js",
        },
        output: {
            filename: fileName("js"),
            path: path.resolve(__dirname, "dist"),
        },
        plugins: [
            new HTMLWebpackPlugin({
                template: "./src/index.html",
                minify: {
                    collapseWhitespace: isProd,
                },
            }),
            new CleanWebpackPlugin(),
            new MiniCssExtractPlugin({
                filename: fileName("css"),
            }),
        ],
        devServer: {
            port: 4200,
            hot: isDev,
        },
        module: {
            rules: [
                {
                    test: /\.html$/,
                    use:['html-loader']
                },
                {
                    test: /\.css$/,
                    use: [MiniCssExtractPlugin.loader, "css-loader"],
                },
                {
                    test: /\.(json | xml|png|svg|jpg|jpeg|gif)$/,
                    use: [ {
                        loader: 'file-loader',
                        options: {
                            name: fileName('[ext]'),
                        }
                    }],
                },
                {
                    test: /\.(gif|png|jpe?g|svg)$/,
                    use: [
                        {
                            loader: "file-loader",
                            options: {
                                name: fileName("[ext]"),
                                outputPath: "img/",
                            },
                        },
                    ],
                },
            ],
        },
        resolve: {
            extensions: ["*", "js"],
        },
    },
    {
        mode: "development",
        entry: {
            main: "./src/index.js",
        },
        output: {
            filename: fileName("js"),
            path: path.resolve(__dirname, "dist-old"),
        },
        plugins: [
            new HTMLWebpackPlugin({
                template: "./src/index.html",
                minify: {
                    collapseWhitespace: isProd,
                },
            }),
            new CleanWebpackPlugin(),
            new MiniCssExtractPlugin({
                filename: fileName("css"),
            }),
        ],
        devServer: {
            port: 4200,
            hot: isDev,
        },
        module: {
            rules: [
                {
                    test: /\.html$/,
                    use:['html-loader']
                },
                {
                    test: /\.js$/i,
                    exclude: /node-modules/,
                    use: [
                        {
                            loader: "babel-loader",
                            options: {
                                presets: ["@babel/preset-env"],
                            },
                        },
                    ],
                },
                {
                    test: /\.css$/,
                    use: [MiniCssExtractPlugin.loader, "css-loader"],
                },
                {
                    test: /\.(json | xml)$/,
                    use: ["file-loader"],
                },
                {
                    test: /\.(gif|png|jpe?g|svg)$/,
                    use: [
                        {
                            loader: "file-loader",
                            options: {
                                name: fileName("[ext]"),
                                outputPath: "img/",
                            },
                        },
                    ],
                },
            ],
        },
        resolve: {
            extensions: ["*", "js"],
        },
    },
];
