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

  async TransactionsDelete(token, params) {
    var uri = `${this.DexpenseApiHost}/api/v1/transactions/${params.id}`
    const response = await fetch(uri, {
      method: 'DELETE',
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

  async GroupsIndex(token) {
    var uri = `${this.DexpenseApiHost}/api/v1/groups`
    const response = await fetch(uri, {
      method: 'GET',
      headers: {
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
        'Content-Type': 'application/json',
        'Authorization': token
      },
    })
    return response
  }
}

const dexpenseApi = new DexpenseApi()

export default dexpenseApi
