import React, {useState, useEffect} from "react"
import {useHistory, Link} from "react-router-dom"
import {useAlert} from 'react-alert'

import dexpenseApi from "../apis/DexpenseApi"
import utils from "../helper/Utils"

var qs = require('qs')
function query_offset() {
  return qs.parse(window.location.search, { ignoreQueryPrefix: true }).offset
}
function query_limit() {
  return qs.parse(window.location.search, { ignoreQueryPrefix: true }).limit
}

function PageTransactionsCompact() {
  const history = useHistory()
  const alert = useAlert()

  const [transactions, setTransactions] = useState([])
  const [transactionsBreakdownOut, setTransactionsBreakdownOut] = useState({})
  const [transactionsBreakdownIn, setTransactionsBreakdownIn] = useState({})
  const [transactionBreakdownSummary, setTransactionBreakdownSummary] = useState({})

  const [queryParams, setQueryParams] = useState({
    limit: parseInt(query_limit()) || 100,
    offset: parseInt(query_offset()) || 0,
    group_id: parseInt(localStorage.getItem("DEXPENSE_SESSION_GROUPS_ACTIVE_ID")),
  })

  useEffect(() => {
    fetchTransactions()
    if (false) { setQueryParams() }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function fetchTransactions() {
    try {
      const response = await dexpenseApi.TransactionsList(localStorage.getItem("DEXPENSE_SESSION_TOKEN"), queryParams)
      const status = response.status
      const body = await response.json()

      if (status === 200) {
        setTransactions(body.data)
        breakdownTransactions(body.data)
      } else {
        alert.error(`There is some error: ${body.error}`)
      }
    } catch (e) {
      alert.error(`There is some error: ${e.message}`)
    }
  }

  async function executeDeleteTransaction(transactionID) {
    try {
      if (!window.confirm("Are you sure?")) { return }

      const response = await dexpenseApi.TransactionsDelete(localStorage.getItem("DEXPENSE_SESSION_TOKEN"), {id: transactionID})
      const status = response.status
      const body = await response.json()

      if (status === 200) {
        fetchTransactions()
        alert.success(`Delete transaction success!`)
      } else {
        alert.error(`There is some error: ${body.error}`)
      }
    } catch (e) {
      alert.error(`There is some error: ${e.message}`)
    }
  }

  function breakdownTransactions(transactionList) {
    if (!transactionList) { return }
    var tempTransactionsBreakdownOut = {}
    var tempTransactionsBreakdownIn = {}
    var tempGrandTotalOut = 0
    var tempGrandTotalIn = 0
    transactionList.forEach((val, idx) => {
      if (val.direction_type === "outcome") {
        tempTransactionsBreakdownOut[val.category] = tempTransactionsBreakdownOut[val.category] || {"count": 0, "total": 0}
        tempTransactionsBreakdownOut[val.category] = {
          "count": tempTransactionsBreakdownOut[val.category]["count"] + 1,
          "total": tempTransactionsBreakdownOut[val.category]["total"] + val.amount
        }
        tempGrandTotalOut += val.amount
      } else {
        tempTransactionsBreakdownIn[val.category] = tempTransactionsBreakdownIn[val.category] || {"count": 0, "total": 0}
        tempTransactionsBreakdownIn[val.category] = {
          "count": tempTransactionsBreakdownIn[val.category]["count"] + 1,
          "total": tempTransactionsBreakdownIn[val.category]["total"] + val.amount
        }
        tempGrandTotalIn += val.amount
      }
    })
    setTransactionsBreakdownOut(tempTransactionsBreakdownOut)
    setTransactionsBreakdownIn(tempTransactionsBreakdownIn)
    setTransactionBreakdownSummary({
      "grand_total_out": tempGrandTotalOut,
      "grand_total_in": tempGrandTotalIn,
    })
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
                  <li className="breadcrumb-item active"><Link to="/transactions">Transaction</Link></li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        <section className="content">
          <div className="row">
            <div className="col-12 col-xl-6">
              <div className="card card-primary card-outline">
                <div className="clearfix mt-2">
                  <ul className="pagination pagination-sm m-0 float-right">
                    <li className="page-item mr-2">
                      <Link to="/transactions/detailed" type="button" className="btn btn-primary btn-sm"><i className="fas fa-info-circle"></i> Detail</Link>
                    </li>
                    <li className="page-item mr-2">
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => {history.push(`/transactions?offset=${queryParams.offset - queryParams.limit}`); window.location.reload()}}
                        disabled={queryParams.offset < queryParams.limit}
                      >
                        <i className="fa fa-arrow-circle-left"></i>
                      </button>
                    </li>
                    <li className="page-item mr-2">
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => {history.push(`/transactions?offset=${queryParams.offset + queryParams.limit}`); window.location.reload()}}
                      >
                        <i className="fa fa-arrow-circle-right"></i>
                      </button>
                    </li>
                  </ul>
                </div>

                <hr className="my-2" />

                <div className="card-body px-0 py-1">
                  <div className="row mx-0 p-1">
                    {transactions.map((val, k) => (
                      <div className={`border rounded col-12 my-1 py-1 ${val.direction_type === "income" ? "border-success" : "border-danger"}`} key={val.id}>
                        <div className="row">
                          <div className="col-3">
                            <small className={val.direction_type === "income" ? "badge badge-pill badge-success mr-1" : "badge badge-pill badge-danger mr-1"}>
                              <i className={val.direction_type === "income" ? "fa fa-arrow-down" : "fa fa-arrow-up"}></i>
                            </small>
                          </div>
                          <div className="col-3"><small className="badge badge-pill badge-warning mr-1">{val.account.username}</small></div>
                          <div className="col-3"><small className="badge badge-pill badge-info mr-1">{val.group_wallet.name}</small></div>
                          <div className="col-3"><small className="badge badge-pill badge-info mr-1">{utils.FormatNumber(parseInt(val.amount))}</small></div>
                        </div>
                        <div className="row">
                          <div className="col-12">
                            <small className="badge badge-pill badge-primary mr-1">{val.category}</small>
                            <small className="badge badge-pill bg-fuchsia mr-1">{val.name}</small>
                            <small className="badge badge-pill bg-fuchsia mr-1">{val.description}</small>
                            <small className="badge badge-pill bg-fuchsia mr-1">{val.note}</small>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-6"><small className="badge badge-pill badge-secondary">{utils.FormatDateTime(val.transaction_at)}</small></div>
                          <div className="col-6">
                            <button to="/transactions" className="btn btn-xs btn-danger float-right" onClick={() => executeDeleteTransaction(val.id)}><i></i> delete</button>
                            <Link to={`/transactions/${val.id}/edit`} className="btn btn-xs btn-primary float-right mr-2"><i></i> edit</Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 col-xl-6">
              <div className="card card-primary card-outline">
                <div className="clearfix mt-2">
                  <b className="mx-2">Transactions Breakdown</b>
                  <ul className="pagination pagination-sm m-0 float-right">
                    <li className="page-item mr-2">
                      <button className="btn btn-sm btn-primary">
                        <i className="fa fa-info-circle"></i>
                      </button>
                    </li>
                  </ul>
                </div>

                <hr className="my-2" />

                <div className="card-body px-0 py-1">
                  <div className="row mx-0 p-1">
                    <div className="col-12"><h4><i className="fa fa-arrow-up"></i> Pengeluaran</h4></div>
                  </div>
                  <div className="row mx-0 p-1">
                    <div className="col-12 my-1">
                      <table className="table">
                        <thead>
                          <tr>
                            <th className="p-1">Kategori</th>
                            <th className="p-1">Jumlah</th>
                            <th className="p-1">Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          {Object.keys(transactionsBreakdownOut).map((val) => (
                            <tr id={`out-${val}`}>
                              <td className="p-1">{val}</td>
                              <td className="p-1">{transactionsBreakdownOut[val].count}</td>
                              <td className="p-1">{utils.FormatNumber(transactionsBreakdownOut[val].total)}</td>
                            </tr>
                          ))}
                          <tr>
                            <td className="p-1"></td>
                            <td className="p-1"><b>Grand Total</b></td>
                            <td className="p-1">{utils.FormatNumber(transactionBreakdownSummary["grand_total_out"] || 0)}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="row mx-0 p-1">
                    <div className="col-12"><h4><i className="fa fa-arrow-down"></i> Pemasukan</h4></div>
                  </div>
                  <div className="row mx-0 p-1">
                    <div className="col-12 my-1">
                      <table className="table">
                        <thead>
                          <tr>
                            <th className="p-1">Kategori</th>
                            <th className="p-1">Jumlah</th>
                            <th className="p-1">Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          {Object.keys(transactionsBreakdownIn).map((val) => (
                            <tr id={`out-${val}`}>
                              <td className="p-1">{val}</td>
                              <td className="p-1">{transactionsBreakdownIn[val].count}</td>
                              <td className="p-1">{utils.FormatNumber(transactionsBreakdownIn[val].total)}</td>
                            </tr>
                          ))}
                          <tr>
                            <td className="p-1"></td>
                            <td className="p-1"><b>Grand Total</b></td>
                            <td className="p-1">{utils.FormatNumber(transactionBreakdownSummary["grand_total_in"] || 0)}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
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
}

export default PageTransactionsCompact
