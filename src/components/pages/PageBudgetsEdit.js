import React, {useState,useEffect} from "react"
import {Link, useParams, useHistory} from "react-router-dom"
import {useAlert} from 'react-alert'
import NumberFormat from 'react-number-format'
import Select from 'react-select'

import dexpenseApi from "../apis/DexpenseApi"
import utils from "../helper/Utils"

function PageBudgetsEdit() {
  const alert = useAlert()
  const history = useHistory()

  let { id } = useParams()

  const[monthlyBudget, setMonthlyBudget] = useState({})
  const monthlyBudgetModes = [
    {
      "label": "Generic",
      "name": "mode",
      "value": "generic",
    },
    {
      "label": "Spesifik",
      "name": "mode",
      "value": "specific",
    }
  ]

  const[budgetParams, setBudgetParams] = useState({
    "group_id": parseInt(localStorage.getItem("DEXPENSE_SESSION_GROUPS_ACTIVE_ID")),
    "category": "",
    "total_budget": null,
    "id": id,
  })

  async function fetchMonthlyBudget() {
    try {
      const response = await dexpenseApi.MonthlyBudgetShow(localStorage.getItem("DEXPENSE_SESSION_TOKEN"), {
        "group_id": parseInt(localStorage.getItem("DEXPENSE_SESSION_GROUPS_ACTIVE_ID")),
        "id": id,
      })
      const status = response.status
      const body = await response.json()

      if (status === 200) {
        setMonthlyBudget(body.data)
        setBudgetParams({
          "id": body.data.id,
          "group_id": parseInt(localStorage.getItem("DEXPENSE_SESSION_GROUPS_ACTIVE_ID")),
          "name": body.data.name,
          "mode": body.data.mode,
          "category": body.data.category,
          "total_budget": body.data.total_budget,
        })
      } else {
        alert.error(`There is some error: ${body.error}`)
      }
    } catch (e) {
      alert.error(`There is some error: ${e.message}`)
    }
  }
  useEffect(() => {
    fetchMonthlyBudget()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function handleMonthlyBudgetSubmit() {
    try {
      const response = await dexpenseApi.MonthlyBudgetEdit(localStorage.getItem("DEXPENSE_SESSION_TOKEN"), budgetParams)
      const status = response.status
      const body = await response.json()

      if (status === 200) {
        alert.info(`Update ${budgetParams.category} budget success!`)
        history.push("/budgets")
      } else {
        alert.error(`There is some error: ${body.error}`)
      }
    } catch (e) {
      alert.error(`There is some error: ${e.message}`)
    }
  }

  async function deleteMonthlyBudget() {
    if (!window.confirm("Are you sure?")) { return }

    try {
      const response = await dexpenseApi.MonthlyBudgetDelete(localStorage.getItem("DEXPENSE_SESSION_TOKEN"), budgetParams)
      const status = response.status
      const body = await response.json()

      if (status === 200) {
        alert.info(`Delete ${budgetParams.category} budget success!`)
        history.push("/budgets")
      } else {
        alert.error(`There is some error: ${body.error}`)
      }
    } catch (e) {
      alert.error(`There is some error: ${e.message}`)
    }
  }

  function handleMonthlyBudgetParamsChanges(e) {
    try {
      const { name, value } = e.target
      setBudgetParams(budgetParams => ({...budgetParams, [name]: value}))
    } catch (err) {
      setBudgetParams(budgetParams => ({...budgetParams, [e.name]: e.value}))
    }
  }

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
                  <li className="breadcrumb-item active"><Link to="/budgets">Budgets</Link></li>
                  <li className="breadcrumb-item active"><Link to="#">Edit</Link></li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        <section className="content">
          <div className="row">
            <div className="col-12">
              <div className="flex justify-center">
                <div className="card card-primary card-outline w-full max-w-md">
                  <div className="card-header">
                    <div className="card-tools">
                      <button type="button" className="btn btn-danger btn-sm mr-2" data-card-widget="collapse"
                        onClick={() => deleteMonthlyBudget()}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                      <button type="button" className="btn btn-primary btn-sm" data-card-widget="collapse">
                        <i className="fas fa-minus"></i>
                      </button>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="form-group" data-select2-id="29">
                      <label>Kategori</label> <small className="text-danger"><b>*</b></small>
                      <input type="text" className="form-control form-control-sm" name="category" value={budgetParams.category} disabled />
                    </div>
                    <div className="form-group" data-select2-id="29">
                      <label>Mode</label> <small className="text-danger"><b>*</b></small>
                      <Select
                        name="mode"
                        options={monthlyBudgetModes}
                        onChange={(e) => handleMonthlyBudgetParamsChanges(e)}
                        value={monthlyBudgetModes[utils.GetArrOptsIndexByValue(monthlyBudgetModes, budgetParams.mode)]}
                      />
                    </div>
                    <div className="form-group">
                      <label>Nama Budget</label>
                      <input
                        name="name"
                        type="text"
                        className="form-control form-control-sm"
                        value={budgetParams.name}
                        onChange={(e) => handleMonthlyBudgetParamsChanges(e)}
                      />
                    </div>
                    <div className="form-group">
                      <label>Jumlah Budget</label> <small className="text-danger"><b>*</b></small>
                      <NumberFormat
                        name="total_budget"
                        className="form-control form-control-sm"
                        defaultValue={monthlyBudget.total_budget}
                        value={budgetParams.total_budget}
                        thousandSeparator={true}
                        prefix={'Rp.'}
                        onValueChange={(values) => setBudgetParams(budgetParams => ({...budgetParams, "total_budget": values.value}))}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Link
        to={`/budgets/${id}/edit`}
        className="bg-danger"
        onClick={() => handleMonthlyBudgetSubmit()}
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
        <i className="fa fa-save my-float" style={{marginTop:"17px"}}></i>
      </Link>
    </div>
  )
}

export default PageBudgetsEdit
