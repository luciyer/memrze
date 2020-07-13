const db = require(appRoot + "/db")
const twitter = require(appRoot + "/src/tweet")
const helpers = require("./helpers")

const sendHelp = (tweet) => {
  twitter.newReply(tweet.id, tweet.user_handle, twitter.message.help)
}

const sendStats = async (tweet) => {

  const related_card = await db.retrieveCard(tweet.thread_id)

  return twitter.newReply(
    tweet.id,
    tweet.user_handle,
    twitter.message.stats_message(related_card)
  )

}

const sendAnswer = async (tweet) => {

  const related_card = await helpers.stageChange(tweet, false)

  return twitter.newReply(
    tweet.thread_id,
    tweet.user_handle,
    twitter.message.answer_message(related_card)
  )

}

const archiveCard = async (tweet) => {

  const related_card = await helpers.archiveCard(tweet)

  return twitter.newReply(
    tweet.id,
    tweet.user_handle,
    twitter.message.archived_card
  )

}

module.exports = {
  sendHelp,
  sendStats,
  sendAnswer,
  archiveCard
}
