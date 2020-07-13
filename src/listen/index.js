const token = require("./token")
const parser = require("./event")

exports.getHandler = (req, res) => {

  const crcToken = req.query.crc_token

  if (crcToken) {
    res.status(200).send({
      response_token: token.generate(crcToken)
    })
  } else {
    res.status(400).send({
      message: "Error: crc_token missing from request."
    })
  }

}

exports.postHandler = (req, res) => {

  const tweet_events = req.body.tweet_create_events

  console.log(tweet_events)

  if (tweet_events) {
    parser.parseTweets(res, tweet_events)
  } else {
    console.log("No tweet_create_events found. Ignoring.")
    res.sendStatus(200)
  }

}
