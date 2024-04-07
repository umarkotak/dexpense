import React, {useState,useEffect} from "react"
import {Link} from "react-router-dom"
import {useAlert} from 'react-alert'
import Select from 'react-select'

import dexpenseApi from "../apis/DexpenseApi"
import utils from "../helper/Utils"
import TransactionMiniNav from "../components/TransactionMiniNav"
import MiniTips from "../components/MiniTips"
import HomeTransactionBar from "../components/HomeTransactionBar"

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
      <div className="content-wrapper pt-2" style={{
        backgroundColor: "#E3EDF2",
      }}>
        <section className="content">
          <div className="row">
            <div className="col-12 col-xl-9 mb-4">
              <div className="row max-w-md mx-auto">
                <div className="col-12"><TransactionMiniNav data={{active: "daily"}} /></div>
                <div className="col-12 mt-1">
                  <div className="text-dark p-1">
                    <button className="rounded-lg btn btn-xs btn-primary" onClick={()=>prevMonth()}><i className="fa fa-arrow-circle-left"></i></button>
                    <b className="mx-1 p-1">{`${utils.months[timeNow.getMonth()]} ${timeNow.getFullYear()}`}</b>
                    <button className="rounded-lg btn btn-xs btn-primary ml-1" onClick={()=>nextMonth()}><i className="fa fa-arrow-circle-right"></i></button>
                    <button className="rounded-lg btn btn-xs btn-primary float-right" data-toggle="modal" data-target="#modal-default"><i className="fa fa-bars mr-1"></i>Filter</button>
                  </div>
                </div>
                <div className="col-12 mt-1">
                  <div className="d-flex justify-content-between">
                    <div className="bg-white rounded-xl p-1 border"><small className="text-primary">{utils.FormatNumber(grouppedTransactions.income)}</small></div>
                    <div className="bg-white rounded-xl p-1 border"><small className="text-danger">{utils.FormatNumber(grouppedTransactions.outcome)}</small></div>
                    <div className="bg-white rounded-xl p-1 border"><small>{utils.FormatNumber(grouppedTransactions.total)}</small></div>
                  </div>
                </div>

                {grouppedTransactions.groupped_transactions.map((val, k) => (
                  <div className="mt-2" key={`1-${k}`}>
                    <HomeTransactionBar grouppedTransaction={val} />
                  </div>
                ))}
              </div>
            </div>
            <div className="col-12 col-xl-3">
              <div className="w-full flex justify-center">
                <MiniTips />
              </div>
            </div>
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
}

export default PageTransactionsDaily
