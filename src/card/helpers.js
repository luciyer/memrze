const db = require(appRoot + "/db")
const twitter = require(appRoot + "/src/tweet")

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

const archiveCard = async (tweet) => {
  const related_card = await db.retrieveCard(tweet.thread_id)
  related_card.archive = true
  return related_card.save()
}

const stageChange = async (tweet, correct = true) => {

  const related_card = await db.retrieveCard(tweet.thread_id)

  const reps = related_card.repetitions,
        idx = getRep(reps, tweet),
        updated_stage = updateStage(related_card.stage, correct);

  related_card.stage = updated_stage
  related_card.last_practice = Date.now()

  reps[idx].responded = Date.now()
  reps[idx].correct = correct
  reps[idx].stage = updated_stage

  if (isLearned(updated_stage)) {
    related_card.archive = true
    twitter.newReply(
      tweet.id,
      tweet.user_handle,
      twitter.message.learned_card
    )
  }

  return related_card.save()

}

const checkAnswer = async (tweet) => {
  const related_card = await db.retrieveCard(tweet.thread_id)
  return related_card.content.answer === tweet.answer
}

module.exports = {
  archiveCard,
  stageChange,
  checkAnswer
}
