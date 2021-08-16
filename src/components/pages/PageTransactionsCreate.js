import React, {useState} from "react"
import {useHistory} from "react-router-dom"
import {useAlert} from 'react-alert'
import Select from 'react-select'

function PageTransactionsCreate() {
  const alert = useAlert()
  const history = useHistory()
  
  const [transactionsCreateParams, setTransactionsCreateParams] = useState({
    "category": "",
    "amount": 0,
    "direction_type": "out",
    "group_wallet_id": 0,
    "name": "",
    "description": "",
    "note": ""
  })

  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]
  
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
            <div className="col-12 col-lg-3">
              <div className="card card-primary card-outline">
                <div className="card-header">
                  <button className="btn btn-primary btn-xs"><i className="fas fa-check mr-2"></i> SUBMIT</button>
                  <div className="card-tools">
                    <button type="button" className="btn btn-primary btn-xs" data-card-widget="collapse">
                      <i className="fas fa-minus"></i>
                    </button>
                  </div>
                </div>
                <div className="card-body">
                  <div className="form-group" data-select2-id="29">
                    <label>Category</label>
                    <Select options={options} />
                  </div>
                  <div className="form-group">
                    <label>Amount</label>
                    <input type="text" className="form-control form-control-sm" />
                  </div>
                  <div className="form-group">
                    <label>Direction</label>
                    <input type="text" className="form-control form-control-sm" />
                  </div>
                  <div className="form-group">
                    <label>Wallet</label>
                    <input type="text" className="form-control form-control-sm" />
                  </div>
                  <div className="form-group">
                    <label>Name</label>
                    <input type="text" className="form-control form-control-sm" />
                  </div>
                  <div className="form-group">
                    <label>Description</label>
                    <textarea className="form-control" rows="3" ></textarea>
                  </div>
                  <div className="form-group">
                    <label>Notes</label>
                    <textarea className="form-control" rows="2" ></textarea>
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
