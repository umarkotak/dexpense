import React, {useState} from "react"
import {useHistory} from "react-router-dom"
import { useAlert } from 'react-alert'

import dexpenseApi from "../apis/DexpenseApi"

function PageSignUp() {
  const alert = useAlert()
  const history = useHistory()

  const [signUpParams, setSignUpParams] = useState({
    "username": "",
    "email": "",
    "password": "",
    "password_confirmation": ""
  })
  function handleSignUpParamsChanges(e) {
    const { name, value } = e.target
    setSignUpParams(signUpParams => ({...signUpParams, [name]: value}))
  }

  async function submitSignUp() {
    try {
      const response = await dexpenseApi.AccountRegister(signUpParams)
      const status = response.status
      const body = await response.json()

      if (status == 200) {
        alert.info("Sign up success!")
        history.push("/login")
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
              <div className="col-sm-6">
                <h1>Sign Up</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item active"><a href="">sign up</a></li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        <section className="content">
          <div className="card card-outline card-primary">
            <div className="card-header text-center">
              <a href="" className="h1"><b>DEX</b>PENSE</a>
            </div>

            <div className="card-body">
              <p className="login-box-msg">Register a new membership</p>

              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Username"
                  name="username"
                  value={signUpParams.username}
                  onChange={e => handleSignUpParamsChanges(e)}
                />
                <div className="input-group-append"><div className="input-group-text"><span className="fas fa-user"></span></div></div>
              </div>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Email"
                  name="email"
                  value={signUpParams.email}
                  onChange={e => handleSignUpParamsChanges(e)}
                />
                <div className="input-group-append"><div className="input-group-text"><span className="fas fa-envelope"></span></div></div>
              </div>
              <div className="input-group mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  name="password"
                  value={signUpParams.password}
                  onChange={e => handleSignUpParamsChanges(e)}
                />
                <div className="input-group-append"><div className="input-group-text"><span className="fas fa-lock"></span></div></div>
              </div>
              <div className="input-group mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password Confirmation"
                  name="password_confirmation"
                  value={signUpParams.password_confirmation}
                  onChange={e => handleSignUpParamsChanges(e)}
                />
                <div className="input-group-append"><div className="input-group-text"><span className="fas fa-lock"></span></div></div>
              </div>
              <button className="btn btn-block btn-primary" onClick={() => submitSignUp()}>
                <i className="fas fa-check mr-2"></i> Sign Up!
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default PageSignUp
