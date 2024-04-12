import React, {useState, useEffect} from "react"
import {useHistory, Link} from "react-router-dom"
import {useAlert} from 'react-alert'
import Select from 'react-select'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import NumberFormat from 'react-number-format'

import dexpenseApi from "../apis/DexpenseApi"
import utils from "../helper/Utils"

var varCategoryOptions = [{}]

function PageTransactionsCreate() {
  const alert = useAlert()
  const history = useHistory()
  var now = new Date()
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset())

  useEffect(()=>{
    setTransactionsCreateParams({
      ...transactionsCreateParams,
      "transaction_at": now.toISOString().slice(0, -1),
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
      } else if (e.name === "category") {
        var selectedIdx = 0
        varCategoryOptions.forEach((opt, idx)=>{
          if (`${opt["value"]}`.includes(e.value)) { selectedIdx = idx }
        })
        setSelectedCategoryIdx(selectedIdx)
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
        if (tempWalletOptions.length === 1) {
          setSelectedWalletBalance(tempWalletOptions[0].balance)
        }
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

  const [specificBudgetList, setSpecificBudgetList] = useState([])
  async function fetchSpecificBudgetList() {
    try {
      const response = await dexpenseApi.MonthlyBudgetIndex(
        localStorage.getItem("DEXPENSE_SESSION_TOKEN"), {
          group_id: parseInt(localStorage.getItem("DEXPENSE_SESSION_GROUPS_ACTIVE_ID")),
          mode: "specific"
        }
      )
      const status = response.status
      const body = await response.json()

      if (status === 200) {
        var budgetSelect = [{
          name: "monthly_budget_id",
          value: null,
          label: "Select...",
        }]
        if (body.data) {
          body.data.forEach ((v) => {
            budgetSelect.push({
              name: "monthly_budget_id",
              value: v.id,
              label: v.name,
            })
          })
        }
        setSpecificBudgetList(budgetSelect)
      } else {
        alert.error(`There is some error: ${body.error}`)
      }
    } catch (e) {
      alert.error(`There is some error: ${e.message}`)
    }
  }
  useEffect(() => {
    fetchSpecificBudgetList()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
        // setCategoryOptions(
        //   [
        //     {label:"Kategori", options: body.data}
        //   ]
        // )
        varCategoryOptions = body.data
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
      tempTransactionsCreateParams["transaction_at"] = utils.FormatDateInputWithTz(
        utils.ConvertLocalTime(tempTransactionsCreateParams["transaction_at"])
      )

      console.log("DEBUGGING", tempTransactionsCreateParams)

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
        var selectedIdx = varCategoryOptions.length - 1
        if (selectedIdx < 0) { selectedIdx = 0}
        varCategoryOptions.forEach((opt, idx)=>{
          if (opt["label"].toLowerCase().includes(category)) {
            selectedIdx = idx
          }
        })
        setSelectedCategoryIdx(selectedIdx)

        setTransactionsCreateParams({
          ...transactionsCreateParams,
          "category": varCategoryOptions[selectedIdx].value,
          "name": description,
          "amount": parseInt(`${amount}`.toLowerCase().replace('juta','000000').replace(/\D/g,''), 10),
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

  const [receiptFile, setReceiptFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [receiptUploadLoading, setReceiptUploadLoading] = useState(false)

  const handleReceiptFileChange = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile && selectedFile.type.startsWith('image/')) {
      setReceiptFile(selectedFile)
      setPreview(URL.createObjectURL(selectedFile))
    } else {
      setReceiptFile(null)
      setPreview(null)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const receiptFormData = new FormData()
    receiptFormData.append('receipt-image', receiptFile)

    setReceiptUploadLoading(true)
    try {
      const response = await dexpenseApi.ExtractReceiptData(receiptFormData)
      const status = response.status
      const body = await response.json()

      var data = body.data

      console.log(data)

      if (status === 200) {
        var selectedIdx = varCategoryOptions.length - 1
        if (selectedIdx < 0) { selectedIdx = 0}
        varCategoryOptions.forEach((opt, idx)=>{
          if (opt["value"].toLowerCase().includes(body.data.category)) {
            selectedIdx = idx
          }
        })
        setSelectedCategoryIdx(selectedIdx)

        var tempTransactionAt = body.data.transaction_at.split("+")[0]
        setTransactionsCreateParams({
          ...transactionsCreateParams,
          "category": body.data.category,
          "name": body.data.name,
          "description": body.data.description,
          "amount": body.data.total_amount,
          "transaction_at": tempTransactionAt,
        })
      } else {
        alert.error(`Maaf, gambar receipt yang kamu kasih tidak dapat diproses, silahkan coba lagi`)
      }
    } catch (error) {
      console.error(error)
    }
    setReceiptUploadLoading(false)
  }

  return (
    <div>
      <div className="content-wrapper" style={{
        backgroundColor: "#E3EDF2",
      }}>
        <div className="content-header">
          {/* <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Transaksi Baru</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item active"><Link to="/transactions/daily">Transaction</Link></li>
                  <li className="breadcrumb-item active"><Link to="/transactions/create">Create</Link></li>
                </ol>
              </div>
            </div>
          </div> */}
        </div>

        <section className="content">
          <div className="row">
            <div className="col-12 col-xl-9 flex justify-center">
              <div className="card card-primary card-outline w-full max-w-md">
                {/* <div className="card-header">
                  <div className="card-tools">
                    <Link to="/transactions/transfer" className="btn btn-primary btn-sm mx-1">
                      <i className="fas fa-exchange-alt"></i> Transfer
                    </Link>
                    <button type="button" className="btn btn-primary btn-sm" data-card-widget="collapse">
                      <i className="fas fa-minus"></i>
                    </button>
                  </div>
                </div> */}
                <div className="card-body">
                  <div className="form-group">
                    <label>Voice Input</label>
                    <div>
                      <button className='btn btn-xs rounded btn-outline-primary p-2' onClick={()=>SpeechRecognition.startListening({ language: 'id' })} disabled={listening}>
                        {listening ? 'Mendegarkan. . .' : <span><i className="fa-solid fa-microphone mr-1"></i> Bicara</span>}
                      </button>
                      <p>{transcript}</p>
                      <p className="w-full text-justify text-xs mt-1">format: pengeluaran <b>[category]</b> berupa <b>[nama]</b> sejumlah <b>[biaya]</b> rupiah<br/></p>
                      <p className="w-full text-justify text-xs mt-1 text-red-600">contoh: pengeluaran <b>makanan</b> berupa <b>sate ayam</b> sejumlah <b>lima puluh ribu</b> rupiah</p>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Upload Receipt</label>
                    <div>
                      <form onSubmit={handleSubmit}>
                        <div className="input-group">
                          <div className="custom-file">
                            <input type="file" className="custom-file-input" onChange={handleReceiptFileChange} />
                            <label className="custom-file-label">{receiptFile ? receiptFile.name : "Choose receipt"}</label>
                          </div>
                          <div className="input-group-append">
                            <button type="submit" className="btn btn-outline-primary" disabled={receiptUploadLoading}>
                              {
                                receiptUploadLoading ?
                                <span><span class="spinner-border spinner-border-sm"></span></span> :
                                <span>Upload</span>
                              }
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                    {preview ? (
                      <div className="flex justify-center mt-2">
                        <div className="rounded overflow-hidden">
                          <img src={preview} alt="Preview" className="object-contain h-48" />
                        </div>
                      </div>
                    ) : (<span className="text-xs">click upload to extract receipt detail</span>)}
                  </div>
                  <div className="form-group">
                    <label>Jenis</label> <small className="text-danger"><b>*</b></small>
                    {/* <Select
                      defaultValue={utils.Global()["TRANSACTION_DIRECTION_OPTS"][0]}
                      options={utils.Global()["TRANSACTION_DIRECTION_OPTS"]}
                      onChange={(e) => handleTransactionsParamsChanges(e)}
                    /> */}
                    <div className="flex gap-2">
                      <button
                        className={`btn btn-xs btn-outline-primary p-2 rounded w-full ${transactionsCreateParams["direction_type"] === "outcome" ? "active" : ""}`}
                        onClick={()=>setTransactionsCreateParams(transactionsCreateParams => ({...transactionsCreateParams, "direction_type": "outcome"}))}
                      ><i className="fa-solid fa-arrow-right mr-1"></i> Pengeluaran</button>
                      <button
                        className={`btn btn-xs btn-outline-primary p-2 rounded w-full ${transactionsCreateParams["direction_type"] === "income" ? "active" : ""}`}
                        onClick={()=>setTransactionsCreateParams(transactionsCreateParams => ({...transactionsCreateParams, "direction_type": "income"}))}
                      ><i className="fa-solid fa-arrow-left mr-1"></i> Pemasukan</button>
                    </div>
                  </div>
                  <div className="flex gap-2 mb-2">
                    <div className="w-full">
                      <label>Kategori</label> <small className="text-danger"><b>*</b></small>
                      <Select
                        name="category"
                        options={categoryOptions}
                        onChange={(e) => handleTransactionsParamsChanges(e)}
                        value={selectedCategoryIdx === null ? null : categoryOptions[selectedCategoryIdx]}
                        formatOptionLabel={oneCategory => (
                          <div className="flex items-center">
                            <img src={oneCategory.icon_url} height="30px" width="30px" alt="category-icon" />
                            <span className="ml-2">{oneCategory.label}</span>
                          </div>
                        )}
                      />
                    </div>
                    <div className="w-full">
                      <label>Untuk Budget?</label>
                      <Select
                        name="monthly_budget_id"
                        options={specificBudgetList}
                        onChange={(e) => handleTransactionsParamsChanges(e)}
                      />
                      <div className="text-xs mt-1">apabila sudah memilih budget, tidak perlu lagi memilih kategori</div>
                    </div>
                  </div>
                  <div className="flex gap-2 mb-2">
                    <div className="w-full">
                      <label>Wallet</label> <small className="text-danger"><b>*</b></small>
                      <Select
                        name="group_wallet_id"
                        options={walletOptions}
                        onChange={(e) => handleTransactionsParamsChanges(e)}
                        value={walletOptions.length === 1 ? walletOptions[0] : null }
                      />
                      <small className="p-1 shadow-sm rounded-lg mt-2 border"><Link to="/groups">+ tambah dompet</Link></small>
                    </div>
                    <div className="w-full">
                      <label>Saldo</label>
                      <div className="input-group">
                        <input type="text" className="form-control" value={utils.FormatMoney(selectedWalletBalance)} readOnly />
                        <div className="input-group-append">
                          <div className="input-group-text">
                            <Link to={`/transactions/adjust?group_wallet_id=${transactionsCreateParams["group_wallet_id"]}`}><i className="fas fa-edit"></i></Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Jumlah</label> <small className="text-danger"><b>*</b></small>
                    {/* <input type="number" className="form-control form-control-sm" name="amount"
                      onChange={(e) => handleTransactionsParamsChanges(e)} value={transactionsCreateParams["amount"]}
                    /> */}
                    <NumberFormat
                      name="amount"
                      className="form-control form-control-sm"
                      value={transactionsCreateParams["amount"]}
                      thousandSeparator={true}
                      prefix={'Rp.'}
                      onValueChange={(values) => setTransactionsCreateParams({...transactionsCreateParams,"amount": values.value})}
                    />
                  </div>
                  <div className="form-group">
                    <label>Waktu Transaksi</label> <small className="text-danger"><b>*</b></small>
                    <input
                      type="datetime-local"
                      className="form-control form-control-sm"
                      name="transaction_at"
                      step="60"
                      onChange={(e) => handleTransactionsParamsChanges(e)}
                      value={transactionsCreateParams["transaction_at"]}
                    />
                  </div>
                  <div className="form-group">
                    <label>Nama</label> <small className="text-danger"><b>*</b></small>
                    <input type="text" className="form-control form-control-sm" name="name"
                      onChange={(e) => handleTransactionsParamsChanges(e)} value={transactionsCreateParams["name"]}/>
                  </div>
                  <div className="form-group">
                    <label>Deskripsi</label>
                    <textarea
                      className="form-control"
                      rows="3"
                      name="description"
                      onChange={(e) => handleTransactionsParamsChanges(e)}
                      value={transactionsCreateParams["description"]}
                    ></textarea>
                  </div>
                  {/* <div className="form-group">
                    <label>Catatan</label>
                    <textarea className="form-control" rows="2" name="note" onChange={(e) => handleTransactionsParamsChanges(e)}></textarea>
                  </div> */}
                </div>
              </div>
            </div>
            <div className="col-12 col-xl-3">

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
