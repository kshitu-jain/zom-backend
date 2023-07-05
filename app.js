const express = require("express");
const server = express();
const cors = require("cors");
const mongoose = require("mongoose");
// const MONGODB_URI = "mongodb://127.0.0.1:27017/zomato-app";
const MONGODB_URI =
  "mongodb+srv://Kshitija:Kshitija123@cluster0.nur0oqv.mongodb.net/zomato-app?retryWrites=true&w=majority";
const routeFolder = require("./routes/appRoutes");

server.use(cors());
server.use(express.json()); //it will enable all incoming json
server.use(express.urlencoded({ extended: false })); //allow raw post data to convet to js object
server.use("/", routeFolder);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    server.listen(5000, () => {
      console.log("server started on port:", 5000);
    });
  })
  .catch((err) => {
    console.log("db error");
  });
