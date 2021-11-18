//引入包
const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
//
module.exports = {
  entry: "./src/index.ts",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    //让webpack不用箭头
    environment: {
      arrowFunction: false,
    },
  },
  //指定webpack打包的使用的模块
  module: {
    //指定加载的规则
    rules: [
      {
        //test指定规则生效的文件
        test: /\.js/,
        //要使用的loader.按顺序执行
        use: [
          //配置babel
          {
            loader: "babel-loader",
            options: {
              presets: [
                [
                  //指定环境插件
                  "@babel/preset-env",
                  //配置信息
                  {
                    //指定浏览器版本
                    targets: {
                      chrome: "88",
                    },
                    //指定corejs版本
                    corejs: "3",
                    //使用corejs的方式 usage按需加载
                    useBuiltIns: "usage",
                  },
                ],
              ],
            },
          },
          "ts-loader",
        ],
        //排除的p
        exclude: /node-modules/,
      },
      {
        test: /\.less$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  [
                    "postcss-preset-env",
                    {
                      browsers: "last 2 versions",
                    },
                  ],
                ],
              },
            },
          },
          "less-loader",
        ],
      },
    ],
  },
  mode: "development",
  //配置webpack插件
  plugins: [
    //自动生成html,引用
    new HTMLWebpackPlugin({
      template: "./src/index.html",
    }),
    new CleanWebpackPlugin(),
  ],
  //用来设置引用模块
  resolve: {
    extensions: [".ts", ".js"],
  },
};
