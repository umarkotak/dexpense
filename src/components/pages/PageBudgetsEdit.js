import React, {useState,useEffect} from "react"
import {Link} from "react-router-dom"
import {useAlert} from 'react-alert'

import dexpenseApi from "../apis/DexpenseApi"
import utils from "../helper/Utils"

var timeNow = new Date()
var beginOfMonth, endOfMonth
function RecalculateBeginAndEndOfMonth(timeObj) {
  beginOfMonth = new Date(timeObj.getFullYear(), timeObj.getMonth(), 1)
  endOfMonth = new Date(timeObj.getFullYear(), timeObj.getMonth() + 1, 1)
  beginOfMonth.setHours(beginOfMonth.getHours() - (-new Date().getTimezoneOffset()/60))
  endOfMonth.setHours(endOfMonth.getHours() - (-new Date().getTimezoneOffset()/60))
}
RecalculateBeginAndEndOfMonth(timeNow)

function PageBudgetsEdit() {
  const alert = useAlert()

  const[monthlyBudgets, setMonthlyBudgets] = useState(
    {
      breakdowns: []
    }
  )

  const[queryParams, setQueryParams] = useState({
    min_date: utils.FormatDateInput(beginOfMonth),
    max_date: utils.FormatDateInput(endOfMonth),
    group_id: parseInt(localStorage.getItem("DEXPENSE_SESSION_GROUPS_ACTIVE_ID")),
  })

  async function fetchMonthlyBudgetCurrent() {
    try {
      const response = await dexpenseApi.MonthlyBudgetIndexCurrent(localStorage.getItem("DEXPENSE_SESSION_TOKEN"), queryParams)
      const status = response.status
      const body = await response.json()
      console.log(body)

      if (status === 200) {
        setMonthlyBudgets(body.data)
      } else {
        alert.error(`There is some error: ${body.error}`)
      }
    } catch (e) {
      alert.error(`There is some error: ${e.message}`)
    }
  }
  useEffect(() => {
    fetchMonthlyBudgetCurrent()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryParams])

  return(
    <div>
      <div className="content-wrapper" style={{
        backgroundColor: "#F7F0F5",
      }}>
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Budgeting Bulanan</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item active"><Link to="/budgets">budgets</Link></li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        <section className="content">
          <div className="px-1">
            <div className="row">
              <div className="col-12">
                <div className="d-flex justify-content-between">
                  <span style={{fontSize: "14px"}}>Hi <b>{localStorage.getItem("DEXPENSE_SESSION_USERNAME") || "Guest"}!</b></span>
                  <span style={{fontSize: "14px"}}>{`${utils.months[timeNow.getMonth()]}`} sisa <b>{monthlyBudgets.days_left} Hari Lagi</b></span>
                </div>
              </div>
            </div>
            <div className="row" style={{marginTop: "24px"}}>
              <div className="col-12">
                <div className="d-flex justify-content-between">
                  <span style={{fontSize: "14px"}}><b>Detail Budgetmu!</b></span>
                </div>
              </div>
            </div>
            <div className="row" style={{marginTop: "24px"}}>
              <div className="col-12">
                {monthlyBudgets.breakdowns.map((categoryBudget) => (
                  <div style={{marginBottom: "24px"}}>
                    <div className="d-flex justify-content-between">
                      <span style={{fontSize: "14px"}}>
                        <b>Buat {categoryBudget.category_label} </b>
                        <Link to={`/budgets/${categoryBudget.category}/edit`}><small>edit</small></Link>
                      </span>
                      <span style={{fontSize: "14px"}}>{utils.FormatNumber(categoryBudget.remaining_budget)} ({utils.FormatNumber(categoryBudget.average_daily_remaining_budget)}/hari)</span>
                    </div>
                    <div className="">
                      <div className="progress rounded" style={{height: "26px", backgroundColor: "#EDCBCE"}}>
                        <div className="progress-bar rounded" style={{width: `${categoryBudget.used_percentage*100}%`, backgroundColor: "#BD0039"}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                      <div className="text-white" style={{textAlign: "center", marginTop: "-26px"}}><small><b>{utils.CompactNumber(categoryBudget.used_budget)} / {utils.CompactNumber(categoryBudget.total_budget)}</b></small></div>
                      <div className="text-white" style={{textAlign: "left", marginTop: "-24px", marginLeft: "4px"}}><small><i className={categoryBudget.fa_icon} /></small></div>
                      <div className="text-white" style={{textAlign: "right", marginTop: "-24px", marginRight: "4px"}}><small>{`${categoryBudget.used_percentage*100}%`}</small></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={{
          }}>
            <div style={{
              marginTop: `24px`,
              height: `255px`,
              backgroundImage: `url('/images/budgeting_bg.png')`,
              backgroundRepeat: `no-repeat`,
              backgroundPosition: `center`,
              backgroundPositionY: `bottom`,
              backgroundSize: `contain`,
            }}></div>
          </div>
        </section>
      </div>

      <Link
        to="/budgets/create"
        className="bg-danger"
        onClick={() => {}}
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

export default PageBudgetsEdit
