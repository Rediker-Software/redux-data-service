// tslint:disable no-var-requires no-console

import * as webpack from "webpack";
import Config from "webpack-config";
import * as glob from "fast-glob";

import * as CleanWebpackPlugin from "clean-webpack-plugin";
import * as TSLintPlugin from "tslint-webpack-plugin";
import { TsConfigPathsPlugin } from "awesome-typescript-loader";
import * as CircularDependencyPlugin from "circular-dependency-plugin";

import { join } from "path";
import { mapKeys } from "lodash";

const { dependencies } = require("../../package.json");

const outPath = join(__dirname, "../../test-dist");

const testFilter = process.env.TEST ? process.env.TEST : "*";
const testSourcePath = join(__dirname, `../../src/**/${testFilter}.test.{ts,tsx}`);

if (process.env.TEST) {
  console.log(`TEST=${process.env.TEST}`);
}

const files = glob.sync(testSourcePath, { case: false, cwd: "src" });

const entries = mapKeys(files, (fileName: string) => (
  fileName
    .substring(fileName.indexOf("src") + 4, fileName.lastIndexOf("."))
    .replace(/(\/|\\)/g, "-")
));

export default new Config().extend({
  "config/base/webpack.config.ts": (config) => {
    delete config.entry;
    delete config.plugins;
    return config;
  },
}).merge({
  mode: "none",
  // devtool: "inline-source-map",
  entry: {
    ...entries,
    test: [
      "faker",
      "redux-test-utils",
      "sinon",
      "chai",
    ],
    vendor: [...Object.keys(dependencies)],
  },
  module: {
    rules: [
      // .ts, .tsx
      {
        test: /\.tsx?$/,
        use: "awesome-typescript-loader?useCache=true&module=es6&configFileName=config/test/tsconfig.json",
      },
    ],
  },
  plugins: [
    new TsConfigPathsPlugin({configFileName: "config/test/tsconfig.json"}),
    new TSLintPlugin({ config: "tslint.json", files: "src/**/*.{ts,tsx}" }),
    new CleanWebpackPlugin([outPath], { verbose: true, allowExternal: true }),
    new webpack.optimize.AggressiveMergingPlugin(),
    new CircularDependencyPlugin({
      exclude: /node_modules/,
      failOnError: false,
      cwd: process.cwd(),
    }),
  ],
});
