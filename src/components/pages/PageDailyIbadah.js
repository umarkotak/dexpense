import React, {useState} from "react"
import {Link} from "react-router-dom"

import utils from "../helper/Utils"

var time_now = new Date()

function PageDailyIbadah() {

  var daily_ibadah_map = {
    1: { "time": "00:00 - Subuh", "name": "Sholat Malam & Sholat Witir", ibadah_type: "sunnah", "checked": false },
    2: { "time": "Subuh - ~05:30", "name": "Sholat Sunnah Subuh", ibadah_type: "sunnah", "checked": false },
    3: { "time": "Subuh - ~05:30", "name": "Sholat Subuh", ibadah_type: "wajib", "checked": false },
    4: { "time": "Subuh - ~05:30", "name": "Tilawah Pagi", ibadah_type: "sunnah", "checked": false },
    5: { "time": "06:30 - ~10:30", "name": "Sholat Dhuha", ibadah_type: "sunnah", "checked": false },
    7: { "time": "~12:00 - ~14:30", "name": "Sholat Sunnah Dzuhur", ibadah_type: "sunnah", "checked": false },
    8: { "time": "~12:00 - ~14:30", "name": "Sholat Dzuhur", ibadah_type: "wajib", "checked": false },
    9: { "time": "~15:00 - ~17:30", "name": "Sholat Ashar", ibadah_type: "wajib", "checked": false },
    10: { "time": "~18:00 - ~19:00", "name": "Sholat Maghrib", ibadah_type: "wajib", "checked": false },
    11: { "time": "~18:00 - ~19:00", "name": "Sholat Sunnah Maghrib", ibadah_type: "sunnah", "checked": false },
    12: { "time": "~19:00 - ~24:00", "name": "Sholat Isya", ibadah_type: "wajib", "checked": false },
    13: { "time": "~19:00 - ~24:00", "name": "Sholat Sunnah Isya", ibadah_type: "sunnah", "checked": false },
  }

  // var daily_ibadah_date_index = get_initial_daily_ibadah_date_index()

  const [daily_ibadah_today, set_daily_ibadah_today] = useState(get_initial_daily_ibadah_today())

  function get_time_now_formatted_date() {
    return `${time_now.getDate()}-${time_now.getMonth()+1}-${time_now.getFullYear()}`
  }

  function get_initial_daily_ibadah_date_index() {
    var key = "BUKUKASKITA:DAILY_IBADAH:DATE_INDEX"
    var daily_ibadah_date_index_string = localStorage.getItem(key)

    if (daily_ibadah_date_index_string) {
      var daily_ibadah_date_index_init = JSON.parse(daily_ibadah_date_index_string)
      daily_ibadah_date_index_init.push(get_time_now_formatted_date())
      daily_ibadah_date_index_init = daily_ibadah_date_index_init.filter(onlyUnique)
      daily_ibadah_date_index_init = daily_ibadah_date_index_init.sort(function(a,b){return new Date(a) - new Date(b)})
      localStorage.setItem(key, JSON.stringify(daily_ibadah_date_index_init))
      return daily_ibadah_date_index_init
    } else {
      var temp_daily_ibadah_date_index = []
      temp_daily_ibadah_date_index.push(get_time_now_formatted_date())
      temp_daily_ibadah_date_index = temp_daily_ibadah_date_index.sort(function(a,b){return new Date(a) - new Date(b)})
      localStorage.setItem(key, JSON.stringify(temp_daily_ibadah_date_index))
      return temp_daily_ibadah_date_index
    }
  }

  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index
  }

  function daily_ibadah_today_key() {
    return `BUKUKASKITA:DAILY_IBADAH:${get_time_now_formatted_date()}`
  }

  function get_initial_daily_ibadah_today() {
    var daily_today_string = localStorage.getItem(daily_ibadah_today_key())

    if (daily_today_string) {
      return JSON.parse(daily_today_string)
    } else {
      var temp_daily_ibadah_today = daily_ibadah_map
      localStorage.setItem(daily_ibadah_today_key(), JSON.stringify(temp_daily_ibadah_today))
      return temp_daily_ibadah_today
    }
  }

  function prevDate() {
    time_now.setDate(time_now.getDate() - 1)
    console.log(time_now)
    get_initial_daily_ibadah_date_index()
    set_daily_ibadah_today(get_initial_daily_ibadah_today())
  }

  function nextDate() {
    time_now.setDate(time_now.getDate() + 1)
    console.log(time_now)
    get_initial_daily_ibadah_date_index()
    set_daily_ibadah_today(get_initial_daily_ibadah_today())
  }

  function check_daily_ibadah(daily_ibadah_id) {
    daily_ibadah_today[daily_ibadah_id].checked = !daily_ibadah_today[daily_ibadah_id].checked
    set_daily_ibadah_today(daily_ibadah_today => ({...daily_ibadah_today}))
    localStorage.setItem(daily_ibadah_today_key(), JSON.stringify(daily_ibadah_today))
  }

  return (
    <div>
      <div className="content-wrapper">
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Ibadah Harian</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item active"><Link to="/daily_ibadah">Ibadah Harian</Link></li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        <section className="content">
          <div className="row">
            <div className="col-12">
              <div>
                <button className="btn btn-xs btn-primary" onClick={()=>prevDate()}><i className="fa fa-arrow-circle-left"></i></button>
                <button className="ml-1 btn btn-xs text-black" disabled>{`${time_now.getDate()} ${utils.months[time_now.getMonth()]} ${time_now.getFullYear()}`}</button>
                <button className="btn btn-xs btn-primary ml-1" onClick={()=>nextDate()}><i className="fa fa-arrow-circle-right"></i></button>
              </div>
            </div>

            <div className="col-12">
              <div>
                {
                  Object.keys(daily_ibadah_map).map((daily_ibadah_id) => (
                    <div className="border-top border-bottom d-flex justify-content-between py-1 px-1" key={`ID-${daily_ibadah_id}`}>
                      <span style={{width: "40%"}} className="my-auto">{daily_ibadah_today[daily_ibadah_id].time}</span>
                      <span
                        style={{width: "55%", textDecoration: `${daily_ibadah_today[daily_ibadah_id].checked ? "line-through" : ""}`}}
                        className="my-auto"
                        onClick={(e) => check_daily_ibadah(daily_ibadah_id)}
                      >{daily_ibadah_today[daily_ibadah_id].name}</span>
                      <button
                        style={{width: "5%"}}
                        className={`my-auto btn btn-xs btn-block ${daily_ibadah_today[daily_ibadah_id].checked ? "btn-danger" : "btn-success"}`}
                        onClick={(e) => check_daily_ibadah(daily_ibadah_id)}
                      ><i className={`fa ${daily_ibadah_today[daily_ibadah_id].checked ? "fa-times" : "fa-check"}`}></i></button>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default PageDailyIbadah
