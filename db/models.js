const mongoose = require("mongoose")

const repetition_schema = new mongoose.Schema({
  sent: { type: Date, default: Date.now },
  thread_id: { type: String, required: true },
  responded: { type: Date },
  correct: { type: Boolean },
  stage: { type: Number, min: 0, max: 5 }
})

const card_schema = new mongoose.Schema({
  user: { type: String, required: true, lowercase: true },
  created: { type: Date, default: Date.now },
  last_practice: { type: Date },
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
