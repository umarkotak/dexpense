import React, {useState,useEffect} from "react"
import {Link} from "react-router-dom"
import {useAlert} from 'react-alert'
import Select from 'react-select'

import dexpenseApi from "../apis/DexpenseApi"
import utils from "../helper/Utils"
import TransactionMiniNav from "../components/TransactionMiniNav"


var timeNow = new Date()
var beginOfMonth, endOfMonth
function RecalculateBeginAndEndOfMonth(timeObj) {
  beginOfMonth = new Date(timeObj.getFullYear(), timeObj.getMonth(), 1)
  endOfMonth = new Date(timeObj.getFullYear(), timeObj.getMonth() + 1, 1)
  beginOfMonth.setHours(beginOfMonth.getHours() - (-new Date().getTimezoneOffset()/60))
  endOfMonth.setHours(endOfMonth.getHours() - (-new Date().getTimezoneOffset()/60))
}
RecalculateBeginAndEndOfMonth(timeNow)

function PageTransactionsDaily() {
  const alert = useAlert()

  const[grouppedTransactions, setGroupedTransactions] = useState({groupped_transactions: [{transactions: []}]})
  const[queryParams, setQueryParams] = useState({
    limit: 1000,
    offset: 0,
    min_date: utils.FormatDateInput(beginOfMonth),
    max_date: utils.FormatDateInput(endOfMonth),
    group_id: parseInt(localStorage.getItem("DEXPENSE_SESSION_GROUPS_ACTIVE_ID")),
    "category": "all",
    "group_wallet_id": 0,
    "direction_type": "all"
  })

  function handleTransactionsParamsChanges(e) {
    try {
      const { name, value } = e.target
      setQueryParams(queryParams => ({...queryParams, [name]: value}))
    } catch (err) {
      setQueryParams(queryParams => ({...queryParams, [e.name]: e.value}))
    }
  }

  async function fetchTransactionsDaily() {
    try {
      const response = await dexpenseApi.TransactionsListDaily(localStorage.getItem("DEXPENSE_SESSION_TOKEN"), queryParams)
      const status = response.status
      const body = await response.json()
      console.log(body)

      if (status === 200) {
        setGroupedTransactions(body.data)
      } else {
        alert.error(`There is some error: ${body.error}`)
      }
    } catch (e) {
      alert.error(`There is some error: ${e.message}`)
    }
  }
  useEffect(() => {
    fetchTransactionsDaily()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryParams])

  function prevMonth() {
    timeNow.setMonth(timeNow.getMonth() - 1)
    RecalculateBeginAndEndOfMonth(timeNow)
    setQueryParams(queryParams => ({...queryParams,
      'min_date': utils.FormatDateInput(beginOfMonth),
      'max_date': utils.FormatDateInput(endOfMonth),
    }))
}

  function nextMonth() {
    timeNow.setMonth(timeNow.getMonth() + 1)
    RecalculateBeginAndEndOfMonth(timeNow)
    setQueryParams(queryParams => ({...queryParams,
      'min_date': utils.FormatDateInput(beginOfMonth),
      'max_date': utils.FormatDateInput(endOfMonth),
    }))
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

      console.log("fetchWalletOptions", status, body)

      if (status === 200) {
        var baseWalletOptions = [{ name: 'group_wallet_id', value: 0, label: 'All', balance: 0 }]
        var tempWalletOptions = body.data.group_wallets.map((v, k) => {
          return { name: 'group_wallet_id', value: v.id, label: v.name, balance: v.amount }
        })
        setWalletOptions(baseWalletOptions.concat(tempWalletOptions))
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

  function applyFilter() {

  }

  return (
    <div>
      <div className="content-wrapper">
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Transactions</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item active"><Link to="/transactions/daily">Transaction</Link></li>
                  <li className="breadcrumb-item active"><Link to="/transactions/daily">Daily</Link></li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        <section className="content">
          <div className="row">
            <div className="col-12"><TransactionMiniNav data={{active: "daily"}} /></div>
            <div className="col-12 mt-1">
              <div>
                <button className="btn btn-xs btn-primary" onClick={()=>prevMonth()}><i className="fa fa-arrow-circle-left"></i></button>
                <button className="ml-1 btn btn-xs text-black" disabled>{`${utils.months[timeNow.getMonth()]} ${timeNow.getFullYear()}`}</button>
                <button className="btn btn-xs btn-primary ml-1" onClick={()=>nextMonth()}><i className="fa fa-arrow-circle-right"></i></button>
                <button className="btn btn-xs btn-primary float-right" data-toggle="modal" data-target="#modal-default"><i className="fa fa-bars"></i></button>
              </div>
            </div>
            <div className="col-12 mt-1">
              <div className="d-flex justify-content-between">
                <small className="text-primary">{utils.FormatNumber(grouppedTransactions.income)}</small>
                <small className="text-danger">{utils.FormatNumber(grouppedTransactions.outcome)}</small>
                <small>{utils.FormatNumber(grouppedTransactions.total)}</small>
              </div>
            </div>

            {grouppedTransactions.groupped_transactions.map((val, k) => (
              <div className="col-12 mt-2" key={`1-${k}`}>
                <GrouppedTransactionCard grouppedTransaction={val} />
              </div>
            ))}
          </div>
        </section>

        <div className="modal fade" id="modal-default" aria-modal="true" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header p-2">
                <h4 className="modal-title">Filter</h4>
                <button className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
              </div>
              <div className="modal-body p-2">
                <div className="row">
                  <div className="col-12">
                    <div className="form-group">
                      <label>Jenis</label>
                      <Select
                        defaultValue={utils.GlobalFilter()["TRANSACTION_DIRECTION_FILTER_OPTS"][0]}
                        options={utils.GlobalFilter()["TRANSACTION_DIRECTION_FILTER_OPTS"]}
                        onChange={(e) => handleTransactionsParamsChanges(e)}
                      />
                    </div>
                    <div className="form-group" data-select2-id="29">
                      <label>Kategori</label>
                      <Select
                        name="category"
                        defaultValue={utils.GlobalFilter()["TRANSACTION_CATEGORY_ALL_FILTER_OPTS"][0]}
                        options={utils.GlobalFilter()["TRANSACTION_CATEGORY_ALL_FILTER_OPTS"]}
                        onChange={(e) => handleTransactionsParamsChanges(e)}
                      />
                    </div>
                    <div className="form-group">
                    <label>Wallet</label>
                    <Select
                      name="group_wallet_id"
                      options={walletOptions}
                      onChange={(e) => handleTransactionsParamsChanges(e)}
                    />
                  </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer justify-content-between p-2">
                <button className="btn btn-sm btn-default" data-dismiss="modal">Close</button>
                <button className="btn btn-sm btn-primary" data-dismiss="modal" onClick={() => applyFilter()}><i className="fa fa-check"></i> Aplly Filter</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Link
        to="/transactions/create"
        className="bg-primary"
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
        <i className="fa fa-plus my-float" style={{marginTop:"17px"}}></i>
      </Link>
    </div>
  )

  function GrouppedTransactionCard(props) {
    return(
      <div className="bg-light">
        <div className="border-top border-bottom d-flex justify-content-between py-1 px-1">
          <h6 className="my-auto">
            {props.grouppedTransaction.day} <span className="bg-secondary rounded px-1">{props.grouppedTransaction.day_name}</span>
            <small> {props.grouppedTransaction.month}.{props.grouppedTransaction.year}</small>
          </h6>
          <small className="my-auto text-primary">{utils.FormatNumber(props.grouppedTransaction.income)}</small>
          <small className="my-auto text-danger">{utils.FormatNumber(props.grouppedTransaction.outcome)}</small>
        </div>
        <div className="px-1">
          {props.grouppedTransaction.transactions.map((val, k) => (
            <div className="border-bottom d-flex justify-content-between py-0" key={`2-${k}`}>
              <small className="my-auto" style={{width: "25%"}}>{val.category}</small>
              <small className="my-auto text-left" style={{width: "50%"}}>
                {val.name}
                <br />
                {val.account.username} . {val.group_wallet.name}
              </small>
              <Link to={`/transactions/${val.id}/edit`} className="my-auto text-right" style={{width: "25%"}}>
                <small className={`${val.direction_type === "income" ? "text-primary" : "text-danger"}`}>
                  {utils.FormatNumber(val.amount)}
                </small>
              </Link>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

export default PageTransactionsDaily
