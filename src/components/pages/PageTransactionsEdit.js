import React from "react"
import {Link} from "react-router-dom"

function PageTransactionsEdit() {
  return (
    <div>
      <div className="content-wrapper">
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Transactions Edit</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item active"><Link to="/transactions">Transactions</Link></li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        <section className="content">
        </section>
      </div>
    </div>
  )
}

export default PageTransactionsEdit