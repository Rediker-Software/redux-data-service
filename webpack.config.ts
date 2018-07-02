import Config, { environment } from "webpack-config";

environment.setAll({
    env: () => process.env.NODE_ENV,
});

console.log("NODE_ENV", process.env.NODE_ENV); // tslint:disable-line

export default new Config().extend("config/[env]/webpack.config.ts");
