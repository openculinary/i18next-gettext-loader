import path from "path";
import webpack from "webpack";
import { createFsFromVolume, Volume } from "memfs";

export default (fixture, options = {}) => {
  const compiler = webpack({
    context: __dirname,
    entry: `./${fixture}`,
    output: {
      path: path.resolve(__dirname),
      filename: "[name].js",
    },
    module: {
      rules: [
        {
          test: /\.po$/,
          use: [
            { loader: "json-loader" },
            { loader: path.resolve(__dirname, "../../index.js"), options },
          ],
        },
      ],
    },
  });

  compiler.outputFileSystem = createFsFromVolume(new Volume());
  compiler.outputFileSystem.join = path.join.bind(path);

  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) {
        reject(err);
      } else if (stats.hasErrors()) {
        reject(stats.toJson().errors);
      } else {
        resolve(stats);
      }
    });
  });
};
