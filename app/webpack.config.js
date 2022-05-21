const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: 'development',
  entry: "./src/index.js",
  output: {
    filename: "index.js",
    path: path.resolve(__dirname,"dist"),
   
  },

  plugins: [
    new CopyWebpackPlugin([{ from: "./src/index.html", to: "index.html" }]),
    new CopyWebpackPlugin([{ from: "./src/loginPage.css", to: "loginPage.css" }]),
    new CopyWebpackPlugin([{ from: "./src/LoginPage2.css", to: "LoginPage2.css" }]),
    new CopyWebpackPlugin([{ from: "./src/ADMIN_PAGE.html", to: "ADMIN_PAGE.html" }]),
    new CopyWebpackPlugin([{ from: "./src/ADMIN.css", to: "ADMIN.css" }]),
    new CopyWebpackPlugin([{ from: "./src/Seller_Page.html", to: "Seller_Page.html" }]),
    new CopyWebpackPlugin([{ from: "./src/Consumer.css", to: "Consumer.css" }]),
    new CopyWebpackPlugin([{ from: "./src/Consumer.html", to: "Consumer.html" }]),
    new CopyWebpackPlugin([{ from: "./src/AddBalance.html", to: "AddBalance.html" }]),
    new CopyWebpackPlugin([{ from: "./src/Escrow.html", to: "Escrow.html" }]),
    new CopyWebpackPlugin([{ from: "./src/Buy_Products.html", to: "Buy_Products.html" }]),
    new CopyWebpackPlugin([{ from: "./src/Feedback.html", to: "Feedback.html" }]),
    new CopyWebpackPlugin([{ from: "./src/Consumer1.html", to: "Consumer1.html" }]),
    new CopyWebpackPlugin([{ from: "./src/Issues_At_Consumer_Side.html", to: "Issues_At_Consumer_Side.html" }]),
    new CopyWebpackPlugin([{ from: "./src/Delivered.html", to: "Delivered.html" }]),
    new CopyWebpackPlugin([{ from: "./src/newS1.css", to: "newS1.css" }]),
  ],
  devServer: { 

    contentBase: path.join(__dirname,"dist"), compress: true
 },
                
};
