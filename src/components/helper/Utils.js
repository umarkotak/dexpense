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

  Global() {
    return {
      "TRANSACTION_CATEGORY_ALL_OPTS": [
        { name: 'category', value: 'food', label: 'Food' },
        { name: 'category', value: 'daily_needs', label: 'Daily Needs' },
        { name: 'category', value: 'other', label: 'Other' }
      ],
      "TRANSACTION_DIRECTION_OPTS": [
        { name: 'direction_type', value: 'income', label: 'Pemasukan' },
        { name: 'direction_type', value: 'outcome', label: 'Pengeluaran' }
      ],
      "WALLET_TYPE_OPTS": [
        { name: 'wallet_type', value: 'cash', label: 'Cash' }
      ]
    }
  }
}

const utils = new Utils()

export default utils
