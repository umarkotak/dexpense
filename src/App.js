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
import PageTransactions from "./components/pages/PageTransactions"
import PageTransactionsCreate from "./components/pages/PageTransactionsCreate"
import PageTransactionsCompact from "./components/pages/PageTransactionsCompact"
import PageTransactionsEdit from "./components/pages/PageTransactionsEdit"
import PageGroups from "./components/pages/PageGroups"
import PageGroupsDetail from "./components/pages/PageGroupsDetail"
import PageGroupsCreate from "./components/pages/PageGroupsCreate"
import PageGroupWalletsCreate from "./components/pages/PageGroupWalletsCreate"
import PageNotFound from "./components/pages/PageNotFound"
import PageStatistics from "./components/pages/PageStatistics"
import PageGroupWalletsEdit from "./components/pages/PageGroupWalletsEdit"
import PageGroupsMemberInvite from "./components/pages/PageGroupsMemberInvite"

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
          <AlertProvider template={AlertTemplate} {...options}>
            <Navbar />

            <Sidebar />

            <Switch>
              <Route path="/" exact component={PageHome} />
              <Route path="/home" exact component={PageHome} />
              <Route path="/login" exact component={PageLogin} />
              <Route path="/sign_up" exact component={PageSignUp} />
              <Route path="/dashboard" exact component={PageDashboard} />
              <Route path="/transactions" exact component={PageTransactionsCompact} />
              <Route path="/transactions/detailed" exact component={PageTransactions} />
              <Route path="/transactions/create" exact component={PageTransactionsCreate} />
              <Route path="/transactions/:id/edit" exact component={PageTransactionsEdit} />
              <Route path="/groups" exact component={PageGroups} />
              <Route path="/groups/create" exact component={PageGroupsCreate} />
              <Route path="/groups/:id" exact component={PageGroupsDetail} />
              <Route path="/groups/:id/wallets/create" exact component={PageGroupWalletsCreate} />
              <Route path="/groups/:id/wallets/:wallet_id/edit" exact component={PageGroupWalletsEdit} />
              <Route path="/groups/:id/members/invite" exact component={PageGroupsMemberInvite} />
              <Route path="/statistics" exact component={PageStatistics} />
              <Route path="/" component={PageNotFound} />
            </Switch>

            <Footer />
          </AlertProvider>
        </div>
      </div>
    </Router>
  )
}

export default App;
