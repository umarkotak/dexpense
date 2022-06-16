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
    temp.value = parseInt(e.target.value)
    temps[idx] = temp
    setBudgetParams(budgetParams => ({...budgetParams, budgets: temps}))
  }

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const [pieChartData, setPieChartData] = useState([{name: "hello", value: 2000}])
  useEffect(() => {
    var remainingPercent = 100

    var results = budgetParams.budgets.map((budget) => {
      var percentValue = Math.floor(((budget.value || 0) * parseInt(budgetParams.monthly_income)) / 100)
      remainingPercent = remainingPercent - (budget.value || 0)

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
                                <span className="input-group-text"><i className="fa fa-percent"></i></span>
                              </div>
                              <input type="number" name="budget_value" className="form-control" value={budget.value} onChange={(e) => changeBudgetValue(e, idx)} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="col-sm-7 col-12">
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