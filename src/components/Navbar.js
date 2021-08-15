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
          <li className="nav-item d-none d-sm-inline-block">
            <Link to="/sign_up" className="nav-link">Sign Up</Link>
          </li>
          <li className="nav-item d-none d-sm-inline-block">
            <Link to="/login" className="nav-link">Login</Link>
          </li>
          <li className="nav-item d-none d-sm-inline-block">
            <a href="#" className="nav-link">Logout</a>
          </li>
        </ul>

        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <a className="nav-link" data-widget="control-sidebar" data-slide="true" href="#" role="button">
              <i className="fas fa-th-large"></i>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Navbar
