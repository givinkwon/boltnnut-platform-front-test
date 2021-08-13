module.exports = {
  webpack: (config, { dev }) => {
    config.module.rules.push({ test: /\.css$/, loader: ["css-loader"] });
    config.module.rules.push({
      test: /\.(ttf|eot|svg|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: ["file-loader"],
    });
    config.module.rules.push({
      test: /\.(png|jpg|gif)$/,
      loader: ["file-loader"],
    });
    return config;
  },
};
