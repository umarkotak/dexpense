class DexpenseApi {
  constructor() {
    this.DexpenseApiHost = "http://localhost:4000"
  }

  async AccountRegister(params) {
    try {
      var uri = `${this.DexpenseApiHost}/api/v1/accounts/register`
      const response = await fetch(uri, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params)
      })
      return response

    } catch (e) {
      alert(e.message);
    }
  }
}

const dexpenseApi = new DexpenseApi()

export default dexpenseApi
