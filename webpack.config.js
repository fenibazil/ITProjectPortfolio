const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const autoprefixer = require('autoprefixer');

module.exports = (env, argv) => {
    const isProd = argv.mode === 'production';

    return {
        mode: isProd ? 'production' : 'development',

        entry: {
            scripts: './src/js/scripts.js'
        },

        output: {
            path: path.resolve(__dirname),
            filename: 'docs/js/[name].js',
            library: 'app'
        },

        devtool: isProd ? false : 'source-map',

        module: {
            rules: [
                {
                    test: /\.(s?css)$/i,
                    use: [
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                        {
                            loader: 'postcss-loader',
                            options: {
                                postcssOptions: {
                                    plugins: [
                                        autoprefixer()
                                    ]
                                }
                            }
                        },
                        'sass-loader',
                        'import-glob-loader'
                    ]
                },

                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                ['@babel/preset-env', { modules: false }]
                            ]
                        }
                    }
                },

                {
                    test: /\.(png|jpe?g|gif|svg|woff2?|eot|ttf)$/i,
                    type: 'asset/resource',
                    generator: {
                        filename: '[path][name][ext]'
                    }
                }
            ]
        },

        optimization: {
            minimize: isProd,
            minimizer: [
                //new TerserPlugin({ extractComments: false }),
                new CssMinimizerPlugin()
            ]
        },

        plugins: [
            new MiniCssExtractPlugin({
                filename: 'docs/styles/styles.css'
            }),

            !isProd && new StyleLintPlugin({
                fix: true,
                quiet: true
            })
        ].filter(Boolean),

        stats: {
        builtAt: true,
        children: false,
        entrypoints: false,
        errors: true,
        hash: false,
        modules: false,
        version: false,
        warnings: false
        },
        devtool: false
    };
};
