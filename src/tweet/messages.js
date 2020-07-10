const stats_message = (card) => {
  return `Card: ${card.content.prompt}
          Practiced ${card.repetitions.length} time(s),
          Currently in stage ${card.stage}.`;
}

const answer_message = (card) => {
  return `Answer: \"${card.content.answer}\". Regressing card.`
}

const prompt_message = (card) => {
  return `[${card.repetitions.length + 1}]: ` + `${card.content.prompt}`;
}

const help = "Hey, I'm a friendly bot made by @notluciyer to automate spaced" +
             "repetition practice. You can learn more about me at" +
             "https://memrze.app!";

module.exports = {
  create_error : "Oops, something went wrong. I couldn't create that card.",
  learned_card: "This card has been successfully learned. Nice!",
  archived_card: "This card has been archived.",
  stats_message,
  answer_message,
  prompt_message,
  help
}
