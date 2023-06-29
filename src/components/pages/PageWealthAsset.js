import React, {useState, useEffect} from "react"
import {Link} from "react-router-dom"
import {useAlert} from 'react-alert'

import MiniTips from "../components/MiniTips"
import dexpenseApi from "../apis/DexpenseApi"
import utils from "../helper/Utils"

function PageWealthAsset() {
  const alert = useAlert()

  const [wealthAssets, setWealthAssets] = useState([])

  async function handleAssetSubmit() {
    try {
      const response = await dexpenseApi.AssetsList(localStorage.getItem("DEXPENSE_SESSION_TOKEN"), {
        group_id: parseInt(localStorage.getItem("DEXPENSE_SESSION_GROUPS_ACTIVE_ID")),
      })
      const status = response.status
      const body = await response.json()

      console.log(body)

      if (status === 200) {
        setWealthAssets(body.data)
      } else {
        alert.error(`There is some error: ${body.error}`)
      }
    } catch (e) {
      alert.error(`There is some error: ${e.message}`)
    }
  }
  useEffect(() => {
    handleAssetSubmit()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
            <div className="col-12 col-xl-6 mb-4">
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
                    <h5><b>Rp 2.000.000.000</b></h5>
                  </div>
                  <div className="col-12 px-3">
                    <small>Zakat maal emas</small>
                    <h5><b>Rp 2.000.000.000</b></h5>
                  </div>
                </div>
              </div>

              <div className="row mt-2" id="total_section">
                <div className="col-12 px-3">
                  <h4><b>Rangkuman</b></h4>

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

                  {wealthAssets.map((oneWealth) => (
                    <div key={oneWealth.id}>
                      <div className="d-flex flex-row align-items-center justify-content-between border-bottom mb-2 pb-1">
                        <div className="d-flex flex-row align-items-center">
                          <div>
                            <img src="https://static.moneylover.me/img/icon/icon_95.png" alt="ico" style={{width:"48px", height:"48px"}}></img>
                          </div>
                          <div className="ml-2">
                            <b>{oneWealth.sub_category}</b> x {oneWealth.quantity || 1}
                            <br/>
                            <small>{utils.FormatDateTime(oneWealth.transaction_at)}</small>
                            <br/>
                            {/* <small>sudah 1 tahun mengendap</small> */}
                          </div>
                        </div>
                        <div className="text-end">
                          <b>{utils.FormatNumber(oneWealth.price)}</b><br/>
                          <span>Total Buyback: {utils.FormatNumber(oneWealth.total_buyback_price)}</span><br/>
                          <span>Profit: <span className={`${oneWealth.profit > 0 ? "text-success" : "text-danger"}`}>{utils.FormatNumber(oneWealth.profit)}</span></span><br/>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="col-12 col-xl-3 mb-4">
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
