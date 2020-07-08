require("dotenv").config()
const crypto = require("crypto")

exports.generate = (crcToken) => {

  const hmac = crypto
    .createHmac("sha256", process.env.TWITTER_CONSUMER_SECRET)
    .update(crcToken)
    .digest("base64");

  return `sha256=${hmac}`

}
