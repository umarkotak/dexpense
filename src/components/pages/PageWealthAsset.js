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
              <div className="p-2 bg-white rounded shadow-sm">
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
                        <Link to="." className="btn img-circle btn-outline-primary mr-2">
                          <i className="fa fa-share" style={{color: "#FF844B", height: "13px", width: "13px"}}></i>
                        </Link>
                        <Link to="/wealth_assets/create" className="btn img-circle btn-outline-primary">
                          <i className="fa fa-plus" style={{color: "#FF844B", height: "13px", width: "13px"}}></i>
                        </Link>
                      </div>
                    </span>
                  </div>
                  <div className="col-12 px-3">
                    <small>Total Asset</small>
                    <h4><b>Rp 2.000.000.000</b></h4>
                  </div>
                </div>
              </div>

              <div className="row mt-2" id="total_section">
                <div className="col-12 px-3">
                  <h4><b>Summary</b></h4>

                  <div className="px-2">
                    <div className="row flex-row flex-nowrap overflow-auto">
                      {[1,2,3,4,5,6,7,8].map((val) => (
                        <div className="col-5 col-md-3 mr-2 rounded-lg border border-primary" style={{backgroundColor: "#9FC9DD"}} key={val}>
                          <div className="p-1">
                            <b>Emas</b><br/>
                            <small>Kamu punya</small><br/>
                            <b>20 gram</b><br/>
                            <small>Total</small><br/>
                            <b>Rp. 20.000.000</b><br/>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="col-12 px-3 mt-4">
                  <h4><b>Daftar Asset</b></h4>

                  {[1,2,3,4,5,6,7,8].map((val) => (
                    <div key={val}>
                      <div className="d-flex flex-row align-items-center justify-content-between border-bottom mb-2 pb-1">
                        <div className="d-flex flex-row align-items-center">
                          <div>
                            <Link to="." className="btn img-circle btn-outline-primary mr-2">
                              <i className="fa fa-coins" style={{color: "#FF844B", height: "13px", width: "13px"}}></i>
                            </Link>
                          </div>
                          <div>
                            <b>Emas</b><br/>
                            <small>Antam</small>
                          </div>
                        </div>
                        <div>
                          <b>Rp. 9.000.000</b><br/>
                          <small>tahun 2020</small>
                        </div>
                      </div>
                    </div>
                  ))}
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