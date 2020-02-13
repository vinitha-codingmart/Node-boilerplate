const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const jwt = require("./services/jwt");

const server_port = 6000;

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
    this.SampleController = require("./controllers/sample.js")();
  }

  initRoutes() {
    console.log("Init Routes");



    //verifying token
    app.use("/", async (req, res, next) => {
        try {
            res.send("hello")
          const decoded = await jwt.verify(req.token);
          req.token_details = decoded
          next();
        }
        catch (err) {
          res.json({ code: 403, msg: "Token verification failed" })
        }
    });



    //sample route
    const sampleRoute = require("./routes/sample.js")(this.SampleController);
    app.use("/api/sample", sampleRoute.getRouter());

   


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
