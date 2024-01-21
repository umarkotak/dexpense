import React from "react"
import {Link} from "react-router-dom"

function TransactionMiniNav(props) {
  var activeClass = "bg-blue-200 hover:bg-blue-300 text-white"

  return(
    <div className="rounded-xl flex justify-between px-3 py-1 bg-white shadow-sm text-center" >
      <Link to="/transactions/daily" className={`w-full py-1 px-2 rounded-xl mr-1 ${props.data.active === "daily" ? activeClass : ""}`}>Harian</Link>
      <Link to="/transactions/calendar" className={`w-full py-1 px-2 rounded-xl mr-1 ${props.data.active === "calendar" ? activeClass : ""}`}>Kalender</Link>
      <Link to="/transactions/monthly" className={`w-full py-1 px-2 rounded-xl mr-1 ${props.data.active === "monthly" ? activeClass : ""}`}>Bulanan</Link>
      <Link to="/transactions/total" className={`w-full py-1 px-2 rounded-xl ${props.data.active === "total" ? activeClass : ""}`}>Summary</Link>
    </div>
  )
}

export default TransactionMiniNav
