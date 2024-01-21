import React, { useState } from "react"
import {Link} from "react-router-dom"
import utils from "../helper/Utils"

function HomeTransactionBarElem(props) {
  const [openTxBar, setOpenTxBar] = useState(false)

  return (
    <div className="border-bottom flex flex-col">
      <div
        className="flex justify-between py-0" key={`tx-elem-${props.val.id}`}
        onClick={()=>setOpenTxBar(!openTxBar)}
      >
        <div className="flex align-items-center my-auto" style={{width: "35%"}}>
          <img src={props.val.icon_url} alt={"category_icon"} style={{width: "24px", height: "24px"}} />
          <small className="ml-1">{props.val.category}</small>
        </div>
        <small className="my-auto text-left" style={{width: "40%"}}>
          {props.val.name}
          <br />
          {props.val.account.username} . {props.val.group_wallet.name}
        </small>
        <button
          onClick={()=>setOpenTxBar(!openTxBar)}
          className="my-auto text-right"
          style={{width: "25%"}}
        >
          <small className={`${props.val.direction_type === "income" ? "text-primary" : "text-danger"}`}>
            {utils.FormatNumber(props.val.amount)}
          </small>
        </button>
      </div>
      <div className={`flex justify-end ${openTxBar ? "block" : "hidden"} text-xs pb-1`}>
        <Link to={`/transactions/${props.val.id}/edit`} className="rounded-lg border p-1"><i className="fa-solid fa-pencil"></i> edit</Link>
      </div>
    </div>
  )
}

export default HomeTransactionBarElem
