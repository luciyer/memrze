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

    const unsent = (!d.rep.sent && d.rep.send)

    if (!unsent)
      return false

    const send_date = new Date(d.rep.send)
    const in_interval = (
      send_date >= interval.begin && send_date < interval.end
    )

    return in_interval

  })

}

exports.getNextReps = async (m) => {

  const interval = nextInterval(m)
  const all = await getActiveReps()

  return filterReps(all, interval)

}
