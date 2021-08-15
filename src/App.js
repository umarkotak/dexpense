import React from "react"
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"

import Navbar from "./components/Navbar"
import Sidebar from "./components/Sidebar"
import Footer from "./components/Footer"

import PageHome from "./components/pages/PageHome"
import PageLogin from "./components/pages/PageLogin"
import PageSignUp from "./components/pages/PageSignUp"

import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'

const options = {
  position: positions.TOP_RIGHT,
  timeout: 5000,
  offset: '70px 10px 10px 10px',
  transition: transitions.FADE
}

function App() {
  return (
    <Router>
      <div className="dark-mode sidebar-mini layout-fixed layout-navbar-fixed layout-footer-fixed">
        <div className="wrapper">
          <Navbar />

          <Sidebar />
        
          <AlertProvider template={AlertTemplate} {...options}>
            <Switch>
              <Route path="/" exact component={PageHome} />
              <Route path="/login" exact component={PageLogin} />
              <Route path="/sign_up" exact component={PageSignUp} />
            </Switch>
          </AlertProvider>

          <Footer />
        </div>
      </div>
    </Router>
  )
}

export default App;
