import React, {useState, useEffect} from "react"
import {Link, useHistory} from "react-router-dom"

function Navbar() {
  const history = useHistory()
  useEffect(() => {
    history.listen(() => setDexpenseSessionToken(localStorage.getItem("DEXPENSE_SESSION_TOKEN")))
  }, [history])

  const [dexpenseSessionToken, setDexpenseSessionToken] = useState(localStorage.getItem("DEXPENSE_SESSION_TOKEN"))

  function handleLogout() {
    localStorage.removeItem("DEXPENSE_SESSION_TOKEN")
    localStorage.removeItem("DEXPENSE_SESSION_USERNAME")
    history.push("/")
  }

  return (
    <div>
      <nav className="main-header navbar navbar-expand navbar-dark">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" data-widget="pushmenu" href="/#" role="button"><i className="fas fa-bars"></i></a>
          </li>
        </ul>

        <NavItems />
      </nav>
    </div>
  )

  function NavItems() {
    if (dexpenseSessionToken) {
      return OnLoggedIn()
    } else {
      return OnPublic()
    }
  }

  function OnLoggedIn() {
    return(
      <ul className="navbar-nav ml-auto">
        <li className="nav-item" id="nav-items-1">
          <button className="btn btn-primary mr-2"><i className="fa fa-users"></i> group :</button>
        </li>

        <li className="nav-item dropdown show" id="nav-items-2">
          <a className="btn btn-primary mr-2" data-toggle="dropdown" href="/#" aria-expanded="false" id="nav-items-2-1">default</a>
          <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right" style={{left: "inherit", right: "0px"}}>
            <div id="nav-items-dropdown-1">
              <a href="/#" className="dropdown-item">
                <div className="media">
                  <img src="/dist/img/user1-128x128.jpg" alt="User Avatar" className="img-size-50 mr-3 img-circle" />
                  <div className="media-body">
                    <h3 className="dropdown-item-title">
                      Brad Diesel
                      <span className="float-right text-sm text-danger"><i className="fas fa-star"></i></span>
                    </h3>
                    <p className="text-sm">Call me whenever you can...</p>
                    <p className="text-sm text-muted"><i className="far fa-clock mr-1"></i> 4 Hours Ago</p>
                  </div>
                </div>
              </a>
              <div className="dropdown-divider"></div>
            </div>
          </div>
        </li>
        
        <li className="nav-item" id="nav-items-3">
          <button className="btn btn-danger" onClick={() => handleLogout()}><i className="fa fa-sign-out-alt"></i> logout</button>
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
