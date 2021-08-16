import React from "react"
import {Link} from "react-router-dom"
import {useHistory} from "react-router-dom"

function Navbar() {
  const history = useHistory()

  function handleLogout() {
    localStorage.removeItem("DEXPENSE_SESSION_TOKEN")
    localStorage.removeItem("DEXPENSE_SESSION_USERNAME")
    history.push("/")
    window.location.reload()
  }

  return (
    <div>
      <nav className="main-header navbar navbar-expand navbar-dark">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" data-widget="pushmenu" href="#" role="button"><i className="fas fa-bars"></i></a>
          </li>
        </ul>

        <NavItems />
      </nav>
    </div>
  )

  function NavItems() {
    if (localStorage.getItem("DEXPENSE_SESSION_TOKEN")) {
      return OnLoggedIn()
    } else {
      return OnPublic()
    }
  }

  function OnLoggedIn() {
    return(
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <button className="btn btn-danger" onClick={() => handleLogout()}><i className="fa fa-sign-out-alt"></i> Logout</button>
        </li>
      </ul>
    )
  }

  function OnPublic() {
    return(
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link to="/sign_up" className="nav-link"><i className="fa fa-user-plus"></i> Sign Up</Link>
        </li>
        <li className="nav-item">
          <Link to="/login" className="nav-link btn btn-primary text-white"><i className="fa fa-sign-in-alt"></i> Login</Link>
        </li>
      </ul>
    )
  }
}

export default Navbar
