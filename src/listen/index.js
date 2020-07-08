const token = require("./token")
const parser = require("./event")

exports.getHandler = (req, res) => {

  const crcToken = req.query.crc_token

  if (crcToken) {
    res.status(200).send({
      response_token: token.generate(crcToken)
    })
  } else {
    res.status(400).send({
      message: "Error: crc_token missing from request."
    })
  }

}

exports.postHandler = (req, res) => {

  console.log(req.body)

  res.sendStatus(200)

}
