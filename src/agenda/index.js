const Agenda = require("agenda")

const jobs = require("./jobs")

const db_uri = process.env.MONGODB_URI || "mongodb://localhost/dev"

const connection_options = {
  db : {
    address: db_uri,
    collection: "tasks"
  },
  processEvery: "30 seconds"
}

const queue = new Agenda(connection_options)

queue.define("keep server awake", job => {
  jobs.stayAwake()
})

(async function() {
  const stay_awake = queue.create("keep server awake")
  await queue.start()
  await queue.repeatEvery("20 minutes").save()
})();
