require("dotenv").config()
const fetch = require("node-fetch")

module.exports = () => {

  const url = process.env.SERVER_URL

  try {
    fetch(url).then(() =>
      console.log(`Awake: Fetching ${url}.`)
    )
  } catch (error) {
    console.log(`Error fetching ${url}: ${error.message}.`)
  }

}
