require("dotenv").config()

const express = require("express")
const bodyParser = require("body-parser")

const util = require("./src/utils")

const app = express()

app.use(bodyParser.json())

app.listen(process.env.PORT || 8080, () => {
  util.serverUp()
  util.stayAwake(process.env.SERVER_URL)
})
