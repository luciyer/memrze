const { IncomingTweet } = require("./objects")

const help_text =
  "Hey, I'm a friendly bot made by @notluciyer to automate " +
  "spaced repetition practice. You can learn more about me " +
  "at https://memrze.app!";

const received_text = (card) => `The card \"${card}\" has been created!`

module.exports = {
  IncomingTweet: IncomingTweet,
  help_text: help_text,
  received_text: received_text
}
