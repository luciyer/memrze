const db = require(appRoot + "/db")

Date.prototype.addMinutes = function (m) {
  this.setTime(this.getTime() + (m * 60 * 1000))
  return this
}

const nextInterval = (m) => {
  return {
    begin: new Date(),
    end: new Date().addMinutes(m)
  }
}

const getActiveReps = async () => {

  const formatted_reps = []

  const active_cards = await db.retrieveActiveCards()

  active_cards.forEach(c => {
    c.repetitions.forEach(r => {
        formatted_reps.push({
          user: c.user,
          count: c.repetitions.length,
          prompt: c.content.prompt,
          rep: r
        })
    })
  })

  return formatted_reps

}

const filterReps = (rep_array, interval) => {

  return rep_array.filter(d => {

    if (!d.rep.sent && d.rep.send)
      return false
      
    return new Date(d.rep.send) < interval.end

  })

}

getNextReps = async (m) => {

  const interval = nextInterval(m)
  const all = await getActiveReps()

  return filterReps(all, interval)

}


exports.sendReps = () => {

  const rep_array = await getNextReps(1)

  rep_array.forEach(r => {

    twitter.newThread(
      r.user,
      twitter.message.prompt_message(r.count, r.prompt)
    )

    db.markSent(r.rep._id)

  })

})
