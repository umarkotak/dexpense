import React, {} from "react"
import {Link} from "react-router-dom"

function PageTransactionsDaily() {
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
