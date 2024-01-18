import React, {useState,useEffect,useRef} from "react"
import {Link} from "react-router-dom"
import {useAlert} from 'react-alert'

import dexpenseApi from "../apis/DexpenseApi"
import utils from "../helper/Utils"
import TransactionMiniNav from "../components/TransactionMiniNav"
import MiniTips from "../components/MiniTips"

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
  const[grouppedTransactionsLastMonth, setGroupedTransactionsLastMonth] = useState({groupped_transactions: [{transactions: []}]})
  const[queryParams, setQueryParams] = useState({
    limit: 1000,
    offset: 0,
    min_date: utils.FormatDateInput(beginOfMonth),
    max_date: utils.FormatDateInput(endOfMonth),
    group_id: parseInt(localStorage.getItem("DEXPENSE_SESSION_GROUPS_ACTIVE_ID"))
  })
  const[transactionSummary, setTransactionSummary] = useState([])

  useEffect(() => {
    fetchTransactionsDaily()
    fetchTransactionsDailyLastMonth()
    fetchTransactionsSummary()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryParams])

  async function fetchTransactionsDaily() {
    try {
      const response = await dexpenseApi.TransactionsListDaily(localStorage.getItem("DEXPENSE_SESSION_TOKEN"), queryParams)
      const status = response.status
      const body = await response.json()

      if (status === 200) {
        setGroupedTransactions(body.data)
      } else {
        alert.error(`There is some error: ${body.error}`)
      }
    } catch (e) {
      alert.error(`There is some error: ${e.message}`)
    }
  }

  async function fetchTransactionsDailyLastMonth() {
    try {
      var timeObj = timeNow
      var tempBeginOfMonth = new Date(timeObj.getFullYear(), timeObj.getMonth() - 1)
      var tempEndOfMonth = new Date(timeObj.getFullYear(), timeObj.getMonth(), 1)
      var lastMonthParams = {
        limit: 1000,
        offset: 0,
        min_date: utils.FormatDateInput(tempBeginOfMonth),
        max_date: utils.FormatDateInput(tempEndOfMonth),
        group_id: parseInt(localStorage.getItem("DEXPENSE_SESSION_GROUPS_ACTIVE_ID"))
      }
      const response = await dexpenseApi.TransactionsListDaily(localStorage.getItem("DEXPENSE_SESSION_TOKEN"), lastMonthParams)
      const status = response.status
      const body = await response.json()

      if (status === 200) {
        setGroupedTransactionsLastMonth(body.data)
      } else {
        alert.error(`There is some error: ${body.error}`)
      }
    } catch (e) {
      alert.error(`There is some error: ${e.message}`)
    }
  }

  async function fetchTransactionsSummary() {
    try {
      const response = await dexpenseApi.TransactionsSummary(localStorage.getItem("DEXPENSE_SESSION_TOKEN"), queryParams)
      const status = response.status
      const body = await response.json()

      if (status === 200) {
        console.warn("TX SUM",body.data)
        setTransactionSummary(body.data)
      } else {
        alert.error(`There is some error: ${body.error}`)
      }
    } catch (e) {
      alert.error(`There is some error: ${e.message}`)
    }
  }

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

  const downloadFileRef = useRef(null)
  async function downloadTransactions() {
    var newQ = {
      limit: 1000,
      offset: 0,
      min_date: utils.FormatDateInput(beginOfMonth),
      max_date: utils.FormatDateInput(endOfMonth),
      group_id: parseInt(localStorage.getItem("DEXPENSE_SESSION_GROUPS_ACTIVE_ID"))
    }

    try {
      const response = await dexpenseApi.TransactionsDownload(localStorage.getItem("DEXPENSE_SESSION_TOKEN"), newQ)
      const status = response.status

      if (status === 200) {
        const blob = await response.blob()
        const href = window.URL.createObjectURL(blob)
        const link = downloadFileRef.current
        link.download = 'summary.csv'
        link.href = href
        link.click()
        link.href = '.'
      } else {
        const text = await response.text()
        alert.error(`There is some error: ${text}`)
      }
    } catch (e) {
      alert.error(`There is some error: ${e.message}`)
    }
  }

  return (
    <div>
      <div className="content-wrapper pt-2" style={{
        backgroundColor: "#E3EDF2",
      }}>
        {/* <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Transactions</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item active"><Link to="/transactions/daily">Transaction</Link></li>
                  <li className="breadcrumb-item active"><Link to="/transactions/total">Summary</Link></li>
                </ol>
              </div>
            </div>
          </div>
        </div> */}

        <section className="content">
          <div className="row">
            <div className="col-12 col-xl-9 mb-4">
              <div className="row max-w-md mx-auto">
                <div className="col-12"><TransactionMiniNav data={{active: "total"}} /></div>
                <div className="col-12 mt-1">
                  <div className="text-dark p-1">
                    <button className="btn btn-xs btn-primary" onClick={()=>prevMonth()}><i className="fa fa-arrow-circle-left"></i></button>
                    <b className="mx-1 p-1">{`${utils.months[timeNow.getMonth()]} ${timeNow.getFullYear()}`}</b>
                    <button className="btn btn-xs btn-primary ml-1" onClick={()=>nextMonth()}><i className="fa fa-arrow-circle-right"></i></button>
                    <a className="float-right" style={{display: "none"}} href="." ref={downloadFileRef} target="_blank">_</a>
                  </div>
                </div>

                <div className="col-12 mt-2">
                  <div className="border rounded p-1">
                    <p className="d-flex justify-content-between mb-1">
                      <span className="text-primary">Pemasukan bulan ini</span>
                      <span className="text-primary">{utils.FormatNumber(grouppedTransactions.income)}</span>
                    </p>
                    <p className="d-flex justify-content-between mb-1">
                      <span className="text-danger">Pengeluaran bulan ini</span>
                      <span className="text-danger">{utils.FormatNumber(grouppedTransactions.outcome)}</span>
                    </p>
                    <p className="d-flex justify-content-between mb-1">
                      <span className="">Total</span>
                      <span>{utils.FormatNumber(grouppedTransactions.total)}</span>
                    </p>
                  </div>
                </div>

                <div className="col-12 mt-2">
                  <div className="border rounded p-1">
                    <p className="d-flex justify-content-between mb-1">
                      <span className="text-danger">Pengeluaran bulan kemarin</span>
                      <span className="text-danger">{utils.FormatNumber(grouppedTransactionsLastMonth.outcome)}</span>
                    </p>
                  </div>
                </div>

                <div className="col-12 mt-2">
                  <div className="flex justify-end">
                    <button className="btn btn-sm btn-primary" style={{borderRadius: "23px"}} onClick={() => downloadTransactions()}>
                      <i className="fa fa-download"></i> Download Summary
                    </button>
                  </div>
                </div>

                <div className="col-12">
                  <table className="table table-bordered mt-2">
                    <thead>
                      <tr>
                        <th className="p-1">Kategori</th>
                        <th className="p-1">Jumlah</th>
                        <th className="p-1">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {transactionSummary.map((oneTransaction, idx) => (
                        <tr key={idx}>
                          <td className="p-1">{oneTransaction.category}</td>
                          <td className="p-1">{oneTransaction.count}</td>
                          <td className={`p-1 ${oneTransaction.direction_type === "outcome" ? "text-danger" : "text-success"}`}>{utils.FormatNumber(oneTransaction.amount)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="col-12 col-xl-3">
              <div className="w-full flex justify-center">
                <MiniTips />
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

export default PageTransactionsDaily
