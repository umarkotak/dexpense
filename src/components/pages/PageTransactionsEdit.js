import React, {useState, useEffect} from "react"
import {useHistory, Link, useParams} from "react-router-dom"
import {useAlert} from 'react-alert'
import Select from 'react-select'
import NumberFormat from 'react-number-format'

import dexpenseApi from "../apis/DexpenseApi"
import utils from "../helper/Utils"

function PageTransactionsEdit() {
  const alert = useAlert()
  const history = useHistory()

  let { id } = useParams()
  const transactionID = parseInt(id)

  const [transactionsEditParams, setTransactionsEditParams] = useState({
    "category": "",
    "amount": 0,
    "direction_type": "",
    "group_wallet_id": 0,
    "name": "",
    "description": "",
    "note": "",
    "transaction_at": ""
  })
  function handleTransactionsParamsChanges(e) {
    try {
      const { name, value } = e.target
      setTransactionsEditParams(transactionsEditParams => ({...transactionsEditParams, [name]: value}))
    } catch (err) {
      setTransactionsEditParams(transactionsEditParams => ({...transactionsEditParams, [e.name]: e.value}))
    }
  }

  async function fetchTransactionDetail() {
    try {
      const response = await dexpenseApi.TransactionsDetail(localStorage.getItem("DEXPENSE_SESSION_TOKEN"), {id: transactionID})
      const status = response.status
      const body = await response.json()

      if (status === 200) {
        console.log("DETAIL", body)
        setTransactionsEditParams(body.data)
      } else {
        alert.error(`There is some error: ${body.error}`)
      }
    } catch (e) {
      alert.error(`There is some error: ${e.message}`)
    }
  }

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
    fetchTransactionDetail()
    fetchWalletOptions()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function handleTransactionSubmit() {
    try {
      transactionsEditParams.id = transactionID
      const response = await dexpenseApi.TransactionsEdit(localStorage.getItem("DEXPENSE_SESSION_TOKEN"), transactionsEditParams)
      const status = response.status
      const body = await response.json()

      if (status === 200) {
        console.log("EDIT", body)
        alert.info("Transaction edit success!")
        history.push("/transactions/daily")
      } else {
        alert.error(`There is some error: ${body.error}`)
      }
    } catch (e) {
      alert.error(`There is some error: ${e.message}`)
    }
  }

  async function executeDeleteTransaction() {
    try {
      if (!window.confirm("Are you sure?")) { return }

      const response = await dexpenseApi.TransactionsDelete(localStorage.getItem("DEXPENSE_SESSION_TOKEN"), {id: id})
      const status = response.status
      const body = await response.json()

      if (status === 200) {
        alert.success(`Delete transaction success!`)
        history.push("/transactions/daily")
      } else {
        alert.error(`There is some error: ${body.error}`)
      }
    } catch (e) {
      alert.error(`There is some error: ${e.message}`)
    }
  }

  const [categoryOptions, setCategoryOptions] = useState([{}])
  async function fetchCategoryOptions() {
    try {
      const response = await dexpenseApi.CategoriesIndexStatic(
        localStorage.getItem("DEXPENSE_SESSION_TOKEN"), {}
      )
      const status = response.status
      const body = await response.json()

      if (status === 200) {
        setCategoryOptions(body.data)
      } else {
        alert.error(`There is some error: ${body.error}`)
      }
    } catch (e) {
      alert.error(`There is some error: ${e.message}`)
    }
  }
  useEffect(() => {
    fetchCategoryOptions()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [specificBudgetList, setSpecificBudgetList] = useState([])
  async function fetchSpecificBudgetList() {
    try {
      const response = await dexpenseApi.MonthlyBudgetIndex(
        localStorage.getItem("DEXPENSE_SESSION_TOKEN"), {
          group_id: parseInt(localStorage.getItem("DEXPENSE_SESSION_GROUPS_ACTIVE_ID")),
          mode: "specific"
        }
      )
      const status = response.status
      const body = await response.json()

      if (status === 200) {
        var budgetSelect = [{
          name: "monthly_budget_id",
          value: null,
          label: "Select...",
        }]
        if (body.data) {
          body.data.forEach ((v) => {
            budgetSelect.push({
              name: "monthly_budget_id",
              value: v.id,
              label: v.name,
            })
          })
        }
        setSpecificBudgetList(budgetSelect)
      } else {
        alert.error(`There is some error: ${body.error}`)
      }
    } catch (e) {
      alert.error(`There is some error: ${e.message}`)
    }
  }
  useEffect(() => {
    fetchSpecificBudgetList()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <div className="content-wrapper">
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Transactions Edit</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item active"><Link to="/transactions/daily">Transactions</Link></li>
                  <li className="breadcrumb-item active"><Link to={`/transactions/${transactionID}/edit`}>Edit</Link></li>
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
                    <button className="btn btn-xs btn-danger mr-2" onClick={() => executeDeleteTransaction()}>
                      <i className="fa fa-trash"></i> delete
                    </button>
                    <button className="btn btn-xs btn-primary" data-card-widget="collapse">
                      <i className="fas fa-minus"></i>
                    </button>
                  </div>
                </div>
                <div className="card-body">
                  <div className="form-group">
                    <label>Jenis</label> <small className="text-danger"><b>*</b></small>
                    <Select
                      name="direction_type"
                      value={utils.Global()["TRANSACTION_DIRECTION_OPTS"][utils.GetOptsIndexByValue("TRANSACTION_DIRECTION_OPTS", transactionsEditParams.direction_type)]}
                      options={utils.Global()["TRANSACTION_DIRECTION_OPTS"]}
                      onChange={(e) => handleTransactionsParamsChanges(e)}
                    />
                  </div>
                  <div className="form-group" data-select2-id="29">
                    <label>Kategori</label> <small className="text-danger"><b>*</b></small>
                    <Select
                      name="category"
                      options={categoryOptions}
                      value={categoryOptions[utils.GetArrOptsIndexByValue(categoryOptions, transactionsEditParams.category)]}
                      onChange={(e) => handleTransactionsParamsChanges(e)}
                    />
                  </div>
                  <div className="form-group" data-select2-id="29">
                    <label>Untuk Budget?</label>
                    <Select
                      name="monthly_budget_id"
                      options={specificBudgetList}
                      value={specificBudgetList[utils.GetArrOptsIndexByValue(specificBudgetList, transactionsEditParams.monthly_budget_id)]}
                      onChange={(e) => handleTransactionsParamsChanges(e)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Wallet</label> <small className="text-danger"><b>*</b></small>
                    <Select
                      name="group_wallet_id"
                      options={walletOptions}
                      value={walletOptions[utils.GetArrIndexByValue(walletOptions, "value", transactionsEditParams.group_wallet_id)]}
                      onChange={(e) => handleTransactionsParamsChanges(e)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Jumlah</label> <small className="text-danger"><b>*</b></small>
                    {/* <input type="number" className="form-control form-control-sm" name="amount" onChange={(e) => handleTransactionsParamsChanges(e)} value={transactionsEditParams.amount} /> */}
                    <NumberFormat
                      name="amount"
                      className="form-control form-control-sm"
                      value={transactionsEditParams.amount}
                      thousandSeparator={true}
                      prefix={'Rp.'}
                      onValueChange={(values) => setTransactionsEditParams({...transactionsEditParams,"amount": values.value})}
                    />
                  </div>
                  <div className="form-group">
                    <label>Waktu Transaksi</label> <small className="text-danger"><b>*</b></small>
                    <input
                      type="datetime-local"
                      className="form-control form-control-sm"
                      name="transaction_at"
                      onChange={(e) => handleTransactionsParamsChanges(e)}
                      value={(transactionsEditParams.transaction_at || "").split(".")[0]}
                    />
                  </div>
                  <div className="form-group">
                    <label>Nama</label> <small className="text-danger"><b>*</b></small>
                    <input type="text" className="form-control form-control-sm" name="name" onChange={(e) => handleTransactionsParamsChanges(e)} value={transactionsEditParams.name} />
                  </div>
                  <div className="form-group">
                    <label>Deskripsi</label>
                    <textarea className="form-control" rows="3" name="description" onChange={(e) => handleTransactionsParamsChanges(e)} value={transactionsEditParams.description}></textarea>
                  </div>
                  <div className="form-group">
                    <label>Catatan</label>
                    <textarea className="form-control" rows="2" name="note" onChange={(e) => handleTransactionsParamsChanges(e)} value={transactionsEditParams.note}></textarea>
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
        to={`/transactions/${transactionID}/edit`}
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

export default PageTransactionsEdit