const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");

const server_port = 5000;

console.log("Environment State : ", process.env.NODE_ENV);

class Server {
  constructor() {
    this.init();
  }

  init() {
      this.initHTTPServer();
      this.initControllers();
      this.initRoutes();
  }


  async initControllers() {
    this.UserController = require("./controllers/user.js")();
  }

  initRoutes() {
    console.log("Init Routes");



    //verifying token
    app.use("/", async (req, res, next) => {
        try {
          console.log("got")
          next();
        }
        catch (err) {
          res.json({ code: 403, msg: "Failed" })
        }
    });



    //sample route
    const userRoute = require("./routes/user.js")(this.UserController);
    app.use("/api/user", userRoute.getRouter());

   


  }

  initHTTPServer() {
    app.use(bodyParser.json());
    app.use(
      bodyParser.urlencoded({
        extended: true
      })
    );
    app.use(cors());
    app.listen(server_port, () => {
      console.log("Server running on port " + server_port);
    });
  }
}

const server = new Server();
