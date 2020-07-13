const avail = require("./availability")
const Hours = new avail.Availability();

const RECALL = 0.9,
      HOURS = 24,
      STEPS = 6,
      MS_HOUR = 1000 * 60 * 60,
      LEN = 20;

const makeMap = (values) => {
  return new Map(Array(values.length).fill()
      .map((_, i) => i.toString()).reverse()
      .map((d, i) => [d, values[i]])
  )
}

const testTimer = (lvl, seed) => {

  const seed_date = new Date(seed)

  const ms = 10 * 1000,
        timing_map = new Map([
          ["5", 1],
          ["4", 2],
          ["3", 3],
          ["2", 5],
          ["1", 10],
          ["0", 15]
        ]);

  const offset = ms * timing_map.get(lvl.toString()),
        future_date = Date.parse(seed_date) + offset;

  return new Date(future_date)

}

const ebbingTimer = (lvl, seed) => {

  const seed_date = new Date(seed)

  let t = (s) => -s * Math.log(RECALL) * HOURS

  const hour_intervals =
    Array(STEPS).fill()
      .map((_, i) => i)
      .map(d => 1 + LEN * Math.sqrt(d))
      .map(t)

  const offset = MS_HOUR * makeMap(hour_intervals).get(lvl.toString()),
        future_date = Date.parse(seed_date) + offset;

  return Hours.nextAvailable(new Date(future_date))

}

module.exports = ebbingTimer
