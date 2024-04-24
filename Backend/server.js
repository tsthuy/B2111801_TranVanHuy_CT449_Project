const app = require("./app");
const connectDatabase = require("./db/Database");

//config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "config/.env",
  });
}

//create server
const server = app.listen(process.env.PORT, () => {
  console.log(`Server is running in Port: ${process.env.PORT}`);
});
connectDatabase();
// process.on("unhandledRejection", (err) => {
//   console.log(`Shutting down the server for ${err.message}`);
//   console.log(`Shutting down the server for unhandled promise rejection`);
//   server.close(() => {
//     process.exit(1);
//   });
// });
