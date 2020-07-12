const fetch = require("node-fetch")
const schedule = require("node-schedule")

const upcoming = require("./reps")
const twitter = require(appRoot + "/src/tweet")

const one = "* * * * *"
const ten = "*/10 * * * *"
const twenty = "*/20 * * * *"

exports.stayAwake = (url) => {

  return schedule.scheduleJob(twenty, () => {

    try {
      fetch(url).then(() =>
        console.log(`Awake: Fetching ${url}.`)
      )
    } catch (error) {
      console.log(`Error fetching ${url}: ${error.message}.`)
      console.log(`Running again in 20 minutes.`)
    }

  })

}

exports.pollDatabase = (every_n) => {

  const cron_string = `*/${every_n} * * * *`;

  return schedule.scheduleJob(cron_string, () => {

    console.log("Polling Database.")

    upcoming.getNextReps(every_n)
      .then(rep_array => {

        rep_array.forEach(r => {

          twitter.newThread(
            r.user,
            twitter.message.prompt_message(r.count, r.prompt)
          )

        })

      })

  })

}
