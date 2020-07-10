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

const testTimer = (level, seed_date) => {

  let ms = 1000,
      timing_map = new Map([
        ["5", 5],
        ["4", 10],
        ["3", 20],
        ["2", 40],
        ["1", 60],
        ["0", 120]
      ]);

  return new Date(Date.parse(seed_date) + (ms * timing_map.get(level)))

}

const ebbingTimer = (level, seed_date) => {

  let t = (s) => -s * Math.log(RECALL) * HOURS

  let hour_intervals =
    Array(STEPS).fill()
      .map((_, i) => i)
      .map(d => 1 + LEN * Math.sqrt(d))
      .map(t);

  let hour_map = makeMap(hour_intervals)

  const raw_date =
    new Date(Date.parse(seed_date) + (MS_HOUR * hour_map.get(level)))

  return Hours.nextAvailable(raw_date)

}

module.exports = {
  next: ebbingTimer,
  test: testTimer
}
