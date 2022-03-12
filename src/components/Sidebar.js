import React, {useState, useEffect} from "react"
import {Link, useHistory} from "react-router-dom"

function Sidebar() {
  const history = useHistory()
  useEffect(() => {
    history.listen(() => {
      setDexpenseSessionToken(localStorage.getItem("DEXPENSE_SESSION_TOKEN"))
      setSideBarItems(RefreshSideBarItems())
    })
  }, [history])

  const [dexpenseSessionToken, setDexpenseSessionToken] = useState(localStorage.getItem("DEXPENSE_SESSION_TOKEN"))
  const [sideBarItems, setSideBarItems] = useState(RefreshSideBarItems())

  var activeName = localStorage.getItem("DEXPENSE_SESSION_USERNAME") || "Guest"

  function RefreshSideBarItems() {
    let tempSideBarItems = {}
    if (window.location.pathname === "/") { tempSideBarItems.home = "active" }
    if (window.location.pathname === "/home") { tempSideBarItems.home = "active" }
    else if (window.location.pathname === "/dashboard") { tempSideBarItems.dashboard = "active" }
    else if (window.location.pathname.startsWith("/transactions")) { tempSideBarItems.transactions = "active" }
    else if (window.location.pathname === "/statistics") { tempSideBarItems.statistics = "active" }
    else if (window.location.pathname.startsWith("/groups")) { tempSideBarItems.groups = "active" }
    else if (window.location.pathname.startsWith("/budget")) { tempSideBarItems.budget = "active" }
    else if (window.location.pathname.startsWith("/investation")) { tempSideBarItems.investation = "active" }
    else if (window.location.pathname.startsWith("/daily_ibadah")) { tempSideBarItems.daily_ibadah = "active" }
    return tempSideBarItems
  }

  return (
    <div>
      <aside className="main-sidebar sidebar-dark-primary elevation-4">
        <Link to="/" className="brand-link">
          <img src="/images/new_logo.png" alt="bukukas kita Logo" className="brand-image img-circle elevation-3" style={{opacity: ".8"}} />
          <span className="brand-text font-weight-light"><b className="text-teal">BUKUKAS</b>KITA</span>
        </Link>

        <div className="sidebar">
          <div className="user-panel mt-3 pb-3 mb-3 d-flex">
            <div className="image">
              <img src="/default_avatar.png" className="img-circle elevation-2" alt="User" />
            </div>
            <div className="info">
              <Link to="/dashboard" className="d-block">Hello, <b className="text-teal">{activeName}</b> !</Link>
            </div>
          </div>

          <nav className="mt-2">
            <SideBarItems />
          </nav>
        </div>
      </aside>
    </div>
  )

  function SideBarItems() {
    if (dexpenseSessionToken) {
      return OnLoggedIn()
    } else {
      return OnPublic()
    }
  }

  function OnLoggedIn() {
    return(
      <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
        <li className="nav-item">
          <Link to="/home" className={`nav-link ${sideBarItems["home"] || ""}`}><i className="nav-icon fas fa-home"></i> <p>Home</p></Link>
        </li>
        <li className="nav-item">
          <Link to="/dashboard" className={`nav-link ${sideBarItems["dashboard"] || ""}`}><i className="nav-icon fas fa-columns"></i> <p>Dashboard</p></Link>
        </li>
        <li className="nav-item">
          <Link to="/transactions/daily" className={`nav-link ${sideBarItems["transactions"] || ""}`}><i className="nav-icon fas fa-hand-holding-usd"></i> <p>Transaksi</p></Link>
        </li>
        <li className="nav-item">
          <Link to="/budgets" className={`nav-link ${sideBarItems["budget"] || ""}`}><i className="nav-icon fas fa-list-ul"></i> <p>Budgeting</p></Link>
        </li>
        <li className="nav-item">
          <Link to="/investation" className={`nav-link ${sideBarItems["investation"] || ""}`}><i className="nav-icon fa fa-coins"></i> <p>Investation</p></Link>
        </li>
        <li className="nav-item">
          <Link to="/statistics" className={`nav-link ${sideBarItems["statistics"] || ""}`}><i className="nav-icon fas fa-chart-line"></i> <p>Statistik</p></Link>
        </li>
        <li className="nav-item">
          <Link to="/groups" className={`nav-link ${sideBarItems["groups"] || ""}`}><i className="nav-icon fas fa-users"></i> <p>Groups</p></Link>
        </li>
        <li className="nav-item">
          <Link to="/daily_ibadah" className={`nav-link ${sideBarItems["daily_ibadah"] || ""}`}><i className="nav-icon fas fa-mosque"></i> <p>Daily Routine</p></Link>
        </li>
      </ul>
    )
  }

  function OnPublic() {
    return(
      <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
        <li className="nav-item">
          <Link to="/" className={`nav-link ${sideBarItems["home"] || ""}`}><i className="nav-icon fas fa-home"></i> <p>Home</p></Link>
        </li>
        <li className="nav-item">
          <Link to="/investation" className={`nav-link ${sideBarItems["investation"] || ""}`}><i className="nav-icon fa fa-coins"></i> <p>Investation</p></Link>
        </li>
        <li className="nav-item">
          <Link to="/daily_ibadah" className={`nav-link ${sideBarItems["daily_ibadah"] || ""}`}><i className="nav-icon fas fa-mosque"></i> <p>Daily Routine</p></Link>
        </li>
      </ul>
    )
  }
}

export default Sidebar
