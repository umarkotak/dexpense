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

function PageTransactions() {
  const history = useHistory()
  const alert = useAlert()
  
  useEffect(() => {
    fetchTransactions()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [transactions, setTransactions] = useState([])
  
  const [queryParams, setQueryParams] = useState({
    limit: parseInt(query_limit()) || 10,
    offset: parseInt(query_offset()) || 0,
    group_id: parseInt(localStorage.getItem("DEXPENSE_SESSION_GROUPS_ACTIVE_ID")),
  })
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
                <div className="card-header">
                  <h3 className="card-title">History</h3>
                  <div className="card-tools">
                    <button type="button" className="btn btn-primary btn-xs" data-card-widget="collapse">
                      <i className="fas fa-minus"></i>
                    </button>
                  </div>
                </div>
                
                <div className="clearfix mt-2">
                  <ul className="pagination pagination-sm m-0 float-right">
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

                <div className="overflow-auto">
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Akun</th>
                        <th>Wallet</th>
                        <th>Kategori</th>
                        <th>Jumlah</th>
                        <th>Jenis</th>
                        <th>Waktu</th>
                        <th>Nama</th>
                        <th>Deskripsi</th>
                        <th>Catatan</th>
                        <th>Dibuat</th>
                        <th>Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {transactions.map((val, k) => (
                        <tr key={val.id}>
                          <td>{val.id}</td>
                          <td>{val.account.username}</td>
                          <td>{val.group_wallet.name}</td>
                          <td>{val.category}</td>
                          <td>{val.amount}</td>
                          <td>{DirectionBuilder(val.direction_type)}</td>
                          <td><button className="btn btn-default btn-xs">{utils.FormatDateTime(val.transaction_at)}</button></td>
                          <td>{val.name}</td>
                          <td>{val.description}</td>
                          <td>{val.note}</td>
                          <td><button className="btn btn-default btn-xs">{utils.FormatDateTime(val.created_at)}</button></td>
                          <td>{TransactionActionBuilder(val.id)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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

export default PageTransactions
