import React, {useState, useEffect} from "react"
import {useHistory, Link} from "react-router-dom"
import {useAlert} from 'react-alert'
import Select from 'react-select'

import dexpenseApi from "../apis/DexpenseApi"

function PageTransactionsCreate() {
  const alert = useAlert()
  const history = useHistory()

  const [transactionsCreateParams, setTransactionsCreateParams] = useState({
    "category": "food",
    "amount": 0,
    "direction_type": "out",
    "group_wallet_id": 0,
    "name": "",
    "description": "",
    "note": "",
    "transaction_at": ""
  })
  function handleTransactionsParamsChanges(e) {
    try {
      const { name, value } = e.target
      setTransactionsCreateParams(transactionsCreateParams => ({...transactionsCreateParams, [name]: value}))
    } catch (err) {
      setTransactionsCreateParams(transactionsCreateParams => ({...transactionsCreateParams, [e.name]: e.value}))
    }
  }

  const options = [
    { name: 'category', value: 'food', label: 'Food' },
    { name: 'category', value: 'daily_needs', label: 'Daily Needs' },
    { name: 'category', value: 'other', label: 'Other' }
  ]
  const directionOptions = [
    { name: 'direction_type', value: 'income', label: 'Pemasukan' },
    { name: 'direction_type', value: 'outcome', label: 'Pengeluaran' }
  ]

  const [walletOptions, setWalletOptions] = useState([])
  async function fetchWalletOptions() {
    try {
      const response = await dexpenseApi.GroupsShow(
        localStorage.getItem("DEXPENSE_SESSION_TOKEN"),
        {id: parseInt(localStorage.getItem("DEXPENSE_SESSION_GROUPS_ACTIVE_ID"))}
      )
      const status = response.status
      const body = await response.json()

      if (status === 200) {
        var tempWalletOptions = body.data.group_wallets.map((v, k) => {
          return { name: 'group_wallet_id', value: v.id, label: v.name }
        })
        setWalletOptions(tempWalletOptions)
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
      const response = await dexpenseApi.TransactionsCreate(localStorage.getItem("DEXPENSE_SESSION_TOKEN"), transactionsCreateParams)
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
                <h1>Transactions Create</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item active"><Link to="/transactions">Transaction</Link></li>
                  <li className="breadcrumb-item active"><Link to="/transactions/create">Create</Link></li>
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
                    <label>Jenis</label> <small className="text-danger"><b>*</b></small>
                    <Select
                      options={directionOptions}
                      onChange={(e) => handleTransactionsParamsChanges(e)}
                    />
                  </div>
                  <div className="form-group" data-select2-id="29">
                    <label>Kategori</label> <small className="text-danger"><b>*</b></small>
                    <Select
                      name="category"
                      options={options}
                      defaultValue={transactionsCreateParams.category}
                      onChange={(e) => handleTransactionsParamsChanges(e)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Wallet</label> <small className="text-danger"><b>*</b></small>
                    <Select
                      name="group_wallet_id"
                      options={walletOptions}
                      onChange={(e) => handleTransactionsParamsChanges(e)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Jumlah</label> <small className="text-danger"><b>*</b></small>
                    <input type="number" className="form-control form-control-sm" name="amount" onChange={(e) => handleTransactionsParamsChanges(e)} />
                  </div>
                  <div className="form-group">
                    <label>Waktu Transaksi</label> <small className="text-danger"><b>*</b></small>
                    <input type="datetime-local" className="form-control form-control-sm" name="transaction_at" onChange={(e) => handleTransactionsParamsChanges(e)} />
                  </div>
                  <div className="form-group">
                    <label>Nama</label> <small className="text-danger"><b>*</b></small>
                    <input type="text" className="form-control form-control-sm" name="name" onChange={(e) => handleTransactionsParamsChanges(e)} />
                  </div>
                  <div className="form-group">
                    <label>Deskripsi</label>
                    <textarea className="form-control" rows="3" name="description" onChange={(e) => handleTransactionsParamsChanges(e)}></textarea>
                  </div>
                  <div className="form-group">
                    <label>Catatan</label>
                    <textarea className="form-control" rows="2" name="note" onChange={(e) => handleTransactionsParamsChanges(e)}></textarea>
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

export default PageTransactionsCreate
