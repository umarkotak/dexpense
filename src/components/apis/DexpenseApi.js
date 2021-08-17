class DexpenseApi {
  constructor() {
    if (window.location.protocol === "https:") {
      this.DexpenseApiHost = "https://dexpense-api.herokuapp.com"
    } else {
      this.DexpenseApiHost = "http://localhost:4000"
    }
  }

  async AccountRegister(params) {
    var uri = `${this.DexpenseApiHost}/api/v1/accounts/register`
    const response = await fetch(uri, {
      method: 'POST',
      headers: {
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
        'Content-Type': 'application/json',
        'Authorization': token
      },
      body: JSON.stringify(params)
    })
    return response
  }
}

const dexpenseApi = new DexpenseApi()

export default dexpenseApi
