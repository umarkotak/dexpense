import React, { useState } from "react"
import utils from "../helper/Utils"
import dexpenseApi from "../apis/DexpenseApi"

function AssetListElem(props) {
  const [openTxBar, setOpenTxBar] = useState(false)

  async function HandleDelete() {
    if (!window.confirm("Anda yakin untuk menghapus aset ini?")) { return }

    try {
      const response = await dexpenseApi.AssetsDelete(localStorage.getItem("DEXPENSE_SESSION_TOKEN"), {
        group_id: parseInt(localStorage.getItem("DEXPENSE_SESSION_GROUPS_ACTIVE_ID")),
        id: props.oneWealth.id,
      })
      const status = response.status
      const body = await response.json()

      if (status === 200) {
        window.location.reload()
      } else {
        alert.error(`There is some error: ${body.error}`)
      }
    } catch (e) {
      alert.error(`There is some error: ${e.message}`)
    }
  }

  return (
    <div
      key={`${props.oneWealth.id}-in`}
      className="flex flex-col bg-gray-50 hover:bg-blue-50 shadow-sm w-full rounded-xl mb-2 p-2"
    >
      <div
        className="flex items-center justify-content-between"
        onClick={()=>setOpenTxBar(!openTxBar)}
      >
        <div className="flex items-center">
          <div>
            <img src={props.oneWealth.icon_url} alt="ico" className="w-8 h-8"></img>
          </div>
          <div className="ml-2">
            <div className="mb-0"><b>{props.oneWealth.title}</b> <span className="text-sm">x {props.oneWealth.quantity || 1}</span></div>
            <div className="text-xs">{utils.FormatDateTime(props.oneWealth.transaction_at)}</div>
            {/* <small>sudah 1 tahun mengendap</small> */}
          </div>
        </div>
          <div className="text-end">
            <span className="text-md text-bold">{utils.FormatNumber(props.oneWealth.price)}</span><br/>

            {props.oneWealth.category === "gold" ?
              <div className="text-xs">
                <span>Buyback: {utils.FormatNumber(props.oneWealth.total_buyback_price)}</span><br/>
                <span>Profit: <span className={`${props.oneWealth.profit > 0 ? "text-success" : "text-danger"}`}>{utils.FormatNumber(props.oneWealth.profit)}</span></span><br/>
              </div>
            : null}
          </div>
      </div>
      {openTxBar ? <div className="border-top mt-1 flex justify-end text-xs pt-1">
        <div>
          <button
            className="px-2 rounded-lg text-red-500 border hover:bg-red-200"
            onClick={()=>HandleDelete()}
          >delete</button>
        </div>
      </div> : null}
    </div>
  )
}

export default AssetListElem
