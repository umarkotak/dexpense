import React, {useState, useEffect} from "react"
import {Link} from "react-router-dom"
import NumberFormat from 'react-number-format'
import {useAlert} from 'react-alert'
import Select from 'react-select'
import { Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

import dexpenseApi from "../apis/DexpenseApi"
import utils from "../helper/Utils"
import MiniTips from "../components/MiniTips"

function PageCalculatorBudget() {
  const alert = useAlert()

  const [budgetParams, setBudgetParams] = useState({
    monthly_income: null,
    budgets: [{category: {}}],
  })

  const [budgetSummary, setBudgetSummary] = useState({
    total_budget: 0,
    over_budget: 0,
  })

  const [budgetMode, setBudgetMode] = useState("percent")

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

  function addBudget() {
    var temp = budgetParams.budgets
    temp.push({category: {}})
    setBudgetParams(budgetParams => ({...budgetParams, "budgets": temp}))
  }

  function removeBudget(idx) {
    var temp = budgetParams.budgets
    temp.splice(idx, 1)
    setBudgetParams(budgetParams => ({...budgetParams, "budgets": temp}))
  }

  function changeBudgetCategory(e, idx) {
    var temps = budgetParams.budgets
    var temp = temps[idx]
    temp.category = e
    temps[idx] = temp
    setBudgetParams(budgetParams => ({...budgetParams, budgets: temps}))
  }

  function changeBudgetValue(e, idx) {
    var temps = budgetParams.budgets
    var temp = temps[idx]
    temp.value = parseInt(e.target.value || "0")
    temps[idx] = temp
    setBudgetParams(budgetParams => ({...budgetParams, budgets: temps}))
  }

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const [pieChartData, setPieChartData] = useState([{name: "hello", value: 2000}])
  useEffect(() => {
    var results
    var percentValue

    var totalBudget = 0
    var overBudget = 0

    if (budgetMode === "percent") {
      var remainingPercent = 100

      results = budgetParams.budgets.map((budget) => {
        percentValue = Math.floor(((budget.value || 0) * parseInt(budgetParams.monthly_income)) / 100)
        remainingPercent = remainingPercent - (budget.value || 0)
        totalBudget = totalBudget + percentValue

        return {
          name: budget.category.value || "unset",
          value: percentValue
        }
      })
      if (remainingPercent > 0) {
        results.push({
          name: "remaining",
          value: Math.floor(remainingPercent / 100 * parseInt(budgetParams.monthly_income))
        })
      }


      setPieChartData(results)
    } else {
      var remainingValue = parseInt(budgetParams.monthly_income)

      results = budgetParams.budgets.map((budget) => {
        remainingValue = remainingValue - (budget.value || 0)
        totalBudget = totalBudget + (budget.value || 0)

        return {
          name: budget.category.value || "unset",
          value: (budget.value || 0)
        }
      })
      if (remainingValue > 0) {
        results.push({
          name: "remaining",
          value: remainingValue
        })
      }


      setPieChartData(results)
    }

    if (totalBudget > parseInt(budgetParams.monthly_income)) {
      overBudget = totalBudget - parseInt(budgetParams.monthly_income)
    }

    setBudgetSummary({
      total_budget: totalBudget,
      over_budget: overBudget,
    })

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [budgetParams])

  function toolTipFormatter(value, name, props) {
    return utils.CompactNumber(value)
  }

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 1.25;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="powder-blue" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${utils.CompactNumber(Math.floor(percent * parseInt(budgetParams.monthly_income)))}`}
      </text>
    );
  };

  return (
    <div>
      <div className="content-wrapper pt-2" style={{
        backgroundColor: "#E3EDF2",
      }}>
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Kalkulator Budget</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item active"><Link to="/calculator_budget">Kalkulator Budget</Link></li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        <section className="content">
          <div className="row">
            <div className="col-12 col-xl-9 mb-4">
              <div className="card card-default">
                <div className="card-header">
                  <h3 className="card-title my-auto">Kalkulator Budget</h3><small className="ml-2">atur budget bulanan kamu supaya optimal</small>

                  <div className="card-tools">
                    <button type="button" className="btn btn-tool" data-card-widget="collapse"><i className="fas fa-minus"></i></button>
                  </div>
                </div>

                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-5 col-12">
                      <div className="form-group">
                        <label>Perhitungan</label>
                        <div className="d-flex justify-content-between">
                          <button className="btn btn-success btn-sm w-100 mr-1" onClick={()=>setBudgetMode("percent")}><b className="fa fa-percent"></b> Dengan Persen</button>
                          <button className="btn btn-success btn-sm w-100 ml-1" onClick={()=>setBudgetMode("amount")}><b>Rp.</b> Dengan Jumlah</button>
                        </div>
                      </div>
                      <div className="form-group">
                        <label>Gaji Bulanan</label>
                        <NumberFormat
                          name="monthly_income"
                          className="form-control"
                          value={budgetParams.monthly_income}
                          thousandSeparator={true}
                          prefix={'Rp.'}
                          onValueChange={(values) => setBudgetParams(budgetParams => ({...budgetParams, "monthly_income": values.value}))}
                        />
                      </div>
                      <div className="form-group">
                        <button className="float-right btn btn-primary btn-xs" onClick={()=>addBudget()}><i className="fa fa-plus"></i> tambah budget</button>
                        <label>Daftar Budget</label>
                        <hr/>

                        {budgetParams.budgets.map((budget, idx) => (
                          <div className="form-group">
                            <button className="float-right btn btn-danger btn-xs" onClick={()=>removeBudget(idx)}><i className="fa fa-trash"></i></button>
                            <label>{idx+1}</label>
                            <Select
                              name={`budget_category:${idx}`}
                              options={categoryOptions}
                              onChange={(e) => changeBudgetCategory(e, idx)}
                            />
                            <div className="input-group mb-3">
                              <div className="input-group-prepend">
                                <span className="input-group-text"><i className={budgetMode === "percent" ? "fa fa-percent" : ""}></i>{budgetMode !== "percent" ? "Rp" : ""}</span>
                              </div>
                              <input type="number" name="budget_value" className="form-control" value={budget.value} onChange={(e) => changeBudgetValue(e, idx)} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="col-sm-7 col-12">
                      <div>
                        <ResponsiveContainer height={300}>
                          <PieChart>
                            <Pie
                              data={pieChartData}
                              dataKey="value"
                              nameKey="name"
                              cx="50%"
                              cy="50%"
                              innerRadius={50}
                              outerRadius={90}
                              fill="#8884d8"
                              labelLine={false}
                              label={renderCustomizedLabel}
                            >
                              {pieChartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip formatter={toolTipFormatter} />
                            <Legend />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="p-1">
                        <table className="table table-bordered">
                          <tbody>
                            <tr>
                              <td className="p-1">Total Budget</td>
                              <td className="p-1">{utils.FormatNumber(budgetSummary.total_budget)}</td>
                            </tr>
                            <tr>
                              <td className="p-1">Over Budget</td>
                              <td className="p-1 text-danger">{utils.FormatNumber(budgetSummary.over_budget)}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-xl-3">
              <MiniTips />
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default PageCalculatorBudget