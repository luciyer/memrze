const agenda = require(appRoot + "/src/agenda")

const serverUp = async () => {
  console.log("Server running.")
  await agenda.start()
  console.log("Job queue initialized.")
  agenda.every("25 minutes", "keep server awake")
  console.log("Server will be kept awake.")
}

module.exports = {
  serverUp
}
