import React, {useState, useEffect} from "react"
import {useHistory, Link} from "react-router-dom"
import {useAlert} from 'react-alert'
import Select from 'react-select'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'

import dexpenseApi from "../apis/DexpenseApi"
import utils from "../helper/Utils"

function PageTransactionsCreate() {
  const alert = useAlert()
  const history = useHistory()
  var now = new Date()
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset())

  const [selectedWalletBalance, setSelectedWalletBalance] = useState("")
  const [transactionsCreateParams, setTransactionsCreateParams] = useState({
    "category": "",
    "amount": 0,
    "direction_type": "outcome",
    "group_wallet_id": 0,
    "name": "",
    "description": "",
    "note": "",
    "transaction_at": ""
  })
  function handleTransactionsParamsChanges(e) {
    try {
      const { name, value } = e.target
      setTransactionsCreateParams(transactionsCreateParams => ({...transactionsCreateParams, [name]: value}))
    } catch (err) {
      setTransactionsCreateParams(transactionsCreateParams => ({...transactionsCreateParams, [e.name]: e.value}))
      if (e.name === "group_wallet_id") {
        setSelectedWalletBalance(e.balance)
      }
    }
  }

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
  useEffect(() => {
    if (walletOptions.length === 1) {
      setTransactionsCreateParams({
        ...transactionsCreateParams,
        "group_wallet_id": walletOptions[0].value,
      })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [walletOptions])

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

  async function handleTransactionSubmit() {
    try {
      var tempTransactionsCreateParams = transactionsCreateParams
      var transactionAtUTC = utils.ConvertLocalTimeToUTC(tempTransactionsCreateParams["transaction_at"])
      tempTransactionsCreateParams["transaction_at"] = utils.FormatDateInput(transactionAtUTC)

      const response = await dexpenseApi.TransactionsCreate(localStorage.getItem("DEXPENSE_SESSION_TOKEN"), tempTransactionsCreateParams)
      const status = response.status
      const body = await response.json()

      if (status === 200) {
        alert.info("Transaction success!")
        history.push("/transactions/daily")
      } else {
        alert.error(`There is some error: ${body.error}`)
      }
    } catch (e) {
      alert.error(`There is some error: ${e.message}`)
    }
  }

  const [selectedCategoryIdx, setSelectedCategoryIdx] = useState(null)

  const commands = [
    {
      command: 'pengeluaran * berupa * sejumlah *',
      callback: (category, description, amount) => {
        setVoiceInput(`kamu habis ${category} untuk ${description} sejumlah ${amount}`)

        var selectedIdx = categoryOptions.length - 1
        if (selectedIdx < 0) { selectedIdx = 0}
        categoryOptions.forEach((opt, idx)=>{
          if (opt["label"].toLowerCase().includes(category)) {
            selectedIdx = idx
          }
        })
        setSelectedCategoryIdx(selectedIdx)

        setTransactionsCreateParams({
          ...transactionsCreateParams,
          "category": categoryOptions[selectedIdx].value,
          "name": description,
          "amount": parseInt(`${amount}`.replace(/\D/g,''), 10),
        })
      }
    },
  ]

  const {
    transcript,
    listening,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition({ commands })

  if (!browserSupportsSpeechRecognition) {
    console.log(`Browser doesn't support speech recognition.`)
  }

  const [voiceInput, setVoiceInput] = useState("")
  useEffect(() => {
    console.log(voiceInput)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [voiceInput])

  return (
    <div>
      <div className="content-wrapper">
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>New Transaction</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item active"><Link to="/transactions/daily">Transaction</Link></li>
                  <li className="breadcrumb-item active"><Link to="/transactions/create">New</Link></li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        <section className="content">
          <div className="row">
            <div className="col-12 col-lg-6">
              <div className="card card-primary card-outline">
                <div className="card-header">
                  <div className="card-tools">
                    <Link to="/transactions/transfer" className="btn btn-primary btn-sm mx-1">
                      <i className="fas fa-exchange-alt"></i> Transfer
                    </Link>
                    <button type="button" className="btn btn-primary btn-sm" data-card-widget="collapse">
                      <i className="fas fa-minus"></i>
                    </button>
                  </div>
                </div>
                <div className="card-body">
                  <div className="form-group">
                    <label>Voice Input</label> <small className="text-danger"><b>beta</b></small>
                    <div>
                      <button className='btn btn-outline-primary p-2' onClick={()=>SpeechRecognition.startListening({ language: 'id' })} disabled={listening}>
                        {listening ? 'Mendegarkan. . .' : 'Bicara'}
                      </button>
                      <p>{transcript}</p>
                      <small>format: pengeluaran [category] berupa [nama] sejumlah [biaya]<br/></small>
                      <code>contoh: pengeluaran makanan berupa sate ayam sejumlah lima puluh ribu rupiah</code>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Jenis</label> <small className="text-danger"><b>*</b></small>
                    {/* <Select
                      defaultValue={utils.Global()["TRANSACTION_DIRECTION_OPTS"][0]}
                      options={utils.Global()["TRANSACTION_DIRECTION_OPTS"]}
                      onChange={(e) => handleTransactionsParamsChanges(e)}
                    /> */}
                    <div>
                      <button
                        className={`btn btn-outline-primary p-2 rounded-xl mr-2 ${transactionsCreateParams["direction_type"] === "outcome" ? "active" : ""}`}
                        onClick={()=>setTransactionsCreateParams(transactionsCreateParams => ({...transactionsCreateParams, "direction_type": "outcome"}))}
                      >Pengeluaran</button>
                      <button
                        className={`btn btn-outline-primary p-2 rounded-xl mr-2 ${transactionsCreateParams["direction_type"] === "income" ? "active" : ""}`}
                        onClick={()=>setTransactionsCreateParams(transactionsCreateParams => ({...transactionsCreateParams, "direction_type": "income"}))}
                      >Pemasukan</button>
                    </div>
                  </div>
                  <div className="form-group" data-select2-id="29">
                    <label>Kategori</label> <small className="text-danger"><b>*</b></small>
                    <Select
                      name="category"
                      options={categoryOptions}
                      onChange={(e) => handleTransactionsParamsChanges(e)}
                      value={selectedCategoryIdx === null ? null : categoryOptions[selectedCategoryIdx]}
                    />
                  </div>
                  <div className="form-group">
                    <label>Wallet</label> <small className="text-danger"><b>*</b></small>
                    <Select
                      name="group_wallet_id"
                      options={walletOptions}
                      onChange={(e) => handleTransactionsParamsChanges(e)}
                      value={walletOptions.length === 1 ? walletOptions[0] : null }
                    />
                  </div>
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text"><i className="fas fa-wallet"></i></span>
                    </div>
                    <input type="text" className="form-control" value={selectedWalletBalance} readOnly />
                    <div className="input-group-append">
                      <div className="input-group-text">
                        <Link to={`/transactions/adjust?group_wallet_id=${transactionsCreateParams["group_wallet_id"]}`}><i className="fas fa-edit"></i></Link>
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Jumlah</label> <small className="text-danger"><b>*</b></small>
                    <input type="number" className="form-control form-control-sm" name="amount"
                      onChange={(e) => handleTransactionsParamsChanges(e)} value={transactionsCreateParams["amount"]}
                    />
                  </div>
                  <div className="form-group">
                    <label>Waktu Transaksi</label> <small className="text-danger"><b>*</b></small>
                    <input type="datetime-local" className="form-control form-control-sm" name="transaction_at"
                      onChange={(e) => handleTransactionsParamsChanges(e)} defaultValue={now.toISOString().slice(0, -1)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Nama</label> <small className="text-danger"><b>*</b></small>
                    <input type="text" className="form-control form-control-sm" name="name"
                      onChange={(e) => handleTransactionsParamsChanges(e)} value={transactionsCreateParams["name"]}/>
                  </div>
                  <div className="form-group">
                    <label>Deskripsi</label>
                    <textarea className="form-control" rows="3" name="description" onChange={(e) => handleTransactionsParamsChanges(e)}></textarea>
                  </div>
                  <div className="form-group">
                    <label>Catatan</label>
                    <textarea className="form-control" rows="2" name="note" onChange={(e) => handleTransactionsParamsChanges(e)}></textarea>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-4">

            </div>
          </div>
        </section>
      </div>

      <Link
        to="/transactions/create"
        className="bg-primary"
        onClick={() => handleTransactionSubmit()}
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

export default PageTransactionsCreate
