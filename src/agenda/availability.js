exports.Availability = class {

  constructor (availability_object) {
    if (availability_object)
      this.availability = availability_object;
    else
      this.availability = { "Weekday" : [9, 20], "Weekend" : [10, 23] }
  }

  hourInRange (h, arr) { return h >= arr[0] && h < arr[1]; }
  weekPart (d) { return ![0, 6].includes(d) ? "Weekday" : "Weekend"; }

  nextAvailable (date) {

    const date_day = date.getDay(),
          date_hour = date.getHours();

    let hour_array = this.availability[this.weekPart(date_day)],
        next_day = date_hour >= hour_array[1];

    if (!this.hourInRange(date_hour, hour_array)) {

      let alert_date = new Date(date)

      if (next_day) {
        alert_date.setDate(alert_date.getDate() + 1)
        hour_array = this.availability[this.weekPart(alert_date.getDay())]
      }

      alert_date.setHours(hour_array[0])
      alert_date.setMinutes(5)
      alert_date.setSeconds(0)
      alert_date.setMilliseconds(0)

      return alert_date

    }

    return date

  }

}
