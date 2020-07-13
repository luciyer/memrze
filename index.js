require("dotenv").config()

const path = require("path")
const express = require("express")
const bodyParser = require("body-parser")

global.appRoot = path.resolve(__dirname)

const config = require("./config"),
      listener = require("./src/listen"),
      util = require("./src/utils");

const app = express()

app
  .use(bodyParser.json())
  .listen(process.env.PORT || 8080, util.serverUp)

app
  .get(config.endpoints.listen, listener.getHandler)
  .post(config.endpoints.listen, listener.postHandler)
