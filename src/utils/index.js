const fetch = require("node-fetch")

const serverUp = () => {
  console.log("Server running.")
}

const stayAwake = (url, interval = 25) => {

    const milliseconds = interval * 60000;

    setTimeout(() => {

      try {
        fetch(url).then(() =>
          console.log(`Awake: Fetching ${url}.`)
        )
      } catch (error) {
        console.log(`Error fetching ${url}: ${error.message}.`)
        console.log(`Running again in ${interval} minutes.`)
      } finally {
        stayAwake(url, interval)
      }

    }, milliseconds);

}

const handleError = (res, code, message) => {
  console.log("ERROR: " + message);
  res.status(code || 500).json({"error": message})
}

module.exports = {
  serverUp,
  stayAwake,
  handleError
}
