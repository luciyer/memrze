const agenda = require(appRoot + "/src/agenda")

const serverUp = async () => {
  console.log("Server running.")
  await agenda.start()
  agenda.every("25 minutes", "keep server awake")
}

module.exports = {
  serverUp
}
