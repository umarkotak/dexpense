import React, {useState,useEffect} from "react"
import {Link} from "react-router-dom"
import {useAlert} from 'react-alert'

import dexpenseApi from "../apis/DexpenseApi"
import utils from "../helper/Utils"
import MiniTips from "../components/MiniTips"

function PageGoldPrice() {
  const alert = useAlert()

  const [goldPrices, setGoldPrices] = useState({
    buyback_price: 0,
    direction: 'down',
    price_change: 0,
    price_date: '',
    price_source: '',
    prices: {},
  })

  async function fetchGoldPrices() {
    try {
      const response = await dexpenseApi.HfGoldGoldPrices(localStorage.getItem("DEXPENSE_SESSION_TOKEN"), {})
      const status = response.status
      const body = await response.json()
      console.log(body)

      if (status === 200) {
        setGoldPrices(body.data)
      } else {
        alert.error(`There is some error: ${body.error}`)
      }
    } catch (e) {
      alert.error(`There is some error: ${e.message}`)
    }
  }

  useEffect(() => {
    fetchGoldPrices()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <div className="content-wrapper" style={{
        backgroundColor: "#E3EDF2",
      }}>
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Harga Emas</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item active"><Link to="/investation">Harga Emas</Link></li>
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
                    {/* <div className="card-header">
                      <h3 className="card-title my-auto">Antam</h3><small className="ml-2">emas</small>
                      <a href="https://www.logammulia.com/id/harga-emas-hari-ini" className="ml-2 my-auto"><i className="my-auto fa fa-external-link-alt"></i></a>

                      <div className="card-tools">
                        <button type="button" className="btn btn-tool" data-card-widget="collapse"><i className="fas fa-minus"></i></button>
                      </div>
                    </div> */}

                    <div className="card-body">
                      <table className="table table-bordered mt-2">
                        <thead>
                          <tr>
                            <th className="p-1 align-middle">Jenis</th>
                            <th className="p-1 align-middle">
                              <div>HF Gold</div>
                              <small><a href={goldPrices.price_source} target="_blank" rel="noreferrer">link</a></small>
                            </th>
                            <th className="p-1 align-middle">
                              <div>Antam</div>
                              <small><a href="https://www.logammulia.com/id/harga-emas-hari-ini" target="_blank" rel="noreferrer">link</a></small>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="p-1 align-middle"><b>Buyback</b></td>
                            <td className="p-1"><b>{utils.FormatNumber(goldPrices.buyback_price)}</b></td>
                            <td className="p-1"><b>TBD</b></td>
                          </tr>
                          {Object.keys(goldPrices.prices).map((key) => (
                            <tr>
                              <td className="p-1">{goldPrices.prices[key].size} gram</td>
                              <td className="p-1"><div className="d-flex flex-column">
                                <b>{utils.FormatNumber(goldPrices.prices[key].price)}</b>
                                <small className="ml-2">{utils.FormatNumber(Math.ceil(goldPrices.prices[key].price / goldPrices.prices[key].size))} / gr</small>
                              </div></td>
                              <td className="p-1"><div className="d-flex flex-column">
                                <b>{utils.FormatNumber(goldPrices.prices[key].price)}</b>
                                <small className="ml-2">{utils.FormatNumber(Math.ceil(goldPrices.prices[key].price / goldPrices.prices[key].size))} / gr</small>
                              </div></td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
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

export default PageGoldPrice
