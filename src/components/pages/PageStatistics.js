import React, {useState, useEffect} from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
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
      const response = await dexpenseApi.StatisticsTransactionsDaily(
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
  useEffect(() => {
    fetchStatisticsTransactionsDaily()
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

            <div className="col-12" style={{ height: 350 }}>
              <ResponsiveContainer>
                <LineChart
                  width={400}
                  height={350}
                  data={statisticsData}
                  margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <CartesianGrid stroke="#f5f5f5" />
                  <Line type="monotone" dataKey="income" stroke="#ff7300" />
                  <Line type="monotone" dataKey="outcome" stroke="#387908" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default PageStatistics
