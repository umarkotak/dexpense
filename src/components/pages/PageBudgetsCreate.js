import React, {useState,useEffect} from "react"
import {useHistory, Link} from "react-router-dom"
import {useAlert} from 'react-alert'
import Select from 'react-select'
import NumberFormat from 'react-number-format'

import dexpenseApi from "../apis/DexpenseApi"

function PageBudgetsCreate() {
  const alert = useAlert()
  const history = useHistory()

  const [monthlyBudgetParams, setMonthlyBudgetParams] = useState({
    "group_id": parseInt(localStorage.getItem("DEXPENSE_SESSION_GROUPS_ACTIVE_ID")),
    "category": "",
    "total_budget": null
  })
  function handleMonthlyBudgetParamsChanges(e) {
    try {
      const { name, value } = e.target
      setMonthlyBudgetParams(monthlyBudgetParams => ({...monthlyBudgetParams, [name]: value}))
    } catch (err) {
      setMonthlyBudgetParams(monthlyBudgetParams => ({...monthlyBudgetParams, [e.name]: e.value}))
    }
  }

  async function handleMonthlyBudgetSubmit() {
    try {
      const response = await dexpenseApi.MonthlyBudgetCreate(localStorage.getItem("DEXPENSE_SESSION_TOKEN"), monthlyBudgetParams)
      const status = response.status
      const body = await response.json()

      if (status === 200) {
        alert.info("Create budget success!")
        history.push("/budgets")
      } else {
        alert.error(`There is some error: ${body.error}`)
      }
    } catch (e) {
      alert.error(`There is some error: ${e.message}`)
    }
  }

  const [categoryOptions, setCategoryOptions] = useState([{}])
  async function fetchCategoryOptions() {
    try {
      const response = await dexpenseApi.CategoriesIndexStatic(
        localStorage.getItem("DEXPENSE_SESSION_TOKEN"), {}
      )
      const status = response.status
      const body = await response.json()

      if (status === 200) {
        setCategoryOptions(body.data)
      } else {
        alert.error(`There is some error: ${body.error}`)
      }
    } catch (e) {
      alert.error(`There is some error: ${e.message}`)
    }
  }
  useEffect(() => {
    fetchCategoryOptions()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
                  <li className="breadcrumb-item active"><Link to="/budgets/create">New</Link></li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        <section className="content">
          <div className="row">
            <div className="col-12">
              <div className="card card-primary card-outline">
                <div className="card-header">
                  <div className="card-tools">
                    <button type="button" className="btn btn-primary btn-sm" data-card-widget="collapse">
                      <i className="fas fa-minus"></i>
                    </button>
                  </div>
                </div>
                <div className="card-body">
                  <div className="form-group" data-select2-id="29">
                    <label>Kategori</label> <small className="text-danger"><b>*</b></small>
                    <Select
                      name="category"
                      options={categoryOptions}
                      onChange={(e) => handleMonthlyBudgetParamsChanges(e)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Jumlah Budget</label> <small className="text-danger"><b>*</b></small>
                    {/* <input type="number" className="form-control form-control-sm" name="total_budget" onChange={(e) => handleMonthlyBudgetParamsChanges(e)} /> */}
                    <NumberFormat
                      name="total_budget"
                      className="form-control form-control-sm"
                      value={monthlyBudgetParams.total_budget}
                      thousandSeparator={true}
                      prefix={'Rp.'}
                      onValueChange={(values) => setMonthlyBudgetParams(monthlyBudgetParams => ({...monthlyBudgetParams, "total_budget": values.value}))}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Link
        to="/budgets/create"
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

export default PageBudgetsCreate
