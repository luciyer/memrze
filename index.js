require("dotenv").config()

const path = require("path")
const express = require("express")
const bodyParser = require("body-parser")

global.appRoot = path.resolve(__dirname)

const config = require("./config"),
      util = require("./src/utils"),
      listener = require("./src/listen");

const app = express()

app
  .use(bodyParser.json())
  .listen(process.env.PORT || 8080, () => {
    util.serverUp()
    util.recurring.stayAwake(process.env.SERVER_URL)
    util.recurring.pollDatabase(1)
  })

app.get(config.endpoints.listen, listener.getHandler)
app.post(config.endpoints.listen, listener.postHandler)
