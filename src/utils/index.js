const recurring = require("./recurring")

const db = require(appRoot + "/db")

const serverUp = () => {
  console.log("Server running.")
}

module.exports = {
  serverUp,
  recurring
}
