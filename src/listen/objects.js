const config = require(appRoot + "/config")

exports.IncomingTweet = class {

  constructor (tweet_json) {

    this.id = tweet_json.id_str
    this.thread_id = tweet_json.in_reply_to_status_id_str || null
    this.text = tweet_json.text
    this.user_id = tweet_json.user.id_str
    this.user_handle = tweet_json.user.screen_name
    this.created_date = tweet_json.created_at

  }

  get is_bot_tweet () {
    return this.user_handle === config.bot_handle
  }

  get is_card () {
    return this.thread_id === null && !this.is_bot_tweet
  }

  get is_reply () {
    return this.thread_id !== null && !this.is_bot_tweet
  }

  get answer () {
    let re = new RegExp('@([a-zA-Z0-9\_\.]+)', 'gim'),
        clean_text = this.text.replace(re, "");
    return clean_text.toLowerCase().trim()
  }

  get card_content () {

    let re = new RegExp('@([a-zA-Z0-9\_\.]+)', 'gim'),
        clean_text = this.text.replace(re, ""),
        content = clean_text.split("|").map(t => t.trim());

        //do better content handling!

    return this.is_card
      ? { front: content[0], back: content[1] }
      : null;

  }

  get has_command () {

    if (this.text.includes("!help"))
      return "__help__"

    else if (this.text.includes("!stats"))
      return "__stats__"

    else if (this.text.includes("!answer"))
      return "__answer__"

    else if (this.text.includes("!forgot"))
      return "__forgot__"

    else if (this.text.includes("!archive"))
      return "__archive__"

    else
      return null

  }

  writeToConsole () {
    let action = this.is_reply ? "replied" : "tweeted"
    console.log(`(${this.created_date})`, this.user_handle, action, `\"${this.text}\"`)
  }

}
