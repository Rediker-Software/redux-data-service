import Config from "webpack-config";

import * as UglifyJSPlugin from "uglifyjs-webpack-plugin";

import {join} from "path";

const outPath = join(__dirname, "../../dist");

export default new Config().extend("config/base/webpack.config.ts").merge({
  module: {
    loaders: [

      // .ts, .tsx
      {
        test: /\.tsx?$/,
        use: "awesome-typescript-loader?useCache=true&module=es6",
      },
    ],
  },
  output: {
    filename: "[name].js",
    path: outPath,
    publicPath: "",
  },
  plugins: [
    new UglifyJSPlugin(),
  ],
});
