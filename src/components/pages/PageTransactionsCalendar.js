import React, {useState,useEffect} from "react"
import {Link} from "react-router-dom"
import {useAlert} from 'react-alert'

import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import bootstrap5Plugin from '@fullcalendar/bootstrap5';

import dexpenseApi from "../apis/DexpenseApi"
import utils from "../helper/Utils"
import TransactionMiniNav from "../components/TransactionMiniNav"
import MiniTips from "../components/MiniTips"

var timeNow = new Date()
var beginOfMonth, endOfMonth
function RecalculateBeginAndEndOfMonth(timeObj) {
  beginOfMonth = new Date(timeObj.getFullYear(), timeObj.getMonth(), 1)
  endOfMonth = new Date(timeObj.getFullYear(), timeObj.getMonth() + 1, 1)
  beginOfMonth.setHours(beginOfMonth.getHours() - (-new Date().getTimezoneOffset()/60))
  endOfMonth.setHours(endOfMonth.getHours() - (-new Date().getTimezoneOffset()/60))
}
RecalculateBeginAndEndOfMonth(timeNow)

function PageTransactionsDaily() {
  const alert = useAlert()

  const[grouppedTransactions, setGroupedTransactions] = useState({groupped_transactions: [{transactions: []}]})
  const[queryParams, setQueryParams] = useState({
    limit: 1000,
    offset: 0,
    min_date: utils.FormatDateInput(beginOfMonth),
    max_date: utils.FormatDateInput(endOfMonth),
    group_id: parseInt(localStorage.getItem("DEXPENSE_SESSION_GROUPS_ACTIVE_ID"))
  })
  const[formattedFullCalendarEvents, setFormattedFullCalendarEvents] = useState([])

  var calendarRef = React.createRef()

  useEffect(() => {
    fetchTransactionsDaily()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryParams])

  async function fetchTransactionsDaily() {
    try {
      const response = await dexpenseApi.TransactionsListDaily(localStorage.getItem("DEXPENSE_SESSION_TOKEN"), queryParams)
      const status = response.status
      const body = await response.json()

      if (status === 200) {
        setGroupedTransactions(body.data)
        ConstructFullCalendarEvents(body.data.groupped_transactions)
      } else {
        alert.error(`There is some error: ${body.error}`)
      }
    } catch (e) {
      alert.error(`There is some error: ${e.message}`)
    }
  }

  function ConstructFullCalendarEvents(grouppedTransactions) {
    var temps = grouppedTransactions.map((v) => {
      return {
        start: `${v.date}T00:00`,
        title: `${v.income} & ${v.outcome}`
      }
    })
    setFormattedFullCalendarEvents(temps)
  }

  function prevMonth() {
    timeNow.setMonth(timeNow.getMonth() - 1)
    RecalculateBeginAndEndOfMonth(timeNow)
    setQueryParams(queryParams => ({...queryParams,
      'min_date': utils.FormatDateInput(beginOfMonth),
      'max_date': utils.FormatDateInput(endOfMonth),
    }))
    calendarRef.current.getApi().prev()
}

  function nextMonth() {
    timeNow.setMonth(timeNow.getMonth() + 1)
    RecalculateBeginAndEndOfMonth(timeNow)
    setQueryParams(queryParams => ({...queryParams,
      'min_date': utils.FormatDateInput(beginOfMonth),
      'max_date': utils.FormatDateInput(endOfMonth),
    }))
    calendarRef.current.getApi().next()
  }

  function renderEventContent(eventInfo) {
    var vals = eventInfo.event.title.split(" & ")
    return (
      <ul className="m-0 pl-0" style={{listStyleType: "none"}}>
        <li className="text-primary" style={{fontSize: "10px"}}>{utils.CompactNumber(parseInt(vals[0]))}</li>
        <li className="text-danger" style={{fontSize: "10px"}}>{utils.CompactNumber(parseInt(vals[1]))}</li>
      </ul>
    )
  }

  return (
    <div>
      <div className="content-wrapper pt-2" style={{
        backgroundColor: "#E3EDF2",
      }}>
        {/* <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Transactions</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item active"><Link to="/transactions/daily">Transaction</Link></li>
                  <li className="breadcrumb-item active"><Link to="/transactions/calendar">Calendar</Link></li>
                </ol>
              </div>
            </div>
          </div>
        </div> */}

        <section className="content">
          <div className="row">
            <div className="col-12 col-xl-9 mb-4">
              <div className="row">
                <div className="col-12 flex justify-center">
                  <div className="w-full max-w-md px-2">
                    <TransactionMiniNav data={{active: "calendar"}} />
                  </div>
                </div>
                <div className="col-12 mt-1">
                  <div className="text-dark p-1">
                    <button className="btn btn-xs btn-primary" onClick={()=>prevMonth()}><i className="fa fa-arrow-circle-left"></i></button>
                    <b className="mx-1 p-1">{`${utils.months[timeNow.getMonth()]} ${timeNow.getFullYear()}`}</b>
                    <button className="btn btn-xs btn-primary ml-1" onClick={()=>nextMonth()}><i className="fa fa-arrow-circle-right"></i></button>
                  </div>
                </div>
                <div className="col-12 mt-1">
                  <div className="d-flex justify-content-between">
                    <small className="text-primary">{utils.FormatNumber(grouppedTransactions.income)}</small>
                    <small className="text-danger">{utils.FormatNumber(grouppedTransactions.outcome)}</small>
                    <small>{utils.FormatNumber(grouppedTransactions.total)}</small>
                  </div>
                </div>

                <div className="col-12 mb-4">
                  <div className="mt-1" style={{backgroundColor: "white"}}>
                    <FullCalendar
                      plugins={[ dayGridPlugin,bootstrap5Plugin ]}
                      themeSystem='bootstrap5'
                      headerToolbar={{
                        left: '', center: '', right: ''
                      }}
                      initialEvents={formattedFullCalendarEvents}
                      events={formattedFullCalendarEvents}
                      eventContent={renderEventContent}
                      initialView="dayGridMonth"
                      initialDate={timeNow}
                      ref={calendarRef}
                      eventClick={(e) => {console.log(e)}}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 col-xl-3">
              <div className="w-full flex justify-center">
                <MiniTips />
              </div>
            </div>
          </div>
        </section>
      </div>

      <Link
        to="/transactions/create"
        className="bg-primary"
        style={{
          zIndex: "1000",
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

export default PageTransactionsDaily
