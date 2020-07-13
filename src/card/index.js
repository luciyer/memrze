const db = require(appRoot + "/db")
const twitter = require(appRoot + "/src/tweet")
const agenda = require(appRoot + "/src/agenda")

const commands = require("./commands")
const helpers = require("./helpers")
const scheduler = require("./timing")

const createCard = async (tweet) => {

  const card_contents = {
    user: tweet.user_handle,
    content : {
      prompt: tweet.card_content.front,
      answer: tweet.card_content.back
    }
  }

  const new_card = await db.newCard(card_contents),
        rep_number = new_card.repetitions.length + 1,
        send_date = scheduler.test(new_card.stage, new Date());

  const job_data = {
    card_id: new_card._id,
    to_user: new_card.user,
    message: twitter.message.prompt_message(rep_number, new_card.content.prompt)
  }

  agenda.schedule(send_date, "send repetition", job_data)

}

module.exports = {
  createCard,
  commands,
  helpers
}
