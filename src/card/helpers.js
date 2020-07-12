const db = require(appRoot + "/db")
const twitter = require(appRoot + "/src/tweet")
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

const isLearned = (stage) => {
  return stage === 0
}

const getRep = (array, target) => {
  return array
    .map(i => { return i.thread_id })
    .indexOf(target.thread_id);
}

const archiveCard = (tweet) => {

  return db.retrieveCard(tweet.thread_id)
    .then(card => {
      card.archive = true
      return card.save()
    })
    .catch(console.error)

}

const stageChange = (tweet, correct = true) => {

  return db.retrieveCard(tweet.thread_id)
    .then(card => {

      const reps = card.repetitions,
            idx = getRep(reps, tweet),
            updated_stage = updateStage(card.stage, correct);

      card.stage = updated_stage
      card.last_practice = Date.now()

      reps[idx].responded = Date.now()
      reps[idx].correct = correct
      reps[idx].stage = updated_stage

      if (isLearned(updated_stage)){
        archiveCard(tweet)
          .then(() => {
            twitter.newReply(
              tweet.id,
              tweet.user_handle,
              twitter.messages.learned_card
            )
          })
          .catch(console.error)
      }

      return card.save()

    })
    .catch(console.error)

}

const createRepetition = (tweet, card) => {

  const next_rep = scheduler.test(card.stage, tweet.created_date)
  return db.newRepetition(card._id, next_rep, tweet.thread_id)

}

const checkAnswer = (tweet) => {

  db.retrieveCard(tweet.thread_id)
    .then(card => {
      return card.content.answer === tweet.answer
    })
    .catch(console.error)
}

module.exports = {
  archiveCard,
  stageChange,
  createRepetition,
  checkAnswer
}
