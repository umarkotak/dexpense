import React, {useState} from "react"
import {useHistory, Link, useParams} from "react-router-dom"
import {useAlert} from 'react-alert'

import dexpenseApi from "../apis/DexpenseApi"

function PageGroupsMemberInvite() {
  const history = useHistory()
  const alert = useAlert()

  let { id } = useParams()
  const groupID = parseInt(id)

  const [memberInviteParams, setMemberInviteParams] = useState({
    "id": groupID,
    "username": ""
  })
  function handleMemberInviteParamsChanges(e) {
    const { name, value } = e.target
    setMemberInviteParams(memberInviteParams => ({...memberInviteParams, [name]: value}))
  }

  async function handleMemberInviteSubmit() {
    try {
      const response = await dexpenseApi.GroupsMemberInvite(localStorage.getItem("DEXPENSE_SESSION_TOKEN"), memberInviteParams)
      const status = response.status
      const body = await response.json()

      if (status === 200) {
        alert.info("Member invitation success!")
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
                <h1>Invite Member</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item active"><Link to="/groups">Groups</Link></li>
                  <li className="breadcrumb-item active"><Link to={`/groups/${groupID}/members/invite`}>Invite</Link></li>
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
                    <label>Username</label> <small className="text-danger"><b>*</b></small>
                    <input type="text" className="form-control form-control-sm" name="username" onChange={(e) => handleMemberInviteParamsChanges(e)} />
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
        to={`/groups/${groupID}/members/invite`}
        className="bg-primary"
        onClick={() => handleMemberInviteSubmit()}
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

export default PageGroupsMemberInvite