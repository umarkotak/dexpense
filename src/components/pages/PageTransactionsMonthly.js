import React, {useState,useEffect} from "react"
import {Link} from "react-router-dom"
import {useAlert} from 'react-alert'

import dexpenseApi from "../apis/DexpenseApi"
import utils from "../helper/Utils"
import TransactionMiniNav from "../components/TransactionMiniNav"
import MiniTips from "../components/MiniTips"

var timeNow = new Date()
var beginOfYear, endOfYear
function RecalculateBeginAndEndOfYear(timeObj) {
  beginOfYear = new Date(timeObj.getFullYear(), 0, 1)
  endOfYear = new Date(timeObj.getFullYear() + 1, 0, 1)
  // beginOfYear.setHours(beginOfYear.getHours() - (-new Date().getTimezoneOffset()/60))
  // endOfYear.setHours(endOfYear.getHours() - (-new Date().getTimezoneOffset()/60))
}
RecalculateBeginAndEndOfYear(timeNow)

function PageTransactionsDaily() {
  const alert = useAlert()

  const[grouppedTransactions, setGroupedTransactions] = useState({groupped_transactions: [{month: 1}]})
  const[queryParams, setQueryParams] = useState({
    limit: 1000,
    offset: 0,
    min_date: utils.FormatDateInput(beginOfYear),
    max_date: utils.FormatDateInput(endOfYear),
    group_id: parseInt(localStorage.getItem("DEXPENSE_SESSION_GROUPS_ACTIVE_ID"))
  })

  useEffect(() => {
    fetchTransactionsMonthly()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryParams])

  async function fetchTransactionsMonthly() {
    try {
      const response = await dexpenseApi.TransactionsListMonthly(localStorage.getItem("DEXPENSE_SESSION_TOKEN"), queryParams)
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

  function prevMonth() {
    timeNow.setYear(timeNow.getFullYear() - 1)
    RecalculateBeginAndEndOfYear(timeNow)
    setQueryParams(queryParams => ({...queryParams,
      'min_date': utils.FormatDateInput(beginOfYear),
      'max_date': utils.FormatDateInput(endOfYear),
    }))
}

  function nextMonth() {
    timeNow.setYear(timeNow.getFullYear() + 1)
    RecalculateBeginAndEndOfYear(timeNow)
    setQueryParams(queryParams => ({...queryParams,
      'min_date': utils.FormatDateInput(beginOfYear),
      'max_date': utils.FormatDateInput(endOfYear),
    }))
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
                  <li className="breadcrumb-item active"><Link to="/transactions/monthly">Monthly</Link></li>
                </ol>
              </div>
            </div>
          </div>
        </div> */}

        <section className="content">
          <div className="row">
            <div className="col-12 col-xl-9 mb-4">
              <div className="row max-w-md mx-auto">
                <div className="col-12"><TransactionMiniNav data={{active: "monthly"}} /></div>
                <div className="col-12 mt-1">
                  <div className="text-dark p-1">
                    <button className="btn btn-xs btn-primary" onClick={()=>prevMonth()}><i className="fa fa-arrow-circle-left"></i></button>
                    <b className="mx-1 p-1">{`${timeNow.getFullYear()}`}</b>
                    <button className="btn btn-xs btn-primary ml-1" onClick={()=>nextMonth()}><i className="fa fa-arrow-circle-right"></i></button>
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
                  <div className="col-12" key={`1-${k}`}>
                    <GrouppedMonthlyTransactionCard grouppedTransaction={val} />
                  </div>
                ))}
              </div>
            </div>

            <div className="col-12 col-xl-3">
              <MiniTips />
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

  function GrouppedMonthlyTransactionCard(props) {
    return(
      <div className="bg-light">
        <div className="border-top border-bottom d-flex justify-content-between py-2 px-1">
          <h6 className="my-auto">
            <span className={`bg-secondary rounded px-1`}>{utils.months[props.grouppedTransaction.month-1]}</span>
          </h6>
          <small className="my-auto text-primary">{utils.FormatNumber(props.grouppedTransaction.income)}</small>
          <small className="my-auto text-danger">{utils.FormatNumber(props.grouppedTransaction.outcome)}</small>
        </div>
      </div>
    )
  }
}

export default PageTransactionsDaily
