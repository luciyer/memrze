const scheduler = require("../src/card/timing")

const stages = [5, 4, 3, 2, 1, 0]

const dates = stages.map(d => {
  return scheduler.next(d, new Date().toISOString())
})

const test_dates = stages.map(d => {
  return scheduler.test(d, new Date().toISOString())
})

console.log("Ebbing:", dates)
console.log("Test:", test_dates)
