const db = require(appRoot + "/db")
const twitter = require(appRoot + "/src/tweet")
const helpers = require("./helpers")

const sendHelp = (tweet) => {
  twitter.newReply(tweet.id, tweet.user_handle, twitter.message.help)
}

const sendStats = (tweet) => {

  db.retrieveCard(tweet.thread_id)
    .then(card =>
      twitter.newReply(
        tweet.id,
        tweet.user_handle,
        twitter.message.stats_message(card)
      )
    )
    .catch(console.error)
}

const sendAnswer = (tweet) => {

  helpers.stageChange(tweet)
    .then(card => {

      twitter.newReply(
        tweet.thread_id,
        tweet.user_handle,
        twitter.message.answer_message(card)
      )

    })
    .catch(console.error)

}

const archiveCard = (tweet) => {

  helpers.archiveCard(tweet)
    .then(card => {
      twitter.newReply(
        tweet.id,
        tweet.user_handle,
        twitter.message.archived_card
      )
    })
    .catch(console.error)
}

module.exports = {
  sendHelp,
  sendStats,
  sendAnswer,
  archiveCard
}
