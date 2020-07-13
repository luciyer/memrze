require("dotenv").config()

exports.stayAwake = () => {

  const url = process.env.SERVER_URL

  try {
    fetch(url).then(() =>
      console.log(`Awake: Fetching ${url}.`)
    )
  } catch (error) {
    console.log(`Error fetching ${url}: ${error.message}.`)
  }
  
}
