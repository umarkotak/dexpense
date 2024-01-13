import React, {useState,useEffect} from "react"
import {Link} from "react-router-dom"
import {useAlert} from 'react-alert'
import NumberFormat from 'react-number-format'
import Select from 'react-select'
import { uid } from 'react-uid'

import dexpenseApi from "../apis/DexpenseApi"
import utils from "../helper/Utils"

var timeNow = new Date()
var beginOfMonth, endOfMonth
var prevNthDay, nextNthDay
function RecalculateBeginAndEndOfMonth(timeObj, dayTarget) {
  beginOfMonth = new Date(timeObj.getFullYear(), timeObj.getMonth(), 1)
  endOfMonth = new Date(timeObj.getFullYear(), timeObj.getMonth() + 1, 1)

  beginOfMonth.setHours(beginOfMonth.getHours() - (-new Date().getTimezoneOffset()/60))
  endOfMonth.setHours(endOfMonth.getHours() - (-new Date().getTimezoneOffset()/60))

  nextNthDay = new Date(timeObj.getFullYear(), timeObj.getMonth(), dayTarget)
  if (timeObj > nextNthDay) {
    // If the current date is after the 25th, move to the next month
    nextNthDay.setMonth(nextNthDay.getMonth() + 1);
  }
  prevNthDay = new Date(nextNthDay.getFullYear(), nextNthDay.getMonth() - 1, dayTarget)
}
RecalculateBeginAndEndOfMonth(timeNow, 25)

