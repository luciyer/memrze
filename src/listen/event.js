const {
  IncomingTweet,
  help_text,
  received_text
} = require("../tweet")

const parseTweet = (t) => {
  let tweet = new IncomingTweet(t)
  tweet.writeToConsole()
  return tweet
}

const checkCommands = (t) => {
  switch(t.has_command) {
    case "__help__":
      console.log("HELP COMMAND")
      break;
    case "__stats__":
      console.log("STATS COMMAND")
      break;
    case "__answer__":
      console.log("ANSWER COMMAND")
      break;
    case "__forgot__":
      console.log("FORGOT COMMAND")
      break;
    case "__archive__":
      console.log("ARCHIVE COMMAND")
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

exports.parseTweets = (tweet_array) => {

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
