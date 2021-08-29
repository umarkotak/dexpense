import React, {useState, useEffect} from "react"
import {Link, useParams} from "react-router-dom"
import {useAlert} from 'react-alert'

import dexpenseApi from "../apis/DexpenseApi"

function PageGroupsDetail() {
  const alert = useAlert()

  let { id } = useParams()
  const groupID = parseInt(id)

  const [group, setGroup] = useState({
    "name": "",
    "account": {"username": ""}
  })
  function handleGroupChanges(e) {
    const { name, value } = e.target
    setGroup(group => ({...group, [name]: value}))
  }

  useEffect(() => {
    fetcGroupData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function fetcGroupData() {
    try {
      const response = await dexpenseApi.GroupsShow(localStorage.getItem("DEXPENSE_SESSION_TOKEN"), {id: groupID})
      const status = response.status
      const body = await response.json()

      if (status === 200) {
        setGroup(body.data)
      } else {
        alert.error(`There is some error: ${body.error}`)
      }
    } catch (e) {
      alert.error(`There is some error: ${e.message}`)
    }
  }

  async function handleGroupEditSubmit() {
    try {
      const response = await dexpenseApi.GroupsEdit(localStorage.getItem("DEXPENSE_SESSION_TOKEN"), group)
      const status = response.status
      const body = await response.json()

      if (status === 200) {
        localStorage.removeItem("DEXPENSE_SESSION_GROUPS")
        alert.info("Group edit success!")
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
                <h1>Group Detail</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item active"><Link to="/groups">Groups</Link></li>
                  <li className="breadcrumb-item active"><Link to={`/groups/${groupID}`}>Detail</Link></li>
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
                    <label>Pemilik</label>
                    <input type="text" className="form-control form-control-sm" readOnly defaultValue={group["account"]["username"]} />
                  </div>
                  <div className="form-group">
                    <label>Nama</label> <small className="text-danger"><b>*</b></small>
                    <input type="text" className="form-control form-control-sm" name="name" onChange={(e) => handleGroupChanges(e)} defaultValue={group["name"]} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Link
        to={`/groups/${groupID}`}
        className="bg-primary"
        onClick={() => handleGroupEditSubmit()}
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

export default PageGroupsDetail