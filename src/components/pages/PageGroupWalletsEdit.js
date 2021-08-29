import React, {useState, useEffect} from "react"
import {Link, useParams, useHistory} from "react-router-dom"
import {useAlert} from 'react-alert'
import Select from 'react-select'

import dexpenseApi from "../apis/DexpenseApi"
import utils from "../helper/Utils"

function PageGroupWalletsEdit() {
  const history = useHistory()
  const alert = useAlert()

  let { id } = useParams()
  const groupID = parseInt(id)
  let { wallet_id } = useParams()
  const walletID = parseInt(wallet_id)

  const [groupWalletParams, setGroupWalletParams] = useState({
    "id": walletID,
    "group_id": groupID,
    "name": "",
    "wallet_type": ""
  })
  function handleGroupWalletParamsChanges(e) {
    try {
      const { name, value } = e.target
      setGroupWalletParams(groupWalletParams => ({...groupWalletParams, [name]: value}))
    } catch (err) {
      setGroupWalletParams(groupWalletParams => ({...groupWalletParams, [e.name]: e.value}))
    }
  }

  async function handleGroupWalletsSubmit() {
    try {
      const response = await dexpenseApi.GroupWalletsEdit(localStorage.getItem("DEXPENSE_SESSION_TOKEN"), groupWalletParams)
      const status = response.status
      const body = await response.json()

      if (status === 200) {
        alert.info("Wallet edit success!")
        history.push("/groups")
      } else {
        alert.error(`There is some error: ${body.error}`)
      }
    } catch (e) {
      alert.error(`There is some error: ${e.message}`)
    }
  }

  async function handleGroupWalletDelete() {
    if (!window.confirm("Apakah anda yakin ingin menghapus dompet ini? semua transaksi yang berkaitan dengan dompet ini akan terhapus!")) {return}
    try {
      const response = await dexpenseApi.GroupWalletsDelete(localStorage.getItem("DEXPENSE_SESSION_TOKEN"), groupWalletParams)
      const status = response.status
      const body = await response.json()

      if (status === 200) {
        alert.info("Wallet delete success!")
        history.push("/groups")
      } else {
        alert.error(`There is some error: ${body.error}`)
      }
    } catch (e) {
      alert.error(`There is some error: ${e.message}`)
    }
  }

  return (
    <div>
      <div className="content-wrapper">
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Edit Wallet</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item active"><Link to="/groups">Groups</Link></li>
                  <li className="breadcrumb-item active"><Link to={`/groups/${groupID}/wallets/create`}>Create Wallet</Link></li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        <section className="content">
          <div className="row">
            <div className="col-12 col-lg-6">
              <div className="card card-primary card-outline">
                <div className="card-header">
                  <div className="card-tools">
                    <button type="button" className="btn btn-primary btn-xs" data-card-widget="collapse">
                      <i className="fas fa-minus"></i>
                    </button>
                  </div>
                </div>
                <div className="card-body">
                  <div className="form-group">
                    <label>Jenis Dompet</label> <small className="text-danger"><b>*</b></small>
                    <Select
                      options={utils.Global()["WALLET_TYPE_OPTS"]}
                      onChange={(e) => handleGroupWalletParamsChanges(e)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Nama</label> <small className="text-danger"><b>*</b></small>
                    <input type="text" className="form-control form-control-sm" name="name" onChange={(e) => handleGroupWalletParamsChanges(e)} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Link
        to={`/groups/${groupID}/wallets/create`}
        className="bg-danger"
        onClick={() => handleGroupWalletDelete()}
        style={{
          position:"fixed",
          width:"50px",
          height:"50px",
          bottom:"140px",
          right:"30px",
          color:"#FFF",
          borderRadius:"50px",
          textAlign:"center",
          boxShadow:" 2px 2px 2px #999"
        }}
      >
        <i className="fa fa-trash my-float" style={{marginTop:"17px"}}></i>
      </Link>

      <Link
        to={`/groups/${groupID}/wallets/create`}
        className="bg-primary"
        onClick={() => handleGroupWalletsSubmit()}
        style={{
          position:"fixed",
          width:"50px",
          height:"50px",
          bottom:"70px",
          right:"30px",
          color:"#FFF",
          borderRadius:"50px",
          textAlign:"center",
          boxShadow:" 2px 2px 2px #999"
        }}
      >
        <i className="fa fa-save my-float" style={{marginTop:"17px"}}></i>
      </Link>
    </div>
  )
}

export default PageGroupWalletsEdit