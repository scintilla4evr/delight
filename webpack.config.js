module.exports = [
    {
        mode: "development",
        entry: "./src/main.ts",
        target: "electron-main",
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    include: /src/,
                    use: [
                        {
                            loader: "ts-loader"
                        }
                    ]
                }
            ]
        },
        output: {
            path: __dirname + "/src",
            filename: "main.js"
        }
    },
    {
        mode: "development",
        entry: "./src/delight/delight.ts",
        target: "electron-renderer",
        devtool: "source-map",
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    include: /src/,
                    use: [
                        {
                            loader: "ts-loader"
                        }
                    ]
                },
                {
                    test: /\.s[ac]ss$/,
                    include: /src/,
                    use: [
                        "style-loader", "css-loader", "sass-loader"
                    ]
                }
            ]
        },
        output: {
            path: __dirname + "/src/delight",
            filename: "delight.js"
        }
    }
]