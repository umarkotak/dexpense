import React, { useState, useEffect } from "react"
import {Link} from "react-router-dom"

import dexpenseApi from "../apis/DexpenseApi"
import utils from "../helper/Utils"

function PageDashboard() {
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
        setGroupDetail(body.data)
      } else {
        alert.error(`There is some error: ${body.error}`)
      }
    } catch (e) {
      alert.error(`There is some error: ${e.message}`)
    }
  }
  
  useEffect(() => {
    fetchGroupDetail()
  // eslint-disable-next-line
  }, [])
  
  return (
    <div>
      <div className="content-wrapper">
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Dashboard</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item active"><Link to="/dashboard">Dashboard</Link></li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        <section className="content">
          <div className="row">
            <div className="col-12 col-lg-3">
              <div className="card card-primary card-outline">
                <div className="card-body box-profile">
                  <div className="text-center">
                    <img className="profile-user-img img-fluid img-circle" src="/default_avatar.png" alt="User Profile" />
                  </div>
                  <h3 className="profile-username text-center">{localStorage.getItem("DEXPENSE_SESSION_USERNAME")}</h3>
                </div>
              </div>
              <div className="card card-primary">
                <div className="card-header"><h3 className="card-title">Summary</h3></div>
                <div className="card-body">
                  <div>
                    <strong><i className="fas fa-wallet mr-1"></i> Saldo Sekarang</strong>
                    <p className="text-muted my-1">IDR 995.000</p>
                    <hr className="my-2" />
                  </div>
                  <div>
                    <strong className="text-success"><i className="fas fa-reply mr-1"></i> Pemasukan</strong>
                    <p className="text-muted my-1">IDR 1.000.000</p>
                    <hr className="my-2" />
                  </div>
                  <div>
                    <strong className="text-danger"><i className="fas fa-share mr-1"></i> Pengeluaran</strong>
                    <p className="text-muted my-1">IDR 5.000</p>
                    <hr className="my-2" />
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 col-lg-9">
              <div className="row">
                <div className="col-12">
                  <div className="row">
                    {groupDetail.group_wallets.map(((groupWallet, index) => (
                      <div className="col-12 col-sm-6 col-xl-4" key={`GROUP-WALET-${index}`}>
                        <div className="small-box bg-primary">
                          <div className="inner">
                            <h3>{utils.FormatNumber(parseInt(groupWallet.amount))}</h3>
                            <p>
                              {groupWallet.wallet_type} <br/>
                              {groupWallet.name}
                            </p>
                          </div>
                          <div className="icon"><i className="fa fa-wallet"></i></div>
                          <Link to="/transactions" className="small-box-footer">Transaksi <i className="fas fa-arrow-circle-right"></i></Link>
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