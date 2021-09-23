import React, {useState, useEffect} from "react"
import {useHistory, Link} from "react-router-dom"
import {useAlert} from 'react-alert'
import Select from 'react-select'

import dexpenseApi from "../apis/DexpenseApi"
import utils from "../helper/Utils"

function PageTransactionsTransfer() {
  const alert = useAlert()
  const history = useHistory()

  const [transactionsCreateParams, setTransactionsCreateParams] = useState({
    "category": "",
    "amount": 0,
    "direction_type": "outcome",
    "group_wallet_id": 0,
    "name": "",
    "description": "",
    "note": "",
    "transaction_at": "",
    "target_group_wallet_id": 0,
    "transfer_fee": 0
  })
  function handleTransactionsParamsChanges(e) {
    try {
      const { name, value } = e.target
      setTransactionsCreateParams(transactionsCreateParams => ({...transactionsCreateParams, [name]: value}))
    } catch (err) {
      setTransactionsCreateParams(transactionsCreateParams => ({...transactionsCreateParams, [e.name]: e.value}))
    }
  }

  const [walletOptions, setWalletOptions] = useState([])
  const [targetWalletOptions, setTargetWalletOptions] = useState([])
  async function fetchWalletOptions() {
    try {
      const response = await dexpenseApi.GroupsShow(
        localStorage.getItem("DEXPENSE_SESSION_TOKEN"),
        {id: parseInt(localStorage.getItem("DEXPENSE_SESSION_GROUPS_ACTIVE_ID"))}
      )
      const status = response.status
      const body = await response.json()

      if (status === 200) {
        var tempWalletOptions = []
        var tempTargetWalletOptions = []

        body.data.group_wallets.map((v, k) => {
          tempWalletOptions.push({ name: 'group_wallet_id', value: v.id, label: v.name })
          tempTargetWalletOptions.push({ name: 'target_group_wallet_id', value: v.id, label: v.name })
        })
        setWalletOptions(tempWalletOptions)
        setTargetWalletOptions(tempTargetWalletOptions)
      } else {
        alert.error(`There is some error: ${body.error}`)
      }
    } catch (e) {
      alert.error(`There is some error: ${e.message}`)
    }
  }
  useEffect(() => {
    fetchWalletOptions()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function handleTransactionSubmit() {
    try {
      var tempTransactionsCreateParams = transactionsCreateParams
      var transactionAtUTC = utils.ConvertLocalTimeToUTC(tempTransactionsCreateParams["transaction_at"])
      tempTransactionsCreateParams["transaction_at"] = utils.FormatDateInput(transactionAtUTC)

      const response = await dexpenseApi.TransactionsTransfer(localStorage.getItem("DEXPENSE_SESSION_TOKEN"), tempTransactionsCreateParams)
      const status = response.status
      const body = await response.json()

      if (status === 200) {
        alert.info("Transaction success!")
        history.push("/transactions")
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
                <h1>Transfer</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item active"><Link to="/transactions">Transaction</Link></li>
                  <li className="breadcrumb-item active"><Link to="/transactions/create">New</Link></li>
                  <li className="breadcrumb-item active"><Link to="/transactions/transfer">Transfer</Link></li>
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
                    <Link to="/transactions/create" className="btn btn-primary btn-sm mx-1">
                      <i className="fas fa-cash-register"></i> Transaksi
                    </Link>
                    <button type="button" className="btn btn-primary btn-sm" data-card-widget="collapse">
                      <i className="fas fa-minus"></i>
                    </button>
                  </div>
                </div>
                <div className="card-body">
                  <div className="form-group">
                    <label>Jenis</label> <small className="text-danger"><b>*</b></small>
                    <Select
                      defaultValue={utils.Global()["TRANSACTION_DIRECTION_OPTS"][0]}
                      onChange={(e) => handleTransactionsParamsChanges(e)}
                      isDisabled={true}
                    />
                  </div>
                  <div className="form-group" data-select2-id="29">
                    <label>Kategori</label> <small className="text-danger"><b>*</b></small>
                    <Select
                      name="category"
                      defaultValue={{name:"category", value: "transfer", label: "Transfer"}}
                      onChange={(e) => handleTransactionsParamsChanges(e)}
                      isDisabled={true}
                    />
                  </div>
                  <div className="form-group">
                    <label>Dari Wallet</label> <small className="text-danger"><b>*</b></small>
                    <Select
                      name="group_wallet_id"
                      options={walletOptions}
                      onChange={(e) => handleTransactionsParamsChanges(e)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Kepada Wallet</label> <small className="text-danger"><b>*</b></small>
                    <Select
                      name="group_wallet_id"
                      options={targetWalletOptions}
                      onChange={(e) => handleTransactionsParamsChanges(e)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Jumlah</label> <small className="text-danger"><b>*</b></small>
                    <input type="number" className="form-control form-control-sm" name="amount" onChange={(e) => handleTransactionsParamsChanges(e)} />
                  </div>
                  <div className="form-group">
                    <label>Biaya Transfer</label> <small className="text-danger"><b>*</b></small>
                    <input type="number" className="form-control form-control-sm" name="transfer_fee" onChange={(e) => handleTransactionsParamsChanges(e)} />
                  </div>
                  <div className="form-group">
                    <label>Waktu Transaksi</label> <small className="text-danger"><b>*</b></small>
                    <input type="datetime-local" className="form-control form-control-sm" name="transaction_at" onChange={(e) => handleTransactionsParamsChanges(e)} />
                  </div>
                  <div className="form-group">
                    <label>Deskripsi</label>
                    <textarea className="form-control" rows="3" name="description" onChange={(e) => handleTransactionsParamsChanges(e)}></textarea>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-4">

            </div>
          </div>
        </section>
      </div>

      <Link
        to="/transactions/create"
        className="bg-primary"
        onClick={() => handleTransactionSubmit()}
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

export default PageTransactionsTransfer
