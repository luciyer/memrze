const agenda = require(appRoot + "/src/agenda")
const future = require(appRoot + "/src/agenda/timing")

const commands = require("./commands")
const helpers = require("./helpers")

const createCard = (tweet) => {

  const card_contents = {
    user: tweet.user_handle,
    content : {
      prompt: tweet.card_content.front,
      answer: tweet.card_content.back
    }
  }

  return agenda.now("create card", card_contents)

}

const createRep = (card) => {

  const rep_number = card.repetitions.length + 1,
        send_date = future(card.stage, new Date());

  const rep_data = {
    card_id: card._id,
    to_user: card.user,
    message: twitter.message.prompt_message(rep_number, card.content.prompt)
  }

  agenda.schedule(send_date, "next repetition", rep_data)

}


module.exports = {
  createCard,
  createRep,
  commands,
  helpers
}
