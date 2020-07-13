const Agenda = require("agenda")

const jobs = require("./jobs")
const twitter = require(appRoot + "/src/tweet")
const db = require(appRoot + "/db")

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

  const rep_contents = {
    repetitions: {
      thread_id: thread_id
    }
  }

  console.log("now make a new repetition.")
  //await db.newRepetition(card_id, rep_contents)

})

module.exports = queue
