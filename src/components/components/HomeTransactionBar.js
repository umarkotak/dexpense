import React from "react"
import utils from "../helper/Utils"
import HomeTransactionBarElem from "./HomeTransactionBarElem"

function HomeTransactionBar(props) {
  return(
    <div className="bg-white rounded-xl p-1">
      <div className="border-bottom d-flex justify-content-between py-1 px-1">
        <h6 className="my-auto">
          {props.grouppedTransaction.day} <span className="bg-secondary rounded px-1">{props.grouppedTransaction.day_name}</span>
          <small> {props.grouppedTransaction.month} . {props.grouppedTransaction.year}</small>
        </h6>
        <small className="my-auto text-primary">{utils.FormatNumber(props.grouppedTransaction.income)}</small>
        <small className="my-auto text-danger">{utils.FormatNumber(props.grouppedTransaction.outcome)}</small>
      </div>
      <div className="px-1">
        {props.grouppedTransaction.transactions.map((val, k) => (
          <HomeTransactionBarElem val={val} key={`2-${k}`} />
        ))}
      </div>
    </div>
  )
}


export default HomeTransactionBar
