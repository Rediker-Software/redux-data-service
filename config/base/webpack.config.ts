import * as webpack from "webpack";
import { mapValues, merge } from "lodash";

import * as CleanWebpackPlugin from "clean-webpack-plugin";

import { TsConfigPathsPlugin } from "awesome-typescript-loader";
import { join } from "path";
import Config from "webpack-config";

const { dependencies, devDependencies } = require("../../package.json"); // tslint:disable-line

const outPath = join(__dirname, "../../dist");
const sourcePath = join(__dirname, "../../src");

export default new Config().merge({
  context: sourcePath,
  entry: {
    index: "./index.ts",
  },
  externals: merge(
    {},
    mapValues(dependencies, (value, key) => key),
    mapValues(devDependencies, (value, key) => key),
  ),
  node: {
    // workaround for webpack-dev-server issue
    // https://github.com/webpack/webpack-dev-server/issues/60#issuecomment-103411179
    fs: "empty",
    net: "empty",
  },
  output: {
    filename: "[name].js",
    path: outPath,
    publicPath: "/",
  },
  plugins: [
    new CleanWebpackPlugin([outPath], { verbose: true, allowExternal: true }),
  ],
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
    // Fix webpack's default behavior to not load packages with jsnext:main module
    // https://github.com/Microsoft/TypeScript/issues/11677
    mainFields: ["browser", "index"],
    plugins: [
      new TsConfigPathsPlugin({ configFileName: "./tsconfig.json" }),
    ],
  },
  target: "web",
});
