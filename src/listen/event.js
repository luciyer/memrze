const { IncomingTweet } = require("./objects")

const card = require(appRoot + "/src/card")

const parseTweet = (t) => {
  let tweet = new IncomingTweet(t)
  tweet.writeToConsole()
  return tweet
}

const checkCommands = (t) => {
  switch(t.has_command) {
    case "__help__":
      return card.commands.sendHelp(t)
      break;
    case "__stats__":
      return card.commands.sendStats(t)
      break;
    case "__answer__":
      return card.commands.sendAnswer(t)
      break;
    case "__forgot__":
      return card.commands.sendAnswer(t)
      break;
    case "__archive__":
      return card.commands.archiveCard(t)
    default:
      break;
  }
}

const wasBotTweet = () => console.log("Event: Bot tweeted.");

const tweetNotRecognized = () =>
  console.log("No recognizable command or response found.");

exports.parseTweets = async (res, tweet_array) => {

  const processed_tweets = tweet_array.map(async t => {

    let tweet = parseTweet(t)

    if (tweet.is_card) {

      const new_card = await card.createCard(tweet)
      const new_rep = await card.createRep(new_card)
      return { new_card, new_rep }

    }

    else if (tweet.is_reply) {

      if (!tweet.has_command) {

          const correct = card.helpers.checkAnswer(tweet)
          const updated_card = await card.helpers.stageChange(tweet, correct)
          const new_rep = await card.createRep(updated_card)
          return { updated_card, new_rep }

      } else {

        const command_result = await checkCommands(tweet)
        return { command_result }

      }

    }

    else if (tweet.is_bot_event) {

      wasBotTweet()
      return "Bot Tweet"

    }

    else {

      tweetNotRecognized()
      return "Unrecognized"
      
    }

  })

  const process_results = await Promise.all(processed_tweets)
  console.log(process_results)

  res.sendStatus(200)

}
