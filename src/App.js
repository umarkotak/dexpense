import React from "react"
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import { transitions, positions, Provider as AlertProvider } from 'react-alert'

import Navbar from "./components/Navbar"
import Sidebar from "./components/Sidebar"
import Footer from "./components/Footer"

import PageHome from "./components/pages/PageHome"
import PageLogin from "./components/pages/PageLogin"
import PageSignUp from "./components/pages/PageSignUp"
import PageDashboard from "./components/pages/PageDashboard"

const options = {
  position: positions.TOP_RIGHT,
  timeout: 5000,
  offset: '70px 10px 10px 10px',
  transition: transitions.FADE
}
const AlertTemplate = ({ style, options, message, close }) => (
  <div
    className={`toast ${options.type === 'info' || options.type === 'success' ? "bg-success" : "bg-maroon"} fade show`}
    style={style}
  >
    <div className="toast-header">
      <strong className="mr-auto">
        {options.type === 'info' && 'Info'}
        {options.type === 'success' && 'Success'}
        {options.type === 'error' && 'Error'}
      </strong>
      <small>notice</small>
      <button data-dismiss="toast" type="button" className="ml-2 mb-1 close" aria-label="Close" onClick={close}><span aria-hidden="true">×</span></button>
    </div>
    <div className="toast-body">
      {message}
    </div>
  </div>
)

function App() {
  return (
    <Router>
      <div className="dark-mode sidebar-mini">
        <div className="wrapper">
          <Navbar />

          <Sidebar />

          <AlertProvider template={AlertTemplate} {...options}>
            <Switch>
              <Route path="/" exact component={PageHome} />
              <Route path="/login" exact component={PageLogin} />
              <Route path="/sign_up" exact component={PageSignUp} />
              <Route path="/dashboard" exact component={PageDashboard} />
            </Switch>
          </AlertProvider>

          <Footer />
        </div>
      </div>
    </Router>
  )
}

export default App;
