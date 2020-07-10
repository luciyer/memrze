require("dotenv").config()

const Twitter = require("twitter-lite")
const message = require("./messages")

const client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
})

const debugClient = () => console.log(client)

const logTweet = (text) =>
  console.log(console.log(`Bot Tweeted: \"${text}\"`));

const newThread = (handle, text) => {
  const tweet = `@${handle} ${text}`
  client.post("statuses/update", { status: tweet })
    .then(logTweet(tweet))
    .catch(console.error)
}

const newReply = (tweet_id, handle, text) => {
  const tweet = `@${handle} ${text}`
  client.post("statuses/update", {
    in_reply_to_status_id: tweet_id,
    status: tweet
  })
    .then(logTweet(tweet))
    .catch(console.error)
}

module.exports = {
  debugClient,
  newThread,
  newReply,
  message: message
}
