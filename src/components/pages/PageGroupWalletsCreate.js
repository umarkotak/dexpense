import React, {useState, useEffect} from "react"
import {Link, useParams} from "react-router-dom"
import {useAlert} from 'react-alert'

import dexpenseApi from "../apis/DexpenseApi"

function PageGroupWalletsCreate() {
  return (
    <div>
      <div className="content-wrapper">
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Create Wallet</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item active"><Link to="/groups">Groups</Link></li>
                  <li className="breadcrumb-item active"><Link to={`/groups`}>Groups</Link></li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        <section className="content">
        </section>
      </div>
    </div>
  )
}

export default PageGroupWalletsCreate