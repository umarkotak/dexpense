import React, {useState,useEffect} from "react"
import {Link} from "react-router-dom"
import Select from 'react-select'
import NumberFormat from 'react-number-format'
import { ComposedChart, Line, XAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

import utils from "../helper/Utils"
import MiniTips from "../components/MiniTips"

function PageInvestation() {
  const [alamiObject, setAlamiObject] = useState({
    "alami_initial_amount": null,
    "alami_monthly_amount": null,
    "alami_yearly_ujrah": 12.5,
    "alami_duration": 30
  })
  const [alamiResult, setAlamiResult] = useState(0)

  var alamiDurationOptions = [
    {name: "alami_duration", value: 30, label: "1 Bulan"},
    {name: "alami_duration", value: 45, label: "1.5 Bulan"},
    {name: "alami_duration", value: 60, label: "2 Bulan"},
    {name: "alami_duration", value: 90, label: "3 Bulan"},
    {name: "alami_duration", value: 360, label: "1 Tahun"}
  ]

  function handleAlamiObjectChanges(e) {
    try {
      const { name, value } = e.target
      setAlamiObject(alamiObject => ({...alamiObject, [name]: value}))
    } catch (err) {
      setAlamiObject(alamiObject => ({...alamiObject, [e.name]: e.value}))
    }
  }

  useEffect(() => {
    calculateAlamiUjrah()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [alamiObject])

  function calculateAlamiUjrah() {
    var calculation_result = 0

    calculation_result = parseInt(alamiObject["alami_initial_amount"])
    calculation_result = calculation_result * (alamiObject["alami_duration"]/360)
    calculation_result = calculation_result * (parseFloat(alamiObject["alami_yearly_ujrah"])/100)
    calculation_result = Math.floor(calculation_result)

    setAlamiResult(calculation_result)

    calculateLongInvestation()
  }

  const [investationNumbers, setInvestationNumbers] = useState([{
    year: 0,
    amount: parseInt(alamiObject.alami_initial_amount || 0),
    return: 0,
    amount_no_invest: parseInt(alamiObject.alami_initial_amount || 0),
    diff: 0,
  }])

  function calculateLongInvestation() {
    var temps = [{
      year: 0,
      amount: parseInt(alamiObject.alami_initial_amount || 0),
      return: 0,
      amount_no_invest: parseInt(alamiObject.alami_initial_amount || 0),
      diff: 0,
    }]

    for (let i = 1; i <= 20; i++) {
      var monthly_amount = parseInt(alamiObject.alami_monthly_amount || 0)
      var amount = parseInt(temps[i-1].amount) + parseInt(monthly_amount) + parseInt(temps[i-1].amount * alamiObject.alami_yearly_ujrah / 100)
      var returns = parseInt(amount) - parseInt(temps[i-1].amount) - parseInt(monthly_amount)
      var amount_no_invest = parseInt(temps[i-1].amount_no_invest) + parseInt(monthly_amount)

      temps.push({
        year: i,
        amount: amount,
        return: returns,
        amount_no_invest: amount_no_invest,
        diff: amount - amount_no_invest,
      })
    }

    setInvestationNumbers(temps)
  }

  function toolTipFormatter(value, name, props) {
    return utils.CompactNumber(value)
  }

  return (
    <div>
      <div className="content-wrapper" style={{
        backgroundColor: "#E3EDF2",
      }}>
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Kalkulator Investasi</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item active"><Link to="/investation">Kalkulator Investasi</Link></li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        <section className="content">
          <div className="row">
            <div className="col-12 col-xl-9 mb-4">
              <div className="row">
                <div className="col-12">
                  <div className="card card-default">
                    <div className="card-header">
                      <h3 className="card-title my-auto">Alami</h3><small className="ml-2">peer to peer lending syariah</small>
                      <a href="https://alamisharia.co.id/id" className="ml-2 my-auto"><i className="my-auto fa fa-external-link-alt"></i></a>

                      <div className="card-tools">
                        <button type="button" className="btn btn-tool" data-card-widget="collapse"><i className="fas fa-minus"></i></button>
                      </div>
                    </div>

                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-3 col-6">
                          <div className="form-group">
                            <label>Modal Awal</label>
                            <NumberFormat
                              name="alami_initial_amount"
                              className="form-control"
                              value={alamiObject.alami_initial_amount}
                              thousandSeparator={true}
                              prefix={'Rp.'}
                              onValueChange={(values) => setAlamiObject(alamiObject => ({...alamiObject, "alami_initial_amount": values.value}))}
                            />
                          </div>
                        </div>
                        <div className="col-md-3 col-6">
                          <div className="form-group">
                            <label>Tabung Bulanan</label>
                            <NumberFormat
                              name="alami_monthly_amount"
                              className="form-control"
                              value={alamiObject.alami_monthly_amount}
                              thousandSeparator={true}
                              prefix={'Rp.'}
                              onValueChange={(values) => setAlamiObject(alamiObject => ({...alamiObject, "alami_monthly_amount": values.value}))}
                            />
                          </div>
                        </div>
                        <div className="col-md-3 col-6">
                          <div className="form-group">
                            <label>Imbal Hasil</label><small> Tahunan</small>
                            <div className="input-group mb-3">
                              <input type="text" className="form-control" name="alami_yearly_ujrah" value={alamiObject.alami_yearly_ujrah} onChange={(e) => handleAlamiObjectChanges(e)} />
                              <div className="input-group-append">
                                <span className="input-group-text">%</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-3 col-6">
                          <div className="form-group">
                            <label>Durasi</label>
                            <Select
                              name="alami_duration"
                              options={alamiDurationOptions}
                              defaultValue={alamiDurationOptions[0]}
                              onChange={(e) => handleAlamiObjectChanges(e)}
                            />
                          </div>
                        </div>
                        <div className="col-md-6 col-12">
                          <div className="d-flex justify-content-center p-1" style={{width: "100%"}}>
                            <span>Estimasi Imbal Hasil (Ujrah)</span>
                          </div>
                          <div className="bg-success rounded-pill p-1" style={{width: "100%"}}>
                            <h4 className="d-flex justify-content-center m-0">+{utils.FormatNumber(alamiResult)}</h4>
                          </div>
                        </div>
                        <small>Rumus: modal <b>x</b> %ujrah tahunan <b>x</b> (lama hari pinjaman <b>/</b> 360)</small>
                      </div>
                      <div className="row mt-4">
                        <div className="col-12">
                          <b>Tabel Penghitungan Investasi</b>

                          <div className="overflow-auto mt-2" style={{height: "220px"}}>
                            <table className="table">
                              <thead>
                                <tr>
                                  <th className="py-1">Tahun</th>
                                  <th className="py-1">Total <small>dengan investasi</small></th>
                                  <th className="py-1">Return</th>
                                  <th className="py-1">Total <small>tanpa investasi</small></th>
                                  <th className="py-1">Selisih</th>
                                </tr>
                              </thead>
                              <tbody>
                                {investationNumbers.map((investationNumber) => (
                                  <tr>
                                    <td className="py-1">{investationNumber.year}</td>
                                    <td className="py-1">{utils.FormatNumber(investationNumber.amount)}</td>
                                    <td className="py-1">{utils.FormatNumber(investationNumber.return)}</td>
                                    <td className="py-1">{utils.FormatNumber(investationNumber.amount_no_invest)}</td>
                                    <td className="py-1">{utils.FormatNumber(investationNumber.diff)}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>

                          <ResponsiveContainer width={"100%"} height={300}>
                            <ComposedChart
                              data={investationNumbers}
                              margin={{
                                bottom: 20,
                              }}
                            >
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="year" />
                              <Tooltip formatter={toolTipFormatter} />
                              <Legend wrapperStyle={{ position: 'relative' }} />
                              <CartesianGrid stroke="#f5f5f5" />
                              <Line type="monotone" dataKey="amount" name="dengan invest" stroke="#ff7300" />
                              <Line type="monotone" dataKey="amount_no_invest" name="tanpa invest" stroke="#387908" />
                            </ComposedChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-12">
                  <div className="card card-default">
                    <div className="card-header">
                      <h3 className="card-title my-auto">Antam</h3><small className="ml-2">emas</small>
                      <a href="https://www.logammulia.com/id/harga-emas-hari-ini" className="ml-2 my-auto"><i className="my-auto fa fa-external-link-alt"></i></a>

                      <div className="card-tools">
                        <button type="button" className="btn btn-tool" data-card-widget="collapse"><i className="fas fa-minus"></i></button>
                      </div>
                    </div>

                    <div className="card-body">

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

export default PageInvestation