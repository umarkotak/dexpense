import React, {useState} from "react"
import {useHistory} from "react-router-dom"
import {useAlert} from 'react-alert'

import dexpenseApi from "../apis/DexpenseApi"

function PageLogin() {
  const alert = useAlert()
  const history = useHistory()

  const [signInParams, setSignInParams] = useState({
    "username": "",
    "email": "",
    "password": "",
    "password_confirmation": ""
  })
  function handleSignInParamsChanges(e) {
    const { name, value } = e.target
    setSignInParams(signInParams => ({...signInParams, [name]: value}))
  }

  async function submitSignIn() {
    try {
      const response = await dexpenseApi.AccountLogin(signInParams)
      const status = response.status
      const body = await response.json()

      if (status === 200) {
        alert.info("Login success!")
        localStorage.setItem("DEXPENSE_SESSION_TOKEN", body.data.session)
        localStorage.setItem("DEXPENSE_SESSION_USERNAME", body.data.username)
        history.push("/home")
      } else {
        alert.error(`There is some error: ${body.error}`)
      }
    } catch (e) {
      alert.error(`There is some error: ${e.message}`)
    }
  }

  return (
    <div>
      <div className="content-wrapper">
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              {/* <div className="col-sm-6">
                <h1>Login</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item active"><Link to="/login">Login</Link></li>
                </ol>
              </div> */}
            </div>
          </div>
        </div>

        <section className="content">
          <div className="card card-outline card-primary mx-auto" style={{"maxWidth": "480px", "marginTop": "100px"}}>
            <div className="card-header text-center">
              <a href="/#" className="h1"><b>BUKUKAS</b>KITA</a>
            </div>

            <div className="card-body">
              <p className="login-box-msg">Login to your account</p>

              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Username"
                  name="username"
                  value={signInParams.username}
                  onChange={e => handleSignInParamsChanges(e)}
                />
                <div className="input-group-append"><div className="input-group-text"><span className="fas fa-user"></span></div></div>
              </div>
              <div className="input-group mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  name="password"
                  value={signInParams.password}
                  onChange={e => handleSignInParamsChanges(e)}
                />
                <div className="input-group-append"><div className="input-group-text"><span className="fas fa-lock"></span></div></div>
              </div>
              <button className="btn btn-block btn-primary" onClick={() => submitSignIn()}>
                <i className="fas fa-check mr-2"></i> Login!
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default PageLogin
