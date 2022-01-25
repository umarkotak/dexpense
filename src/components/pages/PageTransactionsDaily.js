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

function PageTransactionsDaily() {
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
                  <li className="breadcrumb-item active"><Link to="/transactions/daily">Daily</Link></li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        <section className="content">
          <div className="row">
            <div className="col-12">
              <TransactionNav data={{active: "daily"}} />
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

  function TransactionNav(props) {
    return(
      <nav className="navbar navbar-expand navbar-dark p-1 rounded">
        <ul className="navbar-nav">
          <li className="nav-item d-sm-inline-block">
            <Link to="/transactions/daily" className={`nav-link p-1 ${props.data.active === "daily" ? "text-lime" : ""}`}>Harian</Link>
          </li>
          <li className="nav-item d-sm-inline-block">
            <Link to="/transactions/calendar" className={`nav-link p-1 ${props.data.active === "calendar" ? "text-lime" : ""}`}>Kalender</Link>
          </li>
          <li className="nav-item d-sm-inline-block">
            <Link to="/transactions/weekly" className={`nav-link p-1 ${props.data.active === "weekly" ? "text-lime" : ""}`}>Mingguan</Link>
          </li>
          <li className="nav-item d-sm-inline-block">
            <Link to="/transactions/monthly" className={`nav-link p-1 ${props.data.active === "monthly" ? "text-lime" : ""}`}>Bulanan</Link>
          </li>
          <li className="nav-item d-sm-inline-block">
            <Link to="/transactions/total" className={`nav-link p-1 ${props.data.active === "total" ? "text-lime" : ""}`}>Total</Link>
          </li>
        </ul>
      </nav>
    )
  }
}

export default PageTransactionsDaily
