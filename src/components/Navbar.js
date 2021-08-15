import React, {useState} from "react"
import {Link} from "react-router-dom"

function Navbar() {
  return (
    <div>
      <nav className="main-header navbar navbar-expand navbar-dark">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" data-widget="pushmenu" href="#" role="button"><i className="fas fa-bars"></i></a>
          </li>
        </ul>

        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link to="/sign_up" className="nav-link"><i className="fa fa-user-plus"></i> Sign Up</Link>
          </li>
          <li className="nav-item">
            <Link to="/login" className="nav-link btn btn-primary text-white"><i className="fa fa-sign-in-alt"></i> Login</Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Navbar
