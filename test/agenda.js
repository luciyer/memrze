const Agenda = require("agenda")

const db_uri = process.env.MONGODB_URI || "mongodb://localhost/dev"

const connection_options = {
  db : {
    address: db_uri,
    collection: "tasks",
    options: { useNewUrlParser: true, useUnifiedTopology: true }
  },
  processEvery: "5 minutes"
}

const queue = new Agenda(connection_options)

const asd = async function () {
  queue.define("test", job => {
    console.log("doing this")
  })
  await queue.start()
  queue.schedule(new Date(), "test")
}

asd()
