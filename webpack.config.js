/* eslint-disable global-require */
module.exports = (env) => {
    const path = require('path');
    const webpack = require('webpack');
    const autoprefixer = require('autoprefixer');
    const paths = require('./configs/paths');
    const HtmlWebpackPlugin = require('html-webpack-plugin');
    const ExtractTextWebpackPlugin = require('mini-css-extract-plugin');

    // common plugins
    const plugins = [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public/index.html'),
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production'),
            },
        }),
    ];

    if (env) { // prod config
        plugins.push(
            new ExtractTextWebpackPlugin({
                filename: 'css/[name].css',
            }),
        );
    } else { // dev-config
        plugins.push(new webpack.HotModuleReplacementPlugin());
    }

    const lint = process.env.NODE_ENV !== 'lint' ? {} : {
        test: /\.jsx?$/,
            enforce: 'pre',
        use: [
        {
            options: {
                baseConfig: '.eslintrc.js',
            },
            loader: 'eslint-loader',
        },
    ],
        include: paths.srcPath,
        exclude: paths.n_mPath,
    };

    // postcss
    const postcssRules = {
        loader: require.resolve('postcss-loader'),
        options: {
            ident: 'postcss',
            plugins: () => [
                require('postcss-flexbugs-fixes'),
            ],
        },
    };

    // css,
    const cssDev = {
        test: /\.css$/,
        use: [
            'style-loader',
            'css-loader',
            postcssRules,
        ],
    };

    const cssProd = {
        test: /\.css$/,
        use: [
            ExtractTextWebpackPlugin.loader,
            'css-loader',
            // postcssRules,
        ],
    };

    const cssRules = env ? cssProd : cssDev;

    // scss
    const scssProd = {
        test: /\.scss$/,
        use: [
            ExtractTextWebpackPlugin.loader,
            'css-loader',
            // postcssRules,
            'sass-loader',
        ],
    };

    const scssDev = {
        test: /\.scss$/,
        use: [
            'style-loader',
            'css-loader',
            postcssRules,
            'sass-loader',
        ],
    };

    const scssRules = env ? scssProd : scssDev;

    // entry
    const entry = env ? [paths.indexJsPath]
        : ['webpack-hot-middleware/client?path=/__webpack_hmr&reload=true', paths.indexJsPath];

    // devtool
    const devtool = env ? 'source-map' : 'eval';

    // webpack config
    return {
        mode: env ? 'production' : 'development',
        entry,
        output: {
            path: paths.prodPath,
            filename: 'js/main.js',
            publicPath: paths.publicPath,
            sourceMapFilename: 'js/main.js.map',
        },
        devtool,
        stats: {
            modules: false,
            chunks: false,
            children: false,
        },
        module: {
            rules: [
                lint,
                {
                    test: /\.js$/,
                    loader: 'babel-loader',
                    include: paths.srcPath,
                    exclude: paths.n_mPath,
                },
                scssRules,
                {
                    test: /\.(?:png|jpg|svg)$/,
                    loader: 'url-loader',
                    query: {
                        limit: 10000,
                        name: 'img/[name].[hash:8].[ext]',
                    },
                },
                {
                    test: /\.html$/,
                    loader: 'raw-loader',
                },
            ],
        },
        plugins,
    };
};
