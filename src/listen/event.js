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
      card.commands.archiveCard(t)
    default:
      break;
  }
}

const wasBotTweet = () => console.log("Event: Bot tweeted.");

const tweetNotRecognized = () =>
  console.log("No recognizable command or response found.");

exports.parseTweets = (res, tweet_array) => {

  tweet_array.forEach(async t => {

    let tweet = parseTweet(t)

    if (tweet.is_card) {
      const new_card = await card.createCard(tweet)
      const new_rep = await card.createRep(new_card)
      console.log("Made new card:", new_card)
      console.log("Made new rep:", new_rep)
    }

    else if (tweet.is_reply) {

      if (!tweet.has_command) {

          const correct = card.helpers.checkAnswer(tweet)
          const updated_card = await card.helpers.stageChange(tweet, correct)
          const new_rep = await card.createRep(updated_card)

          console.log("Updated card:", updated_card)
          console.log("Made new rep:", new_rep)

      } else {
        checkCommands(tweet)
      }

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
