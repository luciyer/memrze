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
        tweet.id, tweet.user_handle, message.stats_message(card)
      )
    )
    .catch(console.error)
}

const sendAnswer = (tweet) => {

  helpers.stageChange(tweet)
    .then(() => {

      twitter.newReply(
        tweet.thread_id,
        tweet.user_handle,
        twitter.message.answer_message(card)
      )

    })
    .catch(console.error)

}

const archiveCard = (tweet, learned = true) => {

  const message = learned
    ? twitter.message.learned_card
    : twitter.message.archived_card;

  db.retrieveCard(tweet.thread_id)
    .then(card => {

      card.archive = true

      card
        .save()
        .then(twitter.newReply(tweet.id, tweet.user_handle, message))
        .catch(console.error)

    })
    .catch(console.error)

}

module.exports = {
  sendHelp,
  sendStats,
  sendAnswer,
  archiveCard
}
