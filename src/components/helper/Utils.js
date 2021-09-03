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
        { name: 'category', value: 'food', label: 'Makanan' },
        { name: 'category', value: 'daily_needs', label: 'Kebutuhan Harian' },

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

        {name:"category", value: "allowance", label: "Uang Jajan"},
        {name:"category", value: "salary", label: "Gaji"},
        {name:"category", value: "petty_cash", label: "Uang Kaget"},
        {name:"category", value: "bonus", label: "Bonus"},
        
        { name: 'category', value: 'other', label: 'Lainnya' }
      ],
      "TRANSACTION_DIRECTION_OPTS": [
        { name: 'direction_type', value: 'income', label: 'Pemasukan' },
        { name: 'direction_type', value: 'outcome', label: 'Pengeluaran' }
      ],
      "WALLET_TYPE_OPTS": [
        { name: 'wallet_type', value: 'cash', label: 'Cash' },
        { name: 'wallet_type', value: 'bank', label: 'Bank' },
        { name: 'wallet_type', value: 'ewallet', label: 'E Wallet' },
        { name: 'wallet_type', value: 'credit_card', label: 'Kartu Kredit' },
        { name: 'wallet_type', value: 'other', label: 'Lainnya' }
      ]
    }
  }
}

const utils = new Utils()

export default utils
