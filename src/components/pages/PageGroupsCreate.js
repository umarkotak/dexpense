import React, {useState} from "react"
import {useHistory, Link} from "react-router-dom"
import {useAlert} from 'react-alert'

import dexpenseApi from "../apis/DexpenseApi"

function PageGroupsCreate() {
  const history = useHistory()
  const alert = useAlert()

  const [groupCreateParams, setGroupCreateParams] = useState({
    "name": ""
  })
  function handleGroupsParamsChanges(e) {
    const { name, value } = e.target
    setGroupCreateParams(groupCreateParams => ({...groupCreateParams, [name]: value}))
  }

  async function handleGroupSubmit() {
    try {
      const response = await dexpenseApi.GroupsCreate(localStorage.getItem("DEXPENSE_SESSION_TOKEN"), groupCreateParams)
      const status = response.status
      const body = await response.json()

      if (status === 200) {
        alert.info("Group creation success!")
        history.push("/groups")
      } else {
        alert.error(`There is some error: ${body.error}`)
      }
    } catch (e) {
      alert.error(`There is some error: ${e.message}`)
    }
  }
  
  return (
    <div>
      <div className="content-wrapper">
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>New Group</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item active"><Link to="/groups">Groups</Link></li>
                  <li className="breadcrumb-item active"><Link to="/groups/create">New</Link></li>
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
                    <button type="button" className="btn btn-primary btn-xs" data-card-widget="collapse">
                      <i className="fas fa-minus"></i>
                    </button>
                  </div>
                </div>
                <div className="card-body">
                  <div className="form-group">
                    <label>Nama</label> <small className="text-danger"><b>*</b></small>
                    <input type="text" className="form-control form-control-sm" name="name" onChange={(e) => handleGroupsParamsChanges(e)} />
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
        to="/groups/create"
        className="bg-primary"
        onClick={() => handleGroupSubmit()}
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

export default PageGroupsCreate
