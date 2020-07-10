const db = require(appRoot + "/db")
const scheduler = require("./timing")

const incrementStage = (current) => {
  return current === 5 ? 5 : current + 1
}

const decrementStage = (current) => {
  return current === 0 ? 0 : current - 1
}

const updateStage = (current, correct) => {
  return correct
    ? decrementStage(current)
    : incrementStage(current);
}

const getRep = (array, key, target) => {
  return array.map(i => { return i[key] }).indexOf(target[key])
}

exports.stageChange = (tweet, correct = true) => {

  return db.retrieveCard(tweet.thread_id)
    .then(card => {

      const reps = card.repetitions,
            idx = getRep(reps, "thread_id", tweet),
            updated_stage = updateStage(card.stage, correct),
            next_rep = scheduler.test(updated_stage, tweet.created_date)

      card.stage = updated_stage
      card.last_practice = Date.now()

      reps[idx].responded = Date.now()
      reps[idx].correct = correct
      reps[idx].difficulty = updated_stage

      card.save()

      db.newRepetition(card._id, tweet.thread_id, next_rep)
        .then(() => {
          console.log("Created Rep")
        })
        .catch(console.error)

    })
    .catch(console.error)

}

exports.checkAnswer = (tweet) => {

  db.retrieveCard(tweet.thread_id)
    .then(card => {
      return card.content.answer === tweet.answer
    })
    .catch(console.error)
}
