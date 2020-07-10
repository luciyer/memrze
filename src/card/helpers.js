const scheduler = require("./timing")

const incrementStage = (current) => {
  return current === 5 ? 5 : current + 1
}

const decrementStage = (current) => {
  return current === 0 ? 0 : current - 1
}

exports.stageChange = (tweet, back = true) => {

  return db.retrieveCard(tweet.thread_id)
    .then(card => {

      const idx = card.repetitions.map(i => {
        return i.thread_id
      }).indexOf(tweet.thread_id)

      const updated_stage = back
        ? incrementStage(card.stage)
        : decrementStage(card.stage);

      card.last_practice = Date.now()
      card.stage = updated_stage

      card.repetitions[idx].responded = Date.now()
      card.repetitions[idx].correct = !back
      card.repetitions[idx].difficulty = updated_stage

      return card.save()

    })
    .catch(console.error)

}

exports.initialRepetitionDate = (tweet) => {
  return scheduler.next("5", new Date(tweet.created_date))
}

exports.nextRepetitionDate = (tweet) => {

  return db.retrieveCard(tweet.thread_id)
    .then(card => {

      const stage = card.stage.toString(),
            seed = new Date(tweet.created_date);

      return scheduler.next(stage, seed)

    })
    .catch(console.error)

}
