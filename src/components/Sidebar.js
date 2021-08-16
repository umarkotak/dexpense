import React, {useState, useEffect} from "react"
import {Link, useHistory} from "react-router-dom"

function Sidebar() {
  const history = useHistory()
  useEffect(() => {
    history.listen(() => setDexpenseSessionToken(localStorage.getItem("DEXPENSE_SESSION_TOKEN")))
  }, [history])

  const [dexpenseSessionToken, setDexpenseSessionToken] = useState(localStorage.getItem("DEXPENSE_SESSION_TOKEN"))

  var activeName = localStorage.getItem("DEXPENSE_SESSION_USERNAME") || "Guest"

  return (
    <div>
      <aside className="main-sidebar sidebar-dark-primary elevation-4">
        <Link to="/" className="brand-link">
          <img src="/logo192.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{opacity: ".8"}} />
          <span className="brand-text font-weight-light"><b>DEX</b>PENSE</span>
        </Link>

        <div className="sidebar">
          <div className="user-panel mt-3 pb-3 mb-3 d-flex">
            <div className="image">
              <img src="/default_avatar.png" className="img-circle elevation-2" alt="User Image" />
            </div>
            <div className="info">
              <a href="#" className="d-block">Hello, <b>{activeName}</b> !</a>
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
          <Link to="/" className="nav-link"><i className="nav-icon fas fa-home"></i> <p>Home</p></Link>
        </li>
      </ul>
    )
  }

  function OnPublic() {
    return(
      <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
        <li className="nav-item">
          <Link to="/" className="nav-link"><i className="nav-icon fas fa-home"></i> <p>Home</p></Link>
        </li>
      </ul>
    )
  }
}

export default Sidebar
