import React, {useState,useEffect,useRef} from "react"
import {Link} from "react-router-dom"
import {useAlert} from 'react-alert'

import dexpenseApi from "../apis/DexpenseApi"
import utils from "../helper/Utils"
import TransactionMiniNav from "../components/TransactionMiniNav"


var timeNow = new Date()
var beginOfMonth, endOfMonth
function RecalculateBeginAndEndOfMonth(timeObj) {
  beginOfMonth = new Date(timeObj.getFullYear(), timeObj.getMonth(), 1)
  endOfMonth = new Date(timeObj.getFullYear(), timeObj.getMonth() + 1, 1)
  beginOfMonth.setMinutes(beginOfMonth.getMinutes() - (-new Date().getTimezoneOffset()/60))
  endOfMonth.setMinutes(endOfMonth.getMinutes() - (-new Date().getTimezoneOffset()/60))
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

  useEffect(() => {
    fetchTransactionsDaily()
    fetchTransactionsDailyLastMonth()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryParams])

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

  async function fetchTransactionsDailyLastMonth() {
    try {
      var timeObj = timeNow
      console.log(timeObj)
      var lastMonthParams = queryParams
      var tempBeginOfMonth = new Date(timeObj.getFullYear(), timeObj.getMonth() - 1)
      var tempEndOfMonth = new Date(timeObj.getFullYear(), timeObj.getMonth(), 1)
      lastMonthParams.min_date = utils.FormatDateInput(tempBeginOfMonth)
      lastMonthParams.max_date = utils.FormatDateInput(tempEndOfMonth)
      const response = await dexpenseApi.TransactionsListDaily(localStorage.getItem("DEXPENSE_SESSION_TOKEN"), lastMonthParams)
      const status = response.status
      const body = await response.json()
      // console.log(body)

      if (status === 200) {
        setGroupedTransactionsLastMonth(body.data)
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
    try {
      const response = await dexpenseApi.TransactionsDownload(localStorage.getItem("DEXPENSE_SESSION_TOKEN"), queryParams)
      const status = response.status

      if (status === 200) {
        const blob = await response.blob()
        const href = window.URL.createObjectURL(blob)
        const link = downloadFileRef.current
        console.log(link)
        link.download = 'summary.csv'
        link.href = href
        console.log("hello")
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
                  <li className="breadcrumb-item active"><Link to="/transactions/total">Summary</Link></li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        <section className="content">
          <div className="row">
            <div className="col-12"><TransactionMiniNav data={{active: "total"}} /></div>
            <div className="col-12 mt-1">
              <div>
                <button className="btn btn-xs btn-primary" onClick={()=>prevMonth()}><i className="fa fa-arrow-circle-left"></i></button>
                <button className="ml-1 btn btn-xs text-black" disabled>{`${utils.months[timeNow.getMonth()]} ${timeNow.getFullYear()}`}</button>
                <button className="btn btn-xs btn-primary ml-1" onClick={()=>nextMonth()}><i className="fa fa-arrow-circle-right"></i></button>
                <a className="float-right" style={{display: "none"}} href="." ref={downloadFileRef} target="_blank">_</a>
              </div>
            </div>
          </div>

          <div className="row">
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
          </div>

          <div className="row">
            <div className="col-lg-4 col-12 mt-2">
            </div>
            <div className="col-lg-4 col-12 mt-2">
            </div>
            <div className="col-lg-4 col-12 mt-2">
              <button className="btn btn-sm btn-block btn-primary" style={{borderRadius: "23px"}} onClick={() => downloadTransactions()}>
                <i className="fa fa-download"></i> Download Summary
              </button>
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
