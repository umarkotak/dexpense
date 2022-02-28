const GLOBAL = {
  "TRANSACTION_CATEGORY_ALL_OPTS": [
    {name:"category", value: "food", label: "Makanan" },
    {name:"category", value: "daily_needs", label: "Kebutuhan Harian" },
    {name:"category", value: "social_life", label: "Sosial"},
    {name:"category", value: "self_development", label: "Pengembangan Diri"},
    {name:"category", value: "transportation", label: "Transportasi"},
    {name:"category", value: "household", label: "Kebutuhan Rumah"},
    {name:"category", value: "apparel", label: "Pakaian"},
    {name:"category", value: "beauty", label: "Kecantikan"},
    {name:"category", value: "health", label: "Kesehatan"},
    {name:"category", value: "education", label: "Pendidikan"},
    {name:"category", value: "gift", label: "Hadiah"},
    {name:"category", value: "infaq", label: "Infaq"},
    {name:"category", value: "admin_fee", label: "Biaya Admin"},
    {name:"category", value: "debt", label: "Hutang"},
    {name:"category", value: "toys", label: "Mainan"},
    {name:"category", value: "investation", label: "Investasi"},
    {name:"category", value: "fee", label: "Biaya Tambahan"},

    {name:"category", value: "allowance", label: "Uang Jajan"},
    {name:"category", value: "salary", label: "Gaji"},
    {name:"category", value: "petty_cash", label: "Uang Kaget"},
    {name:"category", value: "bonus", label: "Bonus"},

    {name:"category", value: "transfer", label: "Transfer"},
    {name:"category", value: "adjustment", label: "Adjusment"},
    {name:"category", value: "other", label: "Lainnya"}
  ],
  "TRANSACTION_DIRECTION_OPTS": [
    { name: 'direction_type', value: 'outcome', label: 'Pengeluaran' },
    { name: 'direction_type', value: 'income', label: 'Pemasukan' }
  ],
  "WALLET_TYPE_OPTS": [
    { name: 'wallet_type', value: 'cash', label: 'Cash' },
    { name: 'wallet_type', value: 'bank', label: 'Bank' },
    { name: 'wallet_type', value: 'ewallet', label: 'E Wallet' },
    { name: 'wallet_type', value: 'credit_card', label: 'Kartu Kredit' },
    { name: 'wallet_type', value: 'other', label: 'Lainnya' }
  ]
}
const GLOBAL_FILTER = {
  "TRANSACTION_DIRECTION_FILTER_OPTS": [
    { name: 'direction_type', value: 'all', label: 'All' },
  ].concat(GLOBAL["TRANSACTION_DIRECTION_OPTS"]),
  "TRANSACTION_CATEGORY_ALL_FILTER_OPTS": [
    { name: 'category', value: 'all', label: 'All' },
  ].concat(GLOBAL["TRANSACTION_CATEGORY_ALL_OPTS"])
}

class Utils {
  constructor() {
    this.months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    this.days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  }

  FormatDateTime(timeString) {
    var jsTime = new Date(timeString)
    return `${jsTime.getFullYear()} ${this.months[jsTime.getMonth()]} ${jsTime.getDate()} - ${jsTime.getHours()}:${jsTime.getMinutes()}`
  }

  FormatDateInput(timeObj) {
    return `${timeObj.getFullYear()}-${timeObj.getMonth()+1}-${timeObj.getDate()}T${timeObj.getHours()}:${timeObj.getMinutes()}`
  }

  FormatNumber(number) {
    var formatter = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR'
    })
    return formatter.format(number).replace(/(\.|,)00$/g, '')
  }

  ConvertLocalTimeToUTC(localTimeString) {
    var localTime = new Date()
    if (localTimeString && localTimeString !== "") { localTime = new Date(localTimeString) }

    var localTimeUTC = new Date(
      localTime.getUTCFullYear(),
      localTime.getUTCMonth(),
      localTime.getUTCDate(),
      localTime.getUTCHours(),
      localTime.getUTCMinutes(),
      localTime.getUTCSeconds()
    )
    return localTimeUTC
  }

  Global() { return GLOBAL }

  GlobalFilter() { return GLOBAL_FILTER }

  GetOptsIndexByValue(optsSource, value) {
    var selectedIdx
    GLOBAL[optsSource].forEach((val, index) => {
      if (val.value === value) {
        selectedIdx = index
        return
      }
    })
    return selectedIdx
  }

  GetArrIndexByValue(arr, field, value) {
    var selectedIdx
    arr.forEach((val, index) => {
      if (val[field] === value) {
        selectedIdx = index
        return
      }
    })
    return selectedIdx
  }

  CompactNumber(number) {
    var newNumber
    var suffix
    if (number < 1000) {
      newNumber = number
      suffix = ""
    } else if (number < 1000000) {
      newNumber = number / 1000
      suffix = "Rb"
    } else if (number < 1000000000) {
      newNumber = number / 1000000
      suffix = "Jt"
    }

    return `${newNumber.toFixed(1)} ${suffix}`
  }
}

const utils = new Utils()

export default utils
