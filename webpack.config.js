const src = __dirname + '/src/';
const dist = __dirname + '/dist/';

module.exports = {
  entry: src + 'entry.js',
  output: {
    path: dist,
    publicPath: dist,
    filename: "bundle.js"
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: "style!css" },
      { test: /\.scss$/, loader: "style!css!sass" },
      { test: /\.html$/, loader: "file-loader?name=index.html" },
      // { test: /\.html$/, loader: "file-loader?name=index-[hash:6].html" },
    ]
  }
};
