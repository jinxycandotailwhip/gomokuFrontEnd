const HtmlWebpackPlugin = require("html-webpack-plugin");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = {
  output: {
    publicPath: "/",
  },
  resolve: {
    alias: {
      react: "preact/compat",
      "react-dom": "preact/compat",
    },
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react", "@babel/preset-env"],
            plugins: [
              ["@babel/plugin-transform-runtime"],
              [
                "@babel/plugin-transform-react-jsx",
                {
                  pragma: "h",
                  pragmaFrag: "Fragment",
                },
              ],
              [
                "import",
                {
                  libraryName: "antd",
                  style: true,
                },
              ],
            ],
          },
        },
      },
      {
        test: /\.(png|jpe?g|gif|woff|eot|ttf)$/i,
        use: [{ loader: "file-loader" }],
      },
      {
        test:/\.(jpg|png|gif|bmp|jpeg)$/, 
        use: 'url-loader?limit=88'
      },
      {
        test: /\.scss|\.css|\.less$/,
        use: [
          "style-loader",
          "css-loader",
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      favicon: "./src/assets/images/favicon.png",
    }),
    new BundleAnalyzerPlugin({
      analyzerHost: "0.0.0.0", // To make it work in the container
    }),
  ],
};
