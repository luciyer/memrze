const Agenda = require("agenda")

const jobs = require("./jobs")
const twitter = require(appRoot + "/src/tweet")
const card = require(appRoot + "/src/card")

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

queue.define("keep server awake", job => {
  jobs.stayAwake()
})

queue.define("send repetition", async job => {

  const { card_id, to_user, message } = job.attrs.data
  const send_result = await twitter.newThread(to_user, message)

  //card.createRep(card_id, send_result.id_str)

})

module.exports = queue
