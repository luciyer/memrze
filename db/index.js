require("dotenv").config()

const mongoose = require("mongoose")

const {
  Card,
  Repetition
} = require("./models")

const db_uri = process.env.MONGODB_URI || "mongodb://localhost/dev"

mongoose.connect(db_uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("Successfully connected to MongoDB."))
  .catch(console.error)

exports.newCard = (tweet) => {

  const card_contents = {
    user: tweet.user_handle,
    content : {
      prompt: tweet.card_content.front,
      answer: tweet.card_content.back
    }
  }

  return new Card(card_contents).save()

}

exports.retrieveCard = (thread_id) => {
  const filter = { "repetitions.thread_id": thread_id }
  return Card.findOne(filter).exec()
}

exports.newRepetition = (card_id, send_date, thread_id) => {

  const rep_contents = {
    repetitions: {
      thread_id: thread_id,
      send: send_date
    }
  }

  return Card.findByIdAndUpdate(card_id,
    { $push: rep_contents },
    { new: true, useFindAndModify: false }
  ).exec()

}

exports.retrieveActiveCards = () => {

  return Card.find({
    archive: false,
    repetitions: {
      $exists: true,
      $ne: []
    }
  }).exec()

}
