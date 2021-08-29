class Utils {
  constructor() {
    this.months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    this.days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  }

  FormatDateTime(timeString) {
    var jsTime = new Date(timeString)
    return `${jsTime.getFullYear()} ${this.months[jsTime.getMonth()]} ${jsTime.getDate()} - ${jsTime.getHours()}:${jsTime.getMinutes()}`
  }

  FormatNumber(number) {
    var formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'IDR',
    })
    return formatter.format(number)
  }
}

const utils = new Utils()

export default utils