function PageBudgetsIndex() {
  const alert = useAlert()

  // const[activeGroup, setActiveGroup] = useState({})
  const[monthlyBudgets, setMonthlyBudgets] = useState(
    {
      breakdowns: []
    }
  )
  var payrollDateList = []
  for(let index = 1; index <= 29; index++) {
    payrollDateList.push({label: index, name: "sallary_date", value: index})
  }

  const [sallaryInfoParams, setSallaryInfoParams] = useState({
    payout_date: "1",
    monthly_sallary: 0,
  })

  const [activeMinDate, setActiveMinDate] = useState(new Date())
  const [activeMaxDate, setActiveMaxDate] = useState(new Date())

  async function fetchMonthlyBudgetCurrent() {
    try {
      RecalculateBeginAndEndOfMonth(new Date(), parseInt(sallaryInfoParams.payout_date))
      setActiveMinDate(prevNthDay)
      setActiveMaxDate(nextNthDay)

      const response = await dexpenseApi.MonthlyBudgetIndexCurrent(localStorage.getItem("DEXPENSE_SESSION_TOKEN"), {
        min_date: utils.FormatDateInput(prevNthDay),
        max_date: utils.FormatDateInput(nextNthDay),
        group_id: parseInt(localStorage.getItem("DEXPENSE_SESSION_GROUPS_ACTIVE_ID")),
      })
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
  async function fetchActiveGroupInfo() {
    try {
      const response = await dexpenseApi.GroupsShow(localStorage.getItem("DEXPENSE_SESSION_TOKEN"), {
        id: parseInt(localStorage.getItem("DEXPENSE_SESSION_GROUPS_ACTIVE_ID")),
      })
      const status = response.status
      const body = await response.json()
      console.log(body)

      if (status === 200) {
        setSallaryInfoParams({
          payout_date: body.data.payout_date,
          monthly_sallary: body.data.monthly_sallary,
        })
      } else {
        alert.error(`There is some error: ${body.error}`)
      }
    } catch (e) {
      alert.error(`There is some error: ${e.message}`)
    }
  }
  useEffect(() => {
    fetchActiveGroupInfo()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => {
    fetchMonthlyBudgetCurrent()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sallaryInfoParams])

  async function saveSallaryInfo() {
    try {
      const sallaryInfoParamsWithGroup = {
        ...sallaryInfoParams,
        id: parseInt(localStorage.getItem("DEXPENSE_SESSION_GROUPS_ACTIVE_ID")),
      }
      const response = await dexpenseApi.GroupsAddSallaryInfo(
        localStorage.getItem("DEXPENSE_SESSION_TOKEN"),
        sallaryInfoParamsWithGroup,
      )
      const status = response.status
      const body = await response.json()
      console.log(body)

      if (status === 200) {
        fetchMonthlyBudgetCurrent()
        alert.info(`Sukses menyimpan informasi gaji`)
      } else {
        alert.error(`There is some error: ${body.error}`)
      }
    } catch (e) {
      alert.error(`There is some error: ${e.message}`)
    }
  }

  return(
    <div>
      <div className="content-wrapper" style={{
        backgroundColor: "#E3EDF2",
      }}>
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Budgeting Bulanan</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item active"><Link to="/budgets">Budgets</Link></li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        <section className="content">
          <div className="mx-auto w-full max-w-md">
            <div className="row mb-2">
              <div className="col-12">
                <div className="d-flex justify-content-between">
                  <span style={{fontSize: "14px"}}>Hi <b>{localStorage.getItem("DEXPENSE_SESSION_USERNAME") || "Guest"}!</b></span>
                  {/* <span style={{fontSize: "14px"}}>{`${utils.months[timeNow.getMonth()]}`} sisa <b>{monthlyBudgets.days_left} Hari Lagi</b></span> */}
                  <span style={{fontSize: "14px"}}>Gajian <b>{monthlyBudgets.days_left} Hari Lagi</b></span>
                </div>
              </div>
            </div>
            <div className="flex mb-2">
              <div className="w-full">
                <div className="flex justify-between items-center mb-2">
                  <span>Tanggal Gajian</span>
                  <Select
                    className="w-36 text-sm"
                    name="payout_date"
                    options={payrollDateList}
                    value={payrollDateList[utils.GetArrOptsIndexByValue(payrollDateList, sallaryInfoParams.payout_date)]}
                    onChange={(e) => setSallaryInfoParams({...sallaryInfoParams, "payout_date": e.value})}
                  />
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span>Gaji Bulanan</span>
                  <NumberFormat
                    name="total_budget"
                    className="form-control-sm w-36"
                    value={sallaryInfoParams.monthly_sallary}
                    thousandSeparator={true}
                    prefix={'Rp.'}
                    onValueChange={(values) => setSallaryInfoParams({...sallaryInfoParams, "monthly_sallary": values.value})}
                  />
                </div>
                <div className="flex justify-end items-center">
                  <button className="btn btn-success btn-xs" onClick={()=>saveSallaryInfo()}><i className="fa-solid fa-save mr-2"></i>Save</button>
                </div>
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-12">
                <div className="flex justify-between items-center">
                  <span style={{fontSize: "14px"}}>
                    <b>Pengeluaran</b> <span className="text-xs">({`${utils.FormatDate(activeMinDate)}`} - {`${utils.FormatDate(activeMaxDate)}`})</span>
                  </span>
                  <span style={{fontSize: "10px"}}>{utils.CompactNumberRound(650000)} ({utils.CompactNumberRound(10000)}/hari)</span>
                </div>
              </div>
            </div>
            <div className="mb-2">
              <div className="progress rounded" style={{height: "26px", backgroundColor: "#EDCBCE"}}>
                <div className="progress-bar rounded" style={{width: `${monthlyBudgets.total_expense/monthlyBudgets.monthly_sallary*100}%`, backgroundColor: "#BD0039"}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
              </div>
              <div className="text-white" style={{textAlign: "center", marginTop: "-26px"}}><small><b>{utils.CompactNumberRound(monthlyBudgets.total_expense)} / {utils.CompactNumberRound(monthlyBudgets.monthly_sallary)}</b></small></div>
              <div className="text-white" style={{textAlign: "left", marginTop: "-24px", marginLeft: "4px"}}><small><i className={"fa-solid fa-circle"} /></small></div>
              <div className="text-white" style={{textAlign: "right", marginTop: "-24px", marginRight: "4px"}}><small>{`${(monthlyBudgets.total_expense/monthlyBudgets.monthly_sallary*100).toFixed(0)}%`}</small></div>
            </div>
            <div className="row mb-2">
              <div className="col-12">
                <div className="d-flex justify-content-between">
                  <span style={{fontSize: "14px"}}><b>Detail Budgetmu:</b></span>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                {monthlyBudgets.breakdowns.map((categoryBudget) => (
                  <div style={{marginBottom: "24px"}} key={uid(categoryBudget)}>
                    <div className="flex justify-between items-center">
                      <span className="" style={{fontSize: "14px"}}>
                        <span className="mr-2">
                          {
                            categoryBudget.mode === "generic" ?
                            <b>{categoryBudget.category_label}</b> :
                            <span>
                              <b>{categoryBudget.name}</b> <span className="text-xs">- {categoryBudget.category_label}</span>
                            </span>
                          }
                        </span>
                        <Link to={`/budgets/${categoryBudget.id}/edit`}><small>edit</small></Link>
                      </span>
                      <span style={{fontSize: "10px"}}>Sisa {utils.CompactNumber(categoryBudget.remaining_budget)} ({utils.CompactNumberRound(categoryBudget.average_daily_remaining_budget)}/hari)</span>
                    </div>
                    <div className="">
                      <div className="progress rounded" style={{height: "26px", backgroundColor: "#EDCBCE"}}>
                        <div className="progress-bar rounded" style={{width: `${categoryBudget.used_percentage*100}%`, backgroundColor: "#BD0039"}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                      <div className="text-white" style={{textAlign: "center", marginTop: "-26px"}}><small><b>{utils.CompactNumberRound(categoryBudget.used_budget)} / {utils.CompactNumberRound(categoryBudget.total_budget)}</b></small></div>
                      <div className="text-white" style={{textAlign: "left", marginTop: "-24px", marginLeft: "4px"}}><small><i className={categoryBudget.fa_icon} /></small></div>
                      <div className="text-white" style={{textAlign: "right", marginTop: "-24px", marginRight: "4px"}}><small>{`${(categoryBudget.used_percentage*100).toFixed(0)}%`}</small></div>
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

export default PageBudgetsIndex
