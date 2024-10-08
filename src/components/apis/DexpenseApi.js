class DexpenseApi {
  constructor() {
    if (window.location.protocol === "https:") {
      this.DexpenseApiHost = "https://bukukaskita-api.shadow-animapu-2.site"
      this.DexpenseUtilsApiHost = "https://bukukaskita-utils-api.shadow-animapu-2.site"
    } else {
      this.DexpenseApiHost = "https://bukukaskita-api.shadow-animapu-2.site"
      // this.DexpenseUtilsApiHost = ""
      this.DexpenseApiHost = "http://localhost:4000"
      this.DexpenseUtilsApiHost = "http://localhost:26000"
    }
  }

  async AccountRegister(params) {
    var uri = `${this.DexpenseApiHost}/api/v1/accounts/register`
    const response = await fetch(uri, {
      method: 'POST',
      headers: {
        'Time-Zone': -new Date().getTimezoneOffset()/60,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    })
    return response
  }

  async AccountLogin(params) {
    var uri = `${this.DexpenseApiHost}/api/v1/accounts/login`
    const response = await fetch(uri, {
      method: 'POST',
      headers: {
        'Time-Zone': -new Date().getTimezoneOffset()/60,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    })
    return response
  }

  async AccountProfile(token, params) {
    var uri = `${this.DexpenseApiHost}/api/v1/accounts/profile`
    const response = await fetch(uri, {
      method: 'GET',
      headers: {
        'Time-Zone': -new Date().getTimezoneOffset()/60,
        'Content-Type': 'application/json',
        'Authorization': token
      }
    })
    return response
  }

  async TransactionsCreate(token, params) {
    var uri = `${this.DexpenseApiHost}/api/v1/transactions`
    const response = await fetch(uri, {
      method: 'POST',
      headers: {
        'Time-Zone': -new Date().getTimezoneOffset()/60,
        'Content-Type': 'application/json',
        'Authorization': token
      },
      body: JSON.stringify(params)
    })
    return response
  }

  async TransactionsTransfer(token, params) {
    var uri = `${this.DexpenseApiHost}/api/v1/transactions/transfer`
    const response = await fetch(uri, {
      method: 'POST',
      headers: {
        'Time-Zone': -new Date().getTimezoneOffset()/60,
        'Content-Type': 'application/json',
        'Authorization': token
      },
      body: JSON.stringify(params)
    })
    return response
  }

  async TransactionsAdjust(token, params) {
    var uri = `${this.DexpenseApiHost}/api/v1/transactions/adjust`
    const response = await fetch(uri, {
      method: 'POST',
      headers: {
        'Time-Zone': -new Date().getTimezoneOffset()/60,
        'Content-Type': 'application/json',
        'Authorization': token
      },
      body: JSON.stringify(params)
    })
    return response
  }

  async TransactionsList(token, params) {
    var uri = `${this.DexpenseApiHost}/api/v1/transactions?` + new URLSearchParams(params)
    const response = await fetch(uri, {
      method: 'GET',
      headers: {
        'Time-Zone': -new Date().getTimezoneOffset()/60,
        'Content-Type': 'application/json',
        'Authorization': token
      }
    })
    return response
  }

  async TransactionsListDaily(token, params) {
    var uri = `${this.DexpenseApiHost}/api/v1/transactions/daily?` + new URLSearchParams(params)
    const response = await fetch(uri, {
      method: 'GET',
      headers: {
        'Time-Zone': -new Date().getTimezoneOffset()/60,
        'Content-Type': 'application/json',
        'Authorization': token
      }
    })
    return response
  }

  async TransactionsListMonthly(token, params) {
    var uri = `${this.DexpenseApiHost}/api/v1/transactions/monthly?` + new URLSearchParams(params)
    const response = await fetch(uri, {
      method: 'GET',
      headers: {
        'Time-Zone': -new Date().getTimezoneOffset()/60,
        'Content-Type': 'application/json',
        'Authorization': token
      }
    })
    return response
  }

  async TransactionsDetail(token, params) {
    var uri = `${this.DexpenseApiHost}/api/v1/transactions/${params.id}`
    const response = await fetch(uri, {
      method: 'GET',
      headers: {
        'Time-Zone': -new Date().getTimezoneOffset()/60,
        'Content-Type': 'application/json',
        'Authorization': token
      }
    })
    return response
  }

  async TransactionsEdit(token, params) {
    var uri = `${this.DexpenseApiHost}/api/v1/transactions/${params.id}`
    const response = await fetch(uri, {
      method: 'PATCH',
      headers: {
        'Time-Zone': -new Date().getTimezoneOffset()/60,
        'Content-Type': 'application/json',
        'Authorization': token
      },
      body: JSON.stringify(params)
    })
    return response
  }

  async TransactionsDelete(token, params) {
    var uri = `${this.DexpenseApiHost}/api/v1/transactions/${params.id}`
    const response = await fetch(uri, {
      method: 'DELETE',
      headers: {
        'Time-Zone': -new Date().getTimezoneOffset()/60,
        'Content-Type': 'application/json',
        'Authorization': token
      }
    })
    return response
  }

  async TransactionsSummary(token, params) {
    var uri = `${this.DexpenseApiHost}/api/v1/transactions/summary?` + new URLSearchParams(params)
    const response = await fetch(uri, {
      method: 'GET',
      headers: {
        'Time-Zone': -new Date().getTimezoneOffset()/60,
        'Content-Type': 'application/json',
        'Authorization': token
      }
    })
    return response
  }

  async GroupsShow(token, params) {
    var uri = `${this.DexpenseApiHost}/api/v1/groups/${params.id}`
    const response = await fetch(uri, {
      method: 'GET',
      headers: {
        'Time-Zone': -new Date().getTimezoneOffset()/60,
        'Content-Type': 'application/json',
        'Authorization': token
      }
    })
    return response
  }

  async GroupsCreate(token, params) {
    var uri = `${this.DexpenseApiHost}/api/v1/groups`
    const response = await fetch(uri, {
      method: 'POST',
      headers: {
        'Time-Zone': -new Date().getTimezoneOffset()/60,
        'Content-Type': 'application/json',
        'Authorization': token
      },
      body: JSON.stringify(params)
    })
    return response
  }

  async GroupsIndex(token) {
    var uri = `${this.DexpenseApiHost}/api/v1/groups`
    const response = await fetch(uri, {
      method: 'GET',
      headers: {
        'Time-Zone': -new Date().getTimezoneOffset()/60,
        'Content-Type': 'application/json',
        'Authorization': token
      }
    })
    return response
  }

  async GroupsEdit(token, params) {
    var uri = `${this.DexpenseApiHost}/api/v1/groups/${params.id}`
    const response = await fetch(uri, {
      method: 'PATCH',
      headers: {
        'Time-Zone': -new Date().getTimezoneOffset()/60,
        'Content-Type': 'application/json',
        'Authorization': token
      },
      body: JSON.stringify(params)
    })
    return response
  }

  async GroupsAddSallaryInfo(token, params) {
    var uri = `${this.DexpenseApiHost}/api/v1/groups/${params.id}/sallary_info`
    const response = await fetch(uri, {
      method: 'POST',
      headers: {
        'Time-Zone': -new Date().getTimezoneOffset()/60,
        'Content-Type': 'application/json',
        'Authorization': token
      },
      body: JSON.stringify(params)
    })
    return response
  }

  async GroupsDelete(token, params) {
    var uri = `${this.DexpenseApiHost}/api/v1/groups/${params.id}`
    const response = await fetch(uri, {
      method: 'DELETE',
      headers: {
        'Time-Zone': -new Date().getTimezoneOffset()/60,
        'Content-Type': 'application/json',
        'Authorization': token
      }
    })
    return response
  }

  async GroupsMemberInvite(token, params) {
    var uri = `${this.DexpenseApiHost}/api/v1/groups/${params.id}/invite`
    const response = await fetch(uri, {
      method: 'POST',
      headers: {
        'Time-Zone': -new Date().getTimezoneOffset()/60,
        'Content-Type': 'application/json',
        'Authorization': token
      },
      body: JSON.stringify(params)
    })
    return response
  }

  async GroupsMemberRemove(token, params) {
    var uri = `${this.DexpenseApiHost}/api/v1/groups/${params.id}/remove`
    const response = await fetch(uri, {
      method: 'POST',
      headers: {
        'Time-Zone': -new Date().getTimezoneOffset()/60,
        'Content-Type': 'application/json',
        'Authorization': token
      },
      body: JSON.stringify(params)
    })
    return response
  }

  async GroupWalletsCreate(token, params) {
    var uri = `${this.DexpenseApiHost}/api/v1/group_wallets`
    const response = await fetch(uri, {
      method: 'POST',
      headers: {
        'Time-Zone': -new Date().getTimezoneOffset()/60,
        'Content-Type': 'application/json',
        'Authorization': token
      },
      body: JSON.stringify(params)
    })
    return response
  }

  async GroupWalletsEdit(token, params) {
    var uri = `${this.DexpenseApiHost}/api/v1/group_wallets/${params.id}`
    const response = await fetch(uri, {
      method: 'PATCH',
      headers: {
        'Time-Zone': -new Date().getTimezoneOffset()/60,
        'Content-Type': 'application/json',
        'Authorization': token
      },
      body: JSON.stringify(params)
    })
    return response
  }

  async GroupWalletsDelete(token, params) {
    var uri = `${this.DexpenseApiHost}/api/v1/group_wallets/${params.id}`
    const response = await fetch(uri, {
      method: 'DELETE',
      headers: {
        'Time-Zone': -new Date().getTimezoneOffset()/60,
        'Content-Type': 'application/json',
        'Authorization': token
      },
    })
    return response
  }

  async StatisticsTransactionsDaily(token, params) {
    var uri = new URL(`${this.DexpenseApiHost}/api/v1/statistics/transactions/daily`)
    uri.search = new URLSearchParams(params).toString()
    const response = await fetch(uri, {
      method: 'GET',
      headers: {
        'Time-Zone': -new Date().getTimezoneOffset()/60,
        'Content-Type': 'application/json',
        'Authorization': token
      },
    })
    return response
  }

  async StatisticsTransactionsPerCategory(token, params) {
    var uri = new URL(`${this.DexpenseApiHost}/api/v1/statistics/transactions/per_category`)
    uri.search = new URLSearchParams(params).toString()
    const response = await fetch(uri, {
      method: 'GET',
      headers: {
        'Time-Zone': -new Date().getTimezoneOffset()/60,
        'Content-Type': 'application/json',
        'Authorization': token
      },
    })
    return response
  }

  async StatisticsTransactionsDashboard(token, params) {
    var uri = new URL(`${this.DexpenseApiHost}/api/v1/statistics/transactions/dashboard`)
    uri.search = new URLSearchParams(params).toString()
    const response = await fetch(uri, {
      method: 'GET',
      headers: {
        'Time-Zone': -new Date().getTimezoneOffset()/60,
        'Content-Type': 'application/json',
        'Authorization': token
      },
    })
    return response
  }

  async StatisticsWhealthDaily(token, params) {
    var uri = new URL(`${this.DexpenseApiHost}/api/v1/statistics/whealth/daily`)
    uri.search = new URLSearchParams(params).toString()
    const response = await fetch(uri, {
      method: 'GET',
      headers: {
        'Time-Zone': -new Date().getTimezoneOffset()/60,
        'Content-Type': 'application/json',
        'Authorization': token
      },
    })
    return response
  }

  async TransactionsDownload(token, params) {
    var uri = new URL(`${this.DexpenseApiHost}/api/v1/transactions/download`)
    uri.search = new URLSearchParams(params).toString()
    const response = await fetch(uri, {
      method: 'GET',
      headers: {
        'Time-Zone': -new Date().getTimezoneOffset()/60,
        'Content-Type': 'application/json',
        'Authorization': token
      },
    })
    return response
  }

  async MonthlyBudgetIndex(token, params) {
    var uri = new URL(`${this.DexpenseApiHost}/api/v1/monthly_budgets`)
    uri.search = new URLSearchParams(params).toString()
    const response = await fetch(uri, {
      method: 'GET',
      headers: {
        'Time-Zone': -new Date().getTimezoneOffset()/60,
        'Content-Type': 'application/json',
        'Authorization': token
      },
    })
    return response
  }

  async MonthlyBudgetIndexCurrent(token, params) {
    var uri = new URL(`${this.DexpenseApiHost}/api/v1/monthly_budgets/current`)
    uri.search = new URLSearchParams(params).toString()
    const response = await fetch(uri, {
      method: 'GET',
      headers: {
        'Time-Zone': -new Date().getTimezoneOffset()/60,
        'Content-Type': 'application/json',
        'Authorization': token
      },
    })
    return response
  }

  async MonthlyBudgetShow(token, params) {
    var uri = new URL(`${this.DexpenseApiHost}/api/v1/monthly_budgets/${params.id}`)
    uri.search = new URLSearchParams(params).toString()
    const response = await fetch(uri, {
      method: 'GET',
      headers: {
        'Time-Zone': -new Date().getTimezoneOffset()/60,
        'Content-Type': 'application/json',
        'Authorization': token
      },
    })
    return response
  }

  async MonthlyBudgetCreate(token, params) {
    var uri = new URL(`${this.DexpenseApiHost}/api/v1/monthly_budgets`)
    uri.search = new URLSearchParams(params).toString()
    const response = await fetch(uri, {
      method: 'POST',
      headers: {
        'Time-Zone': -new Date().getTimezoneOffset()/60,
        'Content-Type': 'application/json',
        'Authorization': token
      },
      body: JSON.stringify(params)
    })
    return response
  }

  async MonthlyBudgetEdit(token, params) {
    var uri = new URL(`${this.DexpenseApiHost}/api/v1/monthly_budgets/${params.id}`)
    // uri.search = new URLSearchParams(params).toString()
    const response = await fetch(uri, {
      method: 'PATCH',
      headers: {
        'Time-Zone': -new Date().getTimezoneOffset()/60,
        'Content-Type': 'application/json',
        'Authorization': token
      },
      body: JSON.stringify(params)
    })
    return response
  }

  async MonthlyBudgetDelete(token, params) {
    var uri = new URL(`${this.DexpenseApiHost}/api/v1/monthly_budgets/${params.id}`)
    uri.search = new URLSearchParams(params).toString()
    const response = await fetch(uri, {
      method: 'DELETE',
      headers: {
        'Time-Zone': -new Date().getTimezoneOffset()/60,
        'Content-Type': 'application/json',
        'Authorization': token
      },
    })
    return response
  }

  async CategoriesIndexStatic(token, params) {
    var uri = new URL(`${this.DexpenseApiHost}/api/v1/categories/index/static`)
    uri.search = new URLSearchParams(params).toString()
    const response = await fetch(uri, {
      method: 'GET',
      headers: {
        'Time-Zone': -new Date().getTimezoneOffset()/60,
        'Content-Type': 'application/json',
        'Authorization': token
      },
    })
    return response
  }

  async HfGoldGoldPrices(token, params) {
    var uri = new URL(`${this.DexpenseApiHost}/api/v1/hfgolds/gold/prices`)
    uri.search = new URLSearchParams(params).toString()
    const response = await fetch(uri, {
      method: 'GET',
      headers: {
        'Time-Zone': -new Date().getTimezoneOffset()/60,
        'Content-Type': 'application/json',
      },
    })
    return response
  }

  async AntamGoldPrices(token, params) {
    var uri = new URL(`${this.DexpenseApiHost}/api/v1/antam/gold/prices`)
    uri.search = new URLSearchParams(params).toString()
    const response = await fetch(uri, {
      method: 'GET',
      headers: {
        'Time-Zone': -new Date().getTimezoneOffset()/60,
        'Content-Type': 'application/json',
      },
    })
    return response
  }

  async AssetsCategoryList(token, params) {
    var uri = new URL(`${this.DexpenseApiHost}/api/v1/wealth_assets/categories`)
    uri.search = new URLSearchParams(params).toString()
    const response = await fetch(uri, {
      method: 'GET',
      headers: {
        'Time-Zone': -new Date().getTimezoneOffset()/60,
        'Content-Type': 'application/json',
      },
    })
    return response
  }

  async AssetsList(token, params) {
    var uri = new URL(`${this.DexpenseApiHost}/api/v1/wealth_assets`)
    uri.search = new URLSearchParams(params).toString()
    const response = await fetch(uri, {
      method: 'GET',
      headers: {
        'Time-Zone': -new Date().getTimezoneOffset()/60,
        'Content-Type': 'application/json',
        'Authorization': token
      },
    })
    return response
  }

  async AssetsDashboard(token, params) {
    var uri = new URL(`${this.DexpenseApiHost}/api/v1/wealth_assets/dashboard`)
    uri.search = new URLSearchParams(params).toString()
    const response = await fetch(uri, {
      method: 'GET',
      headers: {
        'Time-Zone': -new Date().getTimezoneOffset()/60,
        'Content-Type': 'application/json',
        'Authorization': token
      },
    })
    return response
  }

  async AssetsGroupped(token, params) {
    var uri = new URL(`${this.DexpenseApiHost}/api/v1/wealth_assets/groupped`)
    uri.search = new URLSearchParams(params).toString()
    const response = await fetch(uri, {
      method: 'GET',
      headers: {
        'Time-Zone': -new Date().getTimezoneOffset()/60,
        'Content-Type': 'application/json',
        'Authorization': token
      },
    })
    return response
  }

  async AssetsCreate(token, params) {
    var uri = new URL(`${this.DexpenseApiHost}/api/v1/wealth_assets`)
    uri.search = new URLSearchParams(params).toString()
    const response = await fetch(uri, {
      method: 'POST',
      headers: {
        'Time-Zone': -new Date().getTimezoneOffset()/60,
        'Content-Type': 'application/json',
        'Authorization': token
      },
      body: JSON.stringify(params)
    })
    return response
  }

  async AssetsDelete(token, params) {
    var uri = new URL(`${this.DexpenseApiHost}/api/v1/wealth_assets/${params.id}`)
    uri.search = new URLSearchParams(params).toString()
    const response = await fetch(uri, {
      method: 'DELETE',
      headers: {
        'Time-Zone': -new Date().getTimezoneOffset()/60,
        'Content-Type': 'application/json',
        'Authorization': token
      },
      body: JSON.stringify(params)
    })
    return response
  }

  async ExtractReceiptData(formData) {
    var uri = new URL(`${this.DexpenseUtilsApiHost}/genai/receipt/extract`)
    const response = await fetch(uri, {
      method: 'POST',
      headers: {
        'X-Quick-Client-ID': 'quick-auth-client-id',
        'X-Quick-Client-Secret': 'quick-auth-client-secret',
      },
      body: formData,
    })
    return response
  }
}

const dexpenseApi = new DexpenseApi()

export default dexpenseApi
