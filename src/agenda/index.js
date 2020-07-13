require("dotenv").config()

const Agenda = require("agenda")
const fetch = require("node-fetch")

const twitter = require(appRoot + "/src/tweet")
const card = require(appRoot + "/src/card")

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

queue.define("send repetition", async job => {

  const { card_id, to_user, message } = job.attrs.data
  const send_result = await twitter.newThread(to_user, message)

  await card.createRep(card_id, send_result.id_str)
  
})

module.exports = queue
