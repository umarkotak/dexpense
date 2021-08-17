import React, {useState, useEffect} from "react"
import {useHistory, Link} from "react-router-dom"
import {useAlert} from 'react-alert'

import dexpenseApi from "../apis/DexpenseApi"

var qs = require('qs')
function query_offset() {
  return qs.parse(window.location.search, { ignoreQueryPrefix: true }).offset
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
    limit: 10,
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
                
                <div>

                </div>

                <div className="clearfix mt-2">
                  <ul className="pagination pagination-sm m-0 float-right">
                    <li className="page-item">
                      <button
                        className="btn btn-primary mr-2"
                        onClick={() => {history.push(`/transactions?offset=${queryParams.offset - queryParams.limit}`); window.location.reload()}}
                        disabled={queryParams.offset < queryParams.limit}
                      >
                        «
                      </button>
                    </li>
                    <li className="page-item">
                      <button
                        className="btn btn-primary mr-2"
                        onClick={() => {history.push(`/transactions?offset=${queryParams.offset + queryParams.limit}`); window.location.reload()}}
                      >
                        »
                      </button>
                    </li>
                  </ul>
                </div>

                <hr />

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
                          <td>{val.account_id}</td>
                          <td>{val.group_wallet_id}</td>
                          <td>{val.category}</td>
                          <td>{val.amount}</td>
                          <td>{val.direction_type}</td>
                          <td>{val.transaction_at}</td>
                          <td>{val.name}</td>
                          <td>{val.description}</td>
                          <td>{val.note}</td>
                          <td>{val.created_at}</td>
                          <td>action</td>
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
}

export default PageTransactions
