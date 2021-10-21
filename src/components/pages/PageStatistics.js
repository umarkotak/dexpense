import React, {useState, useEffect} from "react"
import { ComposedChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, Scatter } from 'recharts'
import {Link} from "react-router-dom"
import {useAlert} from 'react-alert'
import Select from 'react-select'

import dexpenseApi from "../apis/DexpenseApi"
import utils from "../helper/Utils"

function PageStatistics() {
  const alert = useAlert()

  const [queryParams, setQueryParams] = useState({
    "group_id": parseInt(localStorage.getItem("DEXPENSE_SESSION_GROUPS_ACTIVE_ID"))
  })
  function handleQueryParamsChanges(e) {
    try {
      const { name, value } = e.target
      setQueryParams(queryParams => ({...queryParams, [name]: value}))
    } catch (err) {
      setQueryParams(queryParams => ({...queryParams, [e.name]: e.value}))
    }
  }

  const [statisticsData, setStatisticsData] = useState([])
  async function fetchStatisticsTransactionsDaily() {
    try {
      const response = await dexpenseApi.StatisticsWhealthDaily(
        localStorage.getItem("DEXPENSE_SESSION_TOKEN"), queryParams
      )
      const status = response.status
      const body = await response.json()

      if (status === 200) {
        console.log("fetchStatisticsTransactionsDaily", status, body)
        setStatisticsData(body.data)
      } else {
        alert.error(`There is some error: ${body.error}`)
      }
    } catch (e) {
      alert.error(`There is some error: ${e.message}`)
    }
  }
  const [statisticsDataPerCategoryOutcome, setStatisticsDataPerCategoryOutcome] = useState([])
  async function fetchStatisticsTransactionsPerCategoryOutcome() {
    try {
      var newParams = queryParams
      newParams.direction_type = "outcome"
      const response = await dexpenseApi.StatisticsTransactionsPerCategory(
        localStorage.getItem("DEXPENSE_SESSION_TOKEN"), newParams
      )
      const status = response.status
      const body = await response.json()

      if (status === 200) {
        console.log("fetchStatisticsTransactionsPerCategory", status, body)
        setStatisticsDataPerCategoryOutcome(body.data)
      } else {
        alert.error(`There is some error: ${body.error}`)
      }
    } catch (e) {
      alert.error(`There is some error: ${e.message}`)
    }
  }
  const [statisticsDataPerCategoryIncome, setStatisticsDataPerCategoryIncome] = useState([])
  async function fetchStatisticsTransactionsPerCategoryIncome() {
    try {
      var newParams = queryParams
      newParams.direction_type = "income"
      const response = await dexpenseApi.StatisticsTransactionsPerCategory(
        localStorage.getItem("DEXPENSE_SESSION_TOKEN"), newParams
      )
      const status = response.status
      const body = await response.json()

      if (status === 200) {
        console.log("fetchStatisticsTransactionsPerCategory", status, body)
        setStatisticsDataPerCategoryIncome(body.data)
      } else {
        alert.error(`There is some error: ${body.error}`)
      }
    } catch (e) {
      alert.error(`There is some error: ${e.message}`)
    }
  }
  useEffect(() => {
    fetchStatisticsTransactionsDaily()
    fetchStatisticsTransactionsPerCategoryOutcome()
    fetchStatisticsTransactionsPerCategoryIncome()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [walletOptions, setWalletOptions] = useState([])
  async function fetchWalletOptions() {
    try {
      const response = await dexpenseApi.GroupsShow(
        localStorage.getItem("DEXPENSE_SESSION_TOKEN"),
        {id: parseInt(localStorage.getItem("DEXPENSE_SESSION_GROUPS_ACTIVE_ID"))}
      )
      const status = response.status
      const body = await response.json()

      console.log("fetchWalletOptions", status, body)

      if (status === 200) {
        var tempWalletOptions = body.data.group_wallets.map((v, k) => {
          return { name: 'group_wallet_id', value: v.id, label: v.name, balance: v.amount }
        })
        setWalletOptions(tempWalletOptions)
      } else {
        alert.error(`There is some error: ${body.error}`)
      }
    } catch (e) {
      alert.error(`There is some error: ${e.message}`)
    }
  }
  useEffect(() => {
    fetchWalletOptions()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function yAxisTickFormatter(value) {
    return utils.CompactNumber(value)
  }

  function toolTipFormatter(value, name, props) {
    return utils.CompactNumber(value)
  }

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div>
      <div className="content-wrapper">
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Statistik</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item active"><Link to="/statistics">Statistik</Link></li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        <section className="content">
          <div className="row px-2">
            <div className="col-12">
              <div className="row">
                <div className="col-12 col-lg-3">
                  <div className="form-group">
                    <label>Wallet</label>
                    <Select
                      name="group_wallet_id"
                      options={walletOptions}
                      onChange={(e) => handleQueryParamsChanges(e)}
                    />
                  </div>
                </div>
                <div className="col-12 col-lg-3">
                  <div className="form-group">
                    <label>Kategori</label>
                    <Select
                      name="category"
                      options={utils.Global()["TRANSACTION_CATEGORY_ALL_OPTS"]}
                      onChange={(e) => handleQueryParamsChanges(e)}
                    />
                  </div>
                </div>
                <div className="col-12 col-lg-2">
                  <div className="form-group">
                    <label>Dari</label>
                    <input type="date" className="form-control" name="min_time" onChange={(e) => handleQueryParamsChanges(e)} />
                  </div>
                </div>
                <div className="col-12 col-lg-2">
                  <div className="form-group">
                    <label>Sampai</label>
                    <input type="date" className="form-control" name="max_time" onChange={(e) => handleQueryParamsChanges(e)} />
                  </div>
                </div>
                <div className="col-12 col-lg-2">
                  <label><i className="fa fa-search"></i></label>
                  <button className="btn btn-primary btn-block rounded">Apply</button>
                </div>
              </div>
            </div>

            <div className="col-12 mt-1">
              <div className="border border-primary rounded p-1">
                <ResponsiveContainer width={"100%"} height={300}>
                  <ComposedChart
                    data={statisticsData}
                    margin={{
                      bottom: 20,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis yAxisId="left" tickFormatter={yAxisTickFormatter} />
                    <YAxis yAxisId="right" tickFormatter={yAxisTickFormatter} orientation="right" />
                    <Tooltip formatter={toolTipFormatter} />
                    <Legend wrapperStyle={{ position: 'relative' }} />
                    <CartesianGrid stroke="#f5f5f5" />
                    <Line type="monotone" dataKey="outcome" name="pengeluaran" yAxisId="left" stroke="#ff7300" />
                    <Line type="monotone" dataKey="income" name="pemasukan" yAxisId="right" stroke="#387908" />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="col-12 col-xl-6 mt-1">
              <div className="border border-primary rounded p-1">
                <h4><span className="badge badge-pill badge-danger"><i className="fa fa-arrow-up" /> Pengeluaran</span></h4>
                <ResponsiveContainer width={"100%"} height={300}>
                  <PieChart>
                    <Pie
                      data={statisticsDataPerCategoryOutcome}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={0}
                      outerRadius={100}
                      fill="#8884d8"
                      labelLine={true}
                      label={true}
                    >
                      {statisticsDataPerCategoryOutcome.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={toolTipFormatter} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="col-12 col-xl-6 mt-1">
              <div className="border border-primary rounded p-1">
              <h4><span className="badge badge-pill badge-success"><i className="fa fa-arrow-down" /> Pemasukan</span></h4>
                <ResponsiveContainer width={"100%"} height={300}>
                  <PieChart>
                    <Pie
                      data={statisticsDataPerCategoryIncome}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={0}
                      outerRadius={100}
                      fill="#8884d8"
                      labelLine={true}
                      label={true}
                    >
                      {statisticsDataPerCategoryIncome.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={toolTipFormatter} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="col-12 mt-1">
              <div className="border border-primary rounded p-1">
                <h4><span className="badge badge-pill badge-primary"><i className="fa fa-chart-line" /> Whealth Log</span></h4>
                <ResponsiveContainer width={"100%"} height={300}>
                  <ComposedChart
                    data={statisticsData}
                    margin={{
                      bottom: 20,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis tickFormatter={yAxisTickFormatter} />
                    <Tooltip formatter={toolTipFormatter} />
                    <Legend wrapperStyle={{ position: 'relative' }} />
                    <CartesianGrid stroke="#f5f5f5" />
                    <Line type="monotone" dataKey="current_whealth" name="kekayaan" stroke="#ff7300" />
                    <Line type="monotone" dataKey="mid_point" name="mid_point" stroke="black" />
                    <Scatter dataKey="income" fill="green" />
                    <Scatter dataKey="outcome" fill="red" />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="col-12 mt-1 mb-4">
              <br/>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default PageStatistics
