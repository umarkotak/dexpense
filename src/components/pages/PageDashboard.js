import React, { useState, useEffect } from "react"
import {Link} from "react-router-dom"
import {useAlert} from 'react-alert'

import dexpenseApi from "../apis/DexpenseApi"
import utils from "../helper/Utils"

function PageDashboard() {
  const alert = useAlert()

  const [groupDetail, setGroupDetail] = useState({
    group_wallets: []
  })

  async function fetchGroupDetail() {
    try {
      const response = await dexpenseApi.GroupsShow(
        localStorage.getItem("DEXPENSE_SESSION_TOKEN"),
        {id: parseInt(localStorage.getItem("DEXPENSE_SESSION_GROUPS_ACTIVE_ID"))}
      )
      const status = response.status
      const body = await response.json()

      if (status === 200) {
        console.log("GROUP", body)
        var shortedData = body.data
        shortedData.group_wallets.sort(function (a, b) {
          return a.wallet_type.localeCompare(b.wallet_type) || b.amount - a.amount
        })
        setGroupDetail(body.data)
      } else {
        alert.error(`There is some error: ${body.error}`)
      }
    } catch (e) {
      alert.error(`There is some error: ${e.message}`)
    }
  }

  const [dashboardDetail, setDashboardDetail] = useState({
    "balance": 0,
    "minus_balance": 0,
    "total_income": 0,
    "total_outcome": 0
  })

  async function fetchDashboardDetail() {
    try {
      const response = await dexpenseApi.StatisticsTransactionsDashboard(
        localStorage.getItem("DEXPENSE_SESSION_TOKEN"),
        {"group_id": parseInt(localStorage.getItem("DEXPENSE_SESSION_GROUPS_ACTIVE_ID"))}
      )
      const status = response.status
      const body = await response.json()

      if (status === 200) {
        console.log("DASHBOARD DETAIL", body)
        setDashboardDetail(body.data)
      } else {
        alert.error(`There is some error: ${body.error}`)
      }
    } catch (e) {
      alert.error(`There is some error: ${e.message}`)
    }
  }

  useEffect(() => {
    fetchGroupDetail()
    fetchDashboardDetail()
  // eslint-disable-next-line
  }, [])

  function iconDecider(walletType) {
    switch(walletType) {
      case "cash":
        return "fa-money-bill-wave"
      case "bank":
        return "fa-university"
      case "credit_card":
        return "fa-credit-card"
      case "ewallet":
        return "fa-wallet"
      default:
        return "fa-coins"
    }
  }

  return (
    <div>
      <div className="content-wrapper">
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Profile</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item active"><Link to="/dashboard">Profile</Link></li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        <section className="content">
          <div className="row">
            <div className="col-12 col-md-4 col-xl-3">
              <div className="card card-widget widget-user">
                <div className="widget-user-header text-white bg-info">
                  <h5 className="widget-user-desc text-right">{localStorage.getItem("DEXPENSE_SESSION_USERNAME")}</h5>
                  <h3 className="widget-user-username text-right"><i className="fas fa-wallet mr-1"></i> {utils.FormatNumber(dashboardDetail.balance)}</h3>
                </div>
                <div className="widget-user-image">
                  <img className="img-circle" src="/default_avatar.png" alt="User Profile" />
                </div>
                <div className="card-footer px-1 pt-5 pb-1">
                  <div className="row">
                    <div className="col-6 border-right">
                      <div className="description-block">
                        <h5 className="description-header">{utils.FormatNumber(dashboardDetail.total_income)}</h5>
                        <span className="text-sm text-success"><i className="fas fa-reply mr-1"></i> Pemasukan</span>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="description-block">
                        <h5 className="description-header">{utils.FormatNumber(dashboardDetail.total_outcome)}</h5>
                        <span className="text-sm text-danger"><i className="fas fa-share mr-1"></i> Pengeluaran</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card card-info">
                <div className="card-header"><h3 className="card-title">Setting</h3></div>
                <div className="card-body py-1 px-0">
                  <div>
                    <Link to="/groups" className="p-1 btn btn-info btn-block"><i className="nav-icon fas fa-users"></i> Atur Group & Dompet</Link>
                    {/* <strong className="text-danger"><i className="fas fa-wallet mr-1"></i> Saldo Minus</strong>
                    <p className="text-muted my-1">{utils.FormatNumber(dashboardDetail.minus_balance)}</p>
                    <hr className="my-2" /> */}
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-8 col-xl-9">
              <div className="row">
                <div className="col-12">
                  <div className="row">
                    {groupDetail.group_wallets.map(((groupWallet, index) => (
                      <div className="col-12 col-sm-6 col-xl-4 text-sm" key={`GROUP-WALET-${index}`}>
                        <div className={`small-box ${parseInt(groupWallet.amount) < 0 ? "bg-danger" : "bg-primary"}`}>
                          <div className="inner">
                            <h3>{utils.FormatNumber(parseInt(groupWallet.amount))}</h3>
                            <p>
                            <span className="badge badge-pill badge-light">{groupWallet.wallet_type}</span>
                              <br/>
                              <span className="badge badge-pill badge-light">{groupWallet.name}</span>
                            </p>
                          </div>
                          <div className="icon"><i className={`fa ${iconDecider(groupWallet.wallet_type)}`}></i></div>
                          <Link to={`/transactions/adjust?group_wallet_id=${groupWallet.id}`} className="small-box-footer">Ubah saldo <i className="fas fa-arrow-circle-right"></i></Link>
                        </div>
                      </div>
                    )))}
                  </div>
                </div>

                <div className="col-12">
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default PageDashboard