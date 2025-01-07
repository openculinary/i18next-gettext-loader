import path from "path";
import webpack from "webpack";
import { createFsFromVolume, Volume } from "memfs";
import { fileURLToPath } from "url";

// Credit: https://github.com/nodejs/help/issues/2907
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
