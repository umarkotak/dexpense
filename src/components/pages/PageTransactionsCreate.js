import React, {useState} from "react"
import {useHistory} from "react-router-dom"
import {useAlert} from 'react-alert'
import Select from 'react-select'

function PageTransactionsCreate() {
  const alert = useAlert()
  const history = useHistory()
  
  const [transactionsCreateParams, setTransactionsCreateParams] = useState({
    "category": "food",
    "amount": 0,
    "direction_type": "out",
    "group_wallet_id": 0,
    "name": "",
    "description": "",
    "note": ""
  })
  function handleTransactionsParamsChanges(e) {
    try {
      const { name, value } = e.target
      setTransactionsCreateParams(transactionsCreateParams => ({...transactionsCreateParams, [name]: value}))
    } catch (err) {
      setTransactionsCreateParams(transactionsCreateParams => ({...transactionsCreateParams, [e.name]: e.value}))
    } 
  }

  const options = [
    { name: 'category', value: 'food', label: 'Food' },
    { name: 'category', value: 'daily_needs', label: 'Daily Needs' },
    { name: 'category', value: 'other', label: 'Other' }
  ]
  const directionOptions = [
    { name: 'direction_type', value: 'income', label: 'In-Come' },
    { name: 'direction_type', value: 'outcome', label: 'Out-Come' }
  ]

  const [walletOptions, setWalletOptions] = useState([])

  function handleTransactionSubmit() {
    console.log(transactionsCreateParams)
  }
  
  return (
    <div>
      <div className="content-wrapper">
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Transactions Create</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item active"><a href="/#">Transactions</a></li>
                  <li className="breadcrumb-item active"><a href="/#">Create</a></li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        <section className="content">
          <div className="row">
            <div className="col-12 col-xl-4">
              <div className="card card-primary card-outline">
                <div className="card-header">
                  <button className="btn btn-primary btn-xs" onClick={() => handleTransactionSubmit()}><i className="fas fa-check mr-2"></i> SUBMIT</button>
                  <div className="card-tools">
                    <button type="button" className="btn btn-primary btn-xs" data-card-widget="collapse">
                      <i className="fas fa-minus"></i>
                    </button>
                  </div>
                </div>
                <div className="card-body">
                  <div className="form-group" data-select2-id="29">
                    <label>Category</label> <small className="text-danger"><b>*</b></small>
                    <Select
                      name="category"
                      options={options}
                      defaultValue={transactionsCreateParams.category}
                      onChange={(e) => handleTransactionsParamsChanges(e)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Wallet</label> <small className="text-danger"><b>*</b></small>
                    <Select
                      name="group_wallet_id"
                      options={walletOptions}
                      onChange={(e) => handleTransactionsParamsChanges(e)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Amount</label> <small className="text-danger"><b>*</b></small>
                    <input type="number" className="form-control form-control-sm" name="amount" />
                  </div>
                  <div className="form-group">
                    <label>Direction</label> <small className="text-danger"><b>*</b></small>
                    <Select
                      options={directionOptions}
                      onChange={(e) => handleTransactionsParamsChanges(e)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Name</label> <small className="text-danger"><b>*</b></small>
                    <input type="text" className="form-control form-control-sm" name="name" />
                  </div>
                  <div className="form-group">
                    <label>Description</label>
                    <textarea className="form-control" rows="3" name="description"></textarea>
                  </div>
                  <div className="form-group">
                    <label>Note</label>
                    <textarea className="form-control" rows="2" name="note"></textarea>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-4">

            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default PageTransactionsCreate