import React, { useEffect, useState } from "react"
import { Switch, Route, useLocation, withRouter} from "react-router-dom"
import { transitions, positions, Provider as AlertProvider } from 'react-alert'

import Navbar from "./components/Navbar"
import Sidebar from "./components/Sidebar"
import Footer from "./components/Footer"

import PageHome from "./components/pages/PageHome"
import PageLandingPage from "./components/pages/PageLandingPage"
import PageLogin from "./components/pages/PageLogin"
import PageSignUp from "./components/pages/PageSignUp"
import PageDashboard from "./components/pages/PageDashboard"
import PageTransactionsDetailed from "./components/pages/PageTransactionsDetailed"
import PageTransactionsDaily from "./components/pages/PageTransactionsDaily"
import PageTransactionsCalendar from "./components/pages/PageTransactionsCalendar"
import PageTransactionsWeekly from "./components/pages/PageTransactionsWeekly"
import PageTransactionsMonthly from "./components/pages/PageTransactionsMonthly"
import PageTransactionsTotal from "./components/pages/PageTransactionsTotal"
import PageTransactionsCreate from "./components/pages/PageTransactionsCreate"
import PageTransactionsCompact from "./components/pages/PageTransactionsCompact"
import PageTransactionsEdit from "./components/pages/PageTransactionsEdit"
import PageTransactionsTransfer from "./components/pages/PageTransactionsTransfer"
import PageTransactionsAdjust from "./components/pages/PageTransactionsAdjust"
import PageGroups from "./components/pages/PageGroups"
import PageGroupsDetail from "./components/pages/PageGroupsDetail"
import PageGroupsCreate from "./components/pages/PageGroupsCreate"
import PageGroupWalletsCreate from "./components/pages/PageGroupWalletsCreate"
import PageNotFound from "./components/pages/PageNotFound"
import PageStatistics from "./components/pages/PageStatistics"
import PageGroupWalletsEdit from "./components/pages/PageGroupWalletsEdit"
import PageGroupsMemberInvite from "./components/pages/PageGroupsMemberInvite"
import PageInvestation from "./components/pages/PageInvestation"
import PageDailyIbadah from "./components/pages/PageDailyIbadah"
import PageBudgetsIndex from "./components/pages/PageBudgetsIndex"
import PageBudgetsCreate from "./components/pages/PageBudgetsCreate"
import PageBudgetsEdit from "./components/pages/PageBudgetsEdit"
import PageWealthAsset from "./components/pages/PageWealthAsset"
import PageWealthAssetCreate from "./components/pages/PageWealthAssetCreate"
import PageCalculatorBudget from "./components/pages/PageCalculatorBudget"
import PageIconList from "./components/pages/PageIconList"
import PageGoldPrice from "./components/pages/PageGoldPrice"

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
  const reLoc = useLocation()
  const [showAdminLteTempl, setShowAdminLteTempl] = useState(false)

  useEffect(() => {
    if (reLoc.pathname === "/") {
      setShowAdminLteTempl(false)
    } else {
      setShowAdminLteTempl(true)
    }
    // eslint-disable-next-line
  }, [reLoc])

  return (
    // <BrowserRouter>
        <div className="sidebar-mini layout-fixed">
          <div className="wrapper">
            <AlertProvider template={AlertTemplate} {...options}>
              {showAdminLteTempl ? <Navbar /> : null}

              {showAdminLteTempl ? <Sidebar /> : null}

              <Switch>
                <Route exact path="/" component={withRouter(PageLandingPage)} />
                <Route exact path="/home" component={withRouter(PageHome)} />
                <Route exact path="/login" component={withRouter(PageLogin)} />
                <Route exact path="/sign_up" component={withRouter(PageSignUp)} />
                <Route exact path="/dashboard" component={withRouter(PageDashboard)} />
                <Route exact path="/transactions" component={withRouter(PageTransactionsCompact)} />
                <Route exact path="/transactions/detailed" component={withRouter(PageTransactionsDetailed)} />
                <Route exact path="/transactions/daily" component={withRouter(PageTransactionsDaily)} />
                <Route exact path="/transactions/create" component={withRouter(PageTransactionsCreate)} />
                <Route exact path="/transactions/calendar" component={withRouter(PageTransactionsCalendar)} />
                <Route exact path="/transactions/weekly" component={withRouter(PageTransactionsWeekly)} />
                <Route exact path="/transactions/monthly" component={withRouter(PageTransactionsMonthly)} />
                <Route exact path="/transactions/total" component={withRouter(PageTransactionsTotal)} />
                <Route exact path="/transactions/transfer" component={withRouter(PageTransactionsTransfer)} />
                <Route exact path="/transactions/adjust" component={withRouter(PageTransactionsAdjust)} />
                <Route exact path="/transactions/:id/edit" component={withRouter(PageTransactionsEdit)} />
                <Route exact path="/budgets" component={withRouter(PageBudgetsIndex)} />
                <Route exact path="/budgets/create" component={withRouter(PageBudgetsCreate)} />
                <Route exact path="/budgets/:id/edit" component={withRouter(PageBudgetsEdit)} />
                <Route exact path="/groups" component={withRouter(PageGroups)} />
                <Route exact path="/groups/create" component={withRouter(PageGroupsCreate)} />
                <Route exact path="/groups/:id" component={withRouter(PageGroupsDetail)} />
                <Route exact path="/groups/:id/wallets/create" component={withRouter(PageGroupWalletsCreate)} />
                <Route exact path="/groups/:id/wallets/:wallet_id/edit" component={withRouter(PageGroupWalletsEdit)} />
                <Route exact path="/groups/:id/members/invite" component={withRouter(PageGroupsMemberInvite)} />
                <Route exact path="/statistics" component={withRouter(PageStatistics)} />
                <Route exact path="/investation" component={withRouter(PageInvestation)} />
                <Route exact path="/daily_ibadah" component={withRouter(PageDailyIbadah)} />
                <Route exact path="/wealth_assets" component={withRouter(PageWealthAsset)} />
                <Route exact path="/wealth_assets/create" component={withRouter(PageWealthAssetCreate)} />
                <Route exact path="/calculator_budget" component={withRouter(PageCalculatorBudget)} />
                <Route exact path="/gold_price" component={withRouter(PageGoldPrice)} />
                <Route exact path="/icon_list" component={withRouter(PageIconList)} />
                <Route path="/" component={withRouter(PageNotFound)} />
              </Switch>

              {showAdminLteTempl ? <Footer /> : null }
            </AlertProvider>
          </div>
        </div>
    // </BrowserRouter>
  )
}

export default App
