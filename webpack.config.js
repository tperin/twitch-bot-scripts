const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');
const WebpackShellPluginNext = require('webpack-shell-plugin-next');

const modules = ['minerva', 'launchcodes','falloutnews'];

const configs = modules.map(moduleName => ({
  mode: 'production', // 'production' mode enables various optimizations including minification and tree shaking
  entry: `./${moduleName}/src/${moduleName}.ts`, // Assuming 'index.ts' is your entry point; adjust if it's named differently
  output: {
    path: path.resolve(__dirname, `${moduleName}/dist`),
    filename: `${moduleName}.min.js`, // The name of the output bundle after minification
    library: {
      name: '${moduleName}',
      type: 'umd', // Universal Module Definition
    },
    globalObject: 'this'
  },
  resolve: {
    extensions: ['.ts', '.js'], // Add '.ts' and '.js' as resolvable extensions.
  },
  module: {
    rules: [
      {
        test: /\.ts$/, // All files with a '.ts' extension will be handled by 'ts-loader'
        use: 'ts-loader',
        include: path.resolve(__dirname, `${moduleName}/src`), // Only include 'minerva/src' folder
        exclude: [/node_modules/,/\.test\.ts$/],
      },
      // You can add more rules for other file types here, if needed
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new WebpackShellPluginNext({
      onBuildEnd: {
        scripts: [
          `node wrapInJson.js ${moduleName}/dist/${moduleName}.min.js ${moduleName}/dist/${moduleName}.script.json`
        ],
        blocking: false,
        parallel: true,
      },
    }),
  ],
}));

module.exports = configs;