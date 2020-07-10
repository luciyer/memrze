const mongoose = require("mongoose")

const repetition_schema = new mongoose.Schema({
  thread_id : { type: String, required: true },
  send: { type: Date, required: true },
  sent: { type: Boolean, default: false },
  responded: { type: Date, default: null },
  correct: { type: Boolean, default: false },
  difficulty: { type: Number, min: 0, max: 5 }
})

const card_schema = new mongoose.Schema({
  created: { type: Date, default: Date.now },
  last_practice: { type: Date, default: Date.now },
  content: {
    prompt: String,
    answer: String
  },
  stage: { type: Number, min: 0, max: 5, default: 5 },
  algorithm: { type: String, default: "default", lowercase: true },
  archive: { type: Boolean, default: false },
  repetitions: [ repetition_schema ]
})

module.exports.Card = mongoose.model("Card", card_schema)
module.exports.Repetition = mongoose.model("Repetition", repetition_schema)
