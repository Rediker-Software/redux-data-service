import { TsConfigPathsPlugin } from "awesome-typescript-loader";

import { join } from "path";
import Config from "webpack-config";

const {dependencies} = require("../../package.json"); // tslint:disable-line

const outPath = join(__dirname, "../../test-dist");
const sourcePath = join(__dirname, "../../src");

export default new Config().merge({
  context: sourcePath,
  entry: {
    main: "./index.tsx",
    vendor: Object.keys(dependencies),
  },
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
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendor",
          chunks: "all",
        },
      },
    },
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
    // Fix webpack's default behavior to not load packages with jsnext:main module
    // https://github.com/Microsoft/TypeScript/issues/11677
    mainFields: ["browser", "main"],
    plugins: [
      new TsConfigPathsPlugin({configFileName: "config/test/tsconfig.json"}),
    ],
  },
  target: "web",
});
