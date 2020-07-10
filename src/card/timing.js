const avail = require("./availability")
const Hours = new avail.Availability();

const RECALL = 0.9,
      HOURS = 24,
      STEPS = 6,
      MS_HOUR = 1000 * 60 * 60,
      LEN = 20;

const formatInput = (lvl, dt) => {
  const level = lvl.toString(),
        date = new Date(dt);
  return { level, date }
}

const makeMap = (values) => {
  return new Map(Array(values.length).fill()
      .map((_, i) => i.toString()).reverse()
      .map((d, i) => [d, values[i]])
  )
}

const testTimer = (lvl, seed) => {

  const { level, seed_date } = formatInput(lvl, seed)

  const ms = 1000,
        timing_map = new Map([
          ["5", 5],
          ["4", 10],
          ["3", 20],
          ["2", 40],
          ["1", 60],
          ["0", 120]
        ]);

  const offset = ms * timing_map.get(level),
        future_date = Date.parse(seed_date) + offset;

  return new Date(future_date)

}

const ebbingTimer = (lvl, seed) => {

  const { level, seed_date } = formatInput(lvl, seed)

  let t = (s) => -s * Math.log(RECALL) * HOURS

  const hour_intervals =
    Array(STEPS).fill()
      .map((_, i) => i)
      .map(d => 1 + LEN * Math.sqrt(d))
      .map(t)

  const offset = MS_HOUR * makeMap(hour_intervals).get(level),
        future_date = Date.parse(seed_date) + offset;

  return Hours.nextAvailable(new Date(future_date))

}

module.exports = {
  next: ebbingTimer,
  test: testTimer
}
