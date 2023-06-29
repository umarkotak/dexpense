import React from "react"
import {Link} from "react-router-dom"

function TransactionMiniNav(props) {
  var activeClass = "bg-primary text-light"

  return(
    <div className="rounded-pill d-flex justify-content-between px-3 py-1" style={{borderWidth: "1px 1px 2px 1px", borderStyle: "solid", backgroundColor: "white"}} >
      <Link to="/transactions/daily" className={`py-1 px-2 rounded-pill ${props.data.active === "daily" ? activeClass : ""}`}>Harian</Link>
      <Link to="/transactions/calendar" className={`py-1 px-2 rounded-pill ${props.data.active === "calendar" ? activeClass : ""}`}>Kalender</Link>
      <Link to="/transactions/monthly" className={`py-1 px-2 rounded-pill ${props.data.active === "monthly" ? activeClass : ""}`}>Bulanan</Link>
      <Link to="/transactions/total" className={`py-1 px-2 rounded-pill ${props.data.active === "total" ? activeClass : ""}`}>Summary</Link>
    </div>
  )
}

export default TransactionMiniNav
