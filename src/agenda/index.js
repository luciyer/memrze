require("dotenv").config()

const Agenda = require("agenda")
const fetch = require("node-fetch")

const db = require(appRoot + "/db")
const twitter = require(appRoot + "/src/tweet")
const scheduler = require("./timing")

const db_uri = process.env.MONGODB_URI || "mongodb://localhost/dev"

const connection_options = {
  db : {
    address: db_uri,
    collection: "tasks",
    options: { useNewUrlParser: true, useUnifiedTopology: true }
  },
  processEvery: "5 seconds"
}

const queue = new Agenda(connection_options)

queue.define("keep server awake", job => {

    const url = process.env.SERVER_URL

    fetch(url)
      .then(() => console.log(`Awake: Fetching ${url}.`))
      .catch(error => {
          console.log(`Error fetching ${url}: ${error.message}.`)
      })

})

queue.define("next repetition", async job => {

  const { card_id, to_user, message } = job.attrs.data
  const send_result = await twitter.newThread(to_user, message)

  const rep_contents = {
    repetitions: {
      thread_id: send_result.id_str
    }
  }

  const created_rep = await db.newRepetition(card_id, rep_contents)

})

module.exports = queue
