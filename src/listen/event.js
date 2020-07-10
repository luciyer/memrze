const { IncomingTweet } = require("./objects")

const card = require(appRoot + "/src/card")
const twitter = require(appRoot + "/src/tweet")

const parseTweet = (t) => {
  let tweet = new IncomingTweet(t)
  tweet.writeToConsole()
  return tweet
}

const checkCommands = (t) => {
  switch(t.has_command) {
    case "__help__":
      card.commands.sendHelp(t)
      break;
    case "__stats__":
      card.commands.sendStats(t)
      break;
    case "__answer__":
      card.commands.sendAnswer(t)
      break;
    case "__forgot__":
      card.commands.sendAnswer(t)
      break;
    case "__archive__":
      card.commands.archiveCard(t, false)
    default:
      break;
  }
}

const checkAnswer = (t) => {
  console.log("CHECK ANSWER")
}

const createCard = (t) => {
  console.log("CREATE NEW CARD")
}

const wasBotTweet = () => console.log("Event: Bot tweeted.");

const tweetNotRecognized = () =>
  console.log("No recognizable command or response found.");

exports.parseTweets = (res, tweet_array) => {

  tweet_array.forEach(t => {

    let tweet = parseTweet(t)

    if (tweet.is_card) {
      createCard(tweet)
    }

    else if (tweet.is_reply) {

      if (tweet.has_command)
        checkCommands(tweet)
      else
        checkAnswer(tweet)

    }

    else if (tweet.is_bot_event) {
      wasBotTweet()
    }

    else {
      tweetNotRecognized()
    }

  })

  res.sendStatus(200)

}
