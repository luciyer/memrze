require("dotenv").config()

const path = require("path")
const express = require("express")
const bodyParser = require("body-parser")

global.appRoot = path.resolve(__dirname)

const config = require("./config"),
      util = require("./src/utils"),
      listener = require("./src/listen"),
      agenda = require("./src/agenda")

const app = express()

app
  .use(bodyParser.json())
  .listen(process.env.PORT || 8080, async () => {
    util.serverUp()
    //await agenda.start()
    //agenda.every("25 minutes", "keep server awake")
  })

app.get(config.endpoints.listen, listener.getHandler)
app.post(config.endpoints.listen, listener.postHandler)
