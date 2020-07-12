const db = require("../db")

const sample_card = {
  user: "notluciyer",
  card_content : {
    front: "Frontside",
    back: "Backside"
  }
}

const sample_card_2 = {
  user: "notluciyer",
  card_content: {
    front: "sangre (genero)",
    back: "f (la)"
  }
}

db.newCard(sample_card)
  .then(console.log)
  .catch(console.error)


db.retrieveCard("asd")
  .then(console.log)
  .catch(console.error)


db.newRepetition("5f0913cf878afc1167efb52b", new Date())
  .then(console.log)
  .catch(console.error)

db.retrieveActiveCards()
  .then(console.log)
  .catch(console.error)
