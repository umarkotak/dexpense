import React, {useState, useEffect} from "react"
import {Link} from "react-router-dom"
import {useAlert} from 'react-alert'

import MiniTips from "../components/MiniTips"
import dexpenseApi from "../apis/DexpenseApi"
import utils from "../helper/Utils"

function PageWealthAsset() {
  const alert = useAlert()

  const [wealthAssets, setWealthAssets] = useState([])
  const [wealthAssetDashboard, setWealthAssetDashboard] = useState({})
  const [wealthAssetGroupped, setWealthAssetGroupped] = useState([])

  async function handleGetAssetList() {
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

  async function handleGetAssetDashboard() {
    try {
      const response = await dexpenseApi.AssetsDashboard(localStorage.getItem("DEXPENSE_SESSION_TOKEN"), {
        group_id: parseInt(localStorage.getItem("DEXPENSE_SESSION_GROUPS_ACTIVE_ID")),
      })
      const status = response.status
      const body = await response.json()

      console.log(body)

      if (status === 200) {
        setWealthAssetDashboard(body.data)
      } else {
        alert.error(`There is some error: ${body.error}`)
      }
    } catch (e) {
      alert.error(`There is some error: ${e.message}`)
    }
  }

  async function handleGetAssetGroupped() {
    try {
      const response = await dexpenseApi.AssetsGroupped(localStorage.getItem("DEXPENSE_SESSION_TOKEN"), {
        group_id: parseInt(localStorage.getItem("DEXPENSE_SESSION_GROUPS_ACTIVE_ID")),
      })
      const status = response.status
      const body = await response.json()

      console.log(body)

      if (status === 200) {
        setWealthAssetGroupped(body.data)
      } else {
        alert.error(`There is some error: ${body.error}`)
      }
    } catch (e) {
      alert.error(`There is some error: ${e.message}`)
    }
  }

  useEffect(() => {
    handleGetAssetDashboard()
    handleGetAssetList()
    handleGetAssetGroupped()
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
            <div className="col-12 col-xl-9 mb-4 flex justify-center">
              <div className="w-full max-w-md">
                <div className="p-2 bg-white rounded-xl shadow-sm">
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
                          {/* <Link to="." className="btn img-circle btn-outline-primary mr-2">
                            <i className="fa fa-share" style={{color: "#FF844B", height: "13px", width: "13px"}}></i>
                          </Link> */}
                          <Link to="/wealth_assets/create" className="rounded-xl shadow-md py-1 px-2 border text-sm hover:bg-gray-100">
                            <i className="fa fa-plus mr-2" style={{color: "#FF844B", height: "13px", width: "13px"}}></i> Tambah Asset
                          </Link>
                        </div>
                      </span>
                    </div>
                    <div className="col-12 px-3">
                      <small>Total Asset</small>
                      <div className="text-lg">{utils.FormatNumber(wealthAssetDashboard.total_asset)}</div>
                    </div>
                    <div className="col-12 px-3">
                      <small>Zakat maal emas</small>
                      <div className="text-lg">{utils.FormatNumber(wealthAssetDashboard.zakat_maal)}</div>
                    </div>
                  </div>
                </div>

                <div className="row mt-2" id="total_section">
                  <div className="col-12 px-3">
                    <div className="text-lg mb-2">Rangkuman</div>

                    <div className="d-flex flex-row flex-nowrap overflow-x-auto">
                      {wealthAssetGroupped.map((oneAssetGroupped) => (
                        <div className="mr-2 px-2 rounded-xl bg-blue-200 shadow-sm" key={wealthAssetGroupped.category}>
                          <div className="p-1">
                            <b>{oneAssetGroupped.title}</b><br/>
                            {/* <small>Kamu punya</small><br/> */}
                            <span className="text-lg">{oneAssetGroupped.total_amount} {oneAssetGroupped.amount_unit}</span><br/>
                            <small>Total</small><br/>
                            <b>{utils.FormatNumber(oneAssetGroupped.total_price)}</b><br/>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="col-12 px-3 mt-2">
                    <div className="text-lg mb-2">Daftar Aset</div>

                    {wealthAssets.map((oneWealth) => (
                      <div key={oneWealth.id}>
                        <div className="flex items-center justify-content-between border-bottom mb-2 pb-1">
                          <div className="flex items-center">
                            <div>
                              <img src={oneWealth.icon_url} alt="ico" style={{width:"36px", height:"36px"}}></img>
                            </div>
                            <div className="ml-2">
                              <div className="mb-0"><b>{oneWealth.title}</b> <span className="text-sm">x {oneWealth.quantity || 1}</span></div>
                              <div className="text-xs">{utils.FormatDateTime(oneWealth.transaction_at)}</div>
                              {/* <small>sudah 1 tahun mengendap</small> */}
                            </div>
                          </div>
                            <div className="text-end">
                              <span className="text-md text-bold">{utils.FormatNumber(oneWealth.price)}</span><br/>

                              {oneWealth.category === "gold" ?
                                <div className="text-xs">
                                  <span>Buyback: {utils.FormatNumber(oneWealth.total_buyback_price)}</span><br/>
                                  <span>Profit: <span className={`${oneWealth.profit > 0 ? "text-success" : "text-danger"}`}>{utils.FormatNumber(oneWealth.profit)}</span></span><br/>
                                </div>
                              : null}
                            </div>
                        </div>
                      </div>
                    ))}
                  </div>
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
