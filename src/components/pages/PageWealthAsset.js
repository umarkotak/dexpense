import React from "react"
import {Link} from "react-router-dom"

import MiniTips from "../components/MiniTips"

function PageWealthAsset() {
  return (
    <div>
      <div className="content-wrapper" style={{
        backgroundColor: "#E3EDF2",
      }}>
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Asset</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item active"><Link to="/wealth_assets">Asset</Link></li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        <section className="content">
          <div className="row">
            <div className="col-12 col-xl-9 mb-4">
              <div className="row" id="profile_section">
                <div className="col-12 px-3">
                  <span className="d-flex flex-row align-items-center justify-content-between">
                    <div className="d-flex flex-row align-items-center">
                      <img src="/default_avatar.png" alt="bukukas kita Logo" className="img-circle" style={{width: "50px", height: "50px"}} />
                      <span className="ml-2 d-flex flex-column">
                        <small className="mb-0">Halo!</small>
                        <b style={{marginTop: "-7px"}}>{localStorage.getItem("DEXPENSE_SESSION_USERNAME")}</b>
                      </span>
                    </div>

                    <div className="d-flex flex-row align-items-center justify-content-end">
                      <Link to="." className="btn img-circle btn-outline-primary mr-2"><i className="fa fa-bell"></i></Link>
                      <Link to="." className="btn img-circle btn-outline-primary"><i className="fa fa-share"></i></Link>
                    </div>
                  </span>
                </div>
              </div>
              <div className="row mt-2" id="total_section">
                <div className="col-12 px-3">
                  <small>Total Asset</small>
                  <h4><b>Rp 2.000.000.000</b></h4>
                </div>
              </div>
            </div>

            <div className="col-12 col-xl-3">
              <MiniTips />
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default PageWealthAsset