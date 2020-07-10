const db = require("../db")

const sample_card = {
  card_content : {
    front: "Frontside",
    back: "Backside"
  }
}

/*
db.newCard(sample_card)
  .then(console.log)
  .catch(console.error)
*/

db.retrieveCard("asd")
  .then(console.log)
  .catch(console.error)

/*
db.newRepetition("5f07b37b6fe8ea062e076cc3", "asd")
  .then(console.log)
  .catch(console.error)
*/
