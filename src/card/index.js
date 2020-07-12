const db = require(appRoot + "/db")
const twitter = require(appRoot + "/src/tweet")

const commands = require("./commands")
const helpers = require("./helpers")
const scheduler = require("./timing")

const create = (tweet) => {

  db.newCard(tweet)
    .then(card => {

      helpers.createRepetition(tweet, card)

    })
    .catch(console.error)
}

module.exports = {
  create,
  commands,
  helpers
}
