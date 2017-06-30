module.exports = {
    entry: `./dev/index.js`,
    output: {
        path: `${__dirname}/src/server`,
        filename: 'bundle.js'
    },
    devtool: 'source-map',
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.otf$/,
                loader: 'file-loader'
            }
        ]
    }
};