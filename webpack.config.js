module.exports = {
  context: __dirname + '/public/src',
  entry: './main',
  output: {
    path: __dirname + '/public/javascripts',
    filename: 'bundle.js'
  },
  // 開発時: 'development', 本番環境: 'production'
  mode: 'none',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
};