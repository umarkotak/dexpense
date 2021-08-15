import React, { useState } from "react"
import {Link} from "react-router-dom"

function Sidebar() {

  var activeName = "Alexander Pierce"

  return (
    <div>
      <aside className="main-sidebar sidebar-dark-primary elevation-4">
        <Link to="/" className="brand-link">
          <span className="brand-text font-weight-light"><i className="fas fa-wallet"></i> DEXPENSE</span>
        </Link>

        <div className="sidebar">
          <div className="user-panel mt-3 pb-3 mb-3 d-flex">
            <div className="info">
              <a href="#" className="d-block"><b>Hello,</b> {activeName}</a>
            </div>
          </div>

          <nav className="mt-2">
            <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  <i className="nav-icon fas fa-home"></i> <p>Home</p>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </aside>
    </div>
  )
}

export default Sidebar
