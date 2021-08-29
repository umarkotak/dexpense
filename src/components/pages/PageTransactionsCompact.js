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

  const [queryParams, setQueryParams] = useState({
    limit: parseInt(query_limit()) || 10,
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
      console.log(transactionID)
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
                  <li className="breadcrumb-item active"><Link to="/transactions">Transaction</Link></li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        <section className="content">
          <div className="row">
            <div className="col-12">
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
                  <div className="row mx-0">
                    {transactions.map((val, k) => (
                      <div className={`border rounded col-12 my-1 py-1 ${val.direction_type === "outcome" ? "border-danger" : "border-primary"}`} key={val.id}>
                        <div className="row">
                          <div className="col-2">{val.category}</div>
                          <div className="col-3">{val.account.username}</div>
                          <div className="col-3">{val.group_wallet.name}</div>
                          <div className="col-4">{utils.FormatNumber(parseInt(val.amount))}</div>
                        </div>
                        <hr className="my-0" />
                        <div className="row">
                          <div className="col-12">{val.name} | {val.note}</div>
                        </div>
                        <hr className="my-0" />
                        <div className="row">
                          <div className="col-6"><button className="btn btn-default btn-xs">{utils.FormatDateTime(val.transaction_at)}</button></div>
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

  function DirectionBuilder(directionType) {
    if (directionType === "outcome") {
      return(<button className="btn btn-xs btn-danger" disabled>pengeluaran</button>)
    } else {
      return(<button className="btn btn-xs btn-success" disabled>pemasukan</button>)
    }
  }

  function TransactionActionBuilder(transactionId) {
    return(
      <div>
        <button className="btn btn-xs btn-primary mr-1">edit</button>
        <button className="btn btn-xs btn-danger">delete</button>
      </div>
    )
  }
}

export default PageTransactionsCompact
