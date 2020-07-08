const ping = require("ping")

const serverUp = () => {
  console.log("Server running.")
}

const stayAwake = (url, interval = 25) => {

    const milliseconds = interval * 60000;

    setTimeout(() => {

      try {
        ping.promise.probe(url)
          .then((res) => {
            console.log(`Pinged ${res.numeric_host}...`)
          })
      } catch (error) {
        console.log(`Error pinging ${url}: ${error.message}.`)
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
