import React from "react"
import {Link} from "react-router-dom"

function TransactionMiniNav(props) {
  var activeClass = "text-bold text-primary border-top border-left border-right"

  return(
    <div className="rounded d-flex justify-content-between py-0 border-bottom" >
      <Link to="/transactions/daily" className={`pb-0 pt-1 px-1 rounded ${props.data.active === "daily" ? activeClass : "text-dark"}`}>Harian</Link>
      <Link to="/transactions/calendar" className={`pb-0 pt-1 px-1 rounded ${props.data.active === "calendar" ? activeClass : "text-dark"}`}>Kalender</Link>
      <Link to="/transactions/weekly" className={`pb-0 pt-1 px-1 rounded ${props.data.active === "weekly" ? activeClass : "text-dark"}`}>Mingguan</Link>
      <Link to="/transactions/monthly" className={`pb-0 pt-1 px-1 rounded ${props.data.active === "monthly" ? activeClass : "text-dark"}`}>Bulanan</Link>
      <Link to="/transactions/total" className={`pb-0 pt-1 px-1 rounded ${props.data.active === "total" ? activeClass : "text-dark"}`}>Total</Link>
    </div>
  )
}

export default TransactionMiniNav
