const db = require(appRoot + "/db")
const twitter = require(appRoot + "/src/tweet")

const commands = require("./commands")
const helpers = require("./helpers")


const create = (tweet) => {

  db.newCard(tweet)
    .then(card => {

      const stage = card.stage.toString(),
            seed = new Date(tweet.created_date),
            next_rep = scheduler.next(stage, seed);

      db.newRepetition(card._id, tweet.thread_id, next_rep)
        .then(console.log)
        .catch(console.error)

    })
    .catch(console.error)
}



module.exports = {
  commands,
  helpers
}
