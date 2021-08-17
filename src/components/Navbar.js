import React, {useState, useEffect} from "react"
import {Link, useHistory} from "react-router-dom"
import {useAlert} from 'react-alert'

import dexpenseApi from "./apis/DexpenseApi"

function Navbar() {
  const alert = useAlert()
  const history = useHistory()

  useEffect(() => {
    refreshGroups()
    handleSelectActiveGroups(localStorage.getItem("DEXPENSE_SESSION_GROUPS_ACTIVE_ID"))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => {
    history.listen(() => {
      setDexpenseSessionToken(localStorage.getItem("DEXPENSE_SESSION_TOKEN"))
      refreshGroups()
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history])

  const [dexpenseSessionToken, setDexpenseSessionToken] = useState(localStorage.getItem("DEXPENSE_SESSION_TOKEN"))
  const [groups, setGroups] = useState([])
  const [groupsActive, setGroupsActive] = useState({"id": "", "name": "N/A"})
  useEffect(() => {
    if (localStorage.getItem("DEXPENSE_SESSION_GROUPS_ACTIVE_ID")) {
      handleSelectActiveGroups(localStorage.getItem("DEXPENSE_SESSION_GROUPS_ACTIVE_ID"))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groups])

  function handleLogout() {
    localStorage.removeItem("DEXPENSE_SESSION_TOKEN")
    localStorage.removeItem("DEXPENSE_SESSION_USERNAME")
    localStorage.removeItem("DEXPENSE_SESSION_GROUPS")
    localStorage.removeItem("DEXPENSE_SESSION_GROUPS_ACTIVE_ID")
    history.push("/")
  }

  async function refreshGroups() {
    if (groups.length > 0) { return }
    if (!localStorage.getItem("DEXPENSE_SESSION_TOKEN")) { return }
    if (localStorage.getItem("DEXPENSE_SESSION_GROUPS")) {
      var tempGroups = JSON.parse(localStorage.getItem("DEXPENSE_SESSION_GROUPS"))
      setGroups(tempGroups)
      return
    }
    try {
      const response = await dexpenseApi.AccountProfile(localStorage.getItem("DEXPENSE_SESSION_TOKEN"), {})
      const status = response.status
      const body = await response.json()

      if (status === 200) {
        localStorage.setItem("DEXPENSE_SESSION_GROUPS", JSON.stringify(body.data.groups))
        localStorage.setItem("DEXPENSE_SESSION_GROUPS_ACTIVE_ID", body.data.groups[0].id)
        setGroups(body.data.groups)
        setGroupsActive({"id": body.data.groups[0].id, "name": body.data.groups[0].name})
      } else {
        alert.error(`There is some error: ${body.error}`)
      }
    } catch (e) {
      alert.error(`There is some error: ${e.message}`)
    }
  }

  function handleSelectActiveGroups(id) {
    localStorage.setItem("DEXPENSE_SESSION_GROUPS_ACTIVE_ID", id)
    var tempGroup = groups.find((obj) => { return parseInt(obj.id) === parseInt(id) })
    if (!tempGroup) { return }
    setGroupsActive({"id": id, "name": tempGroup.name})
  }

  return (
    <div>
      <nav className="main-header navbar navbar-expand navbar-dark">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to="#" className="nav-link" data-widget="pushmenu" role="button"><i className="fas fa-bars"></i></Link>
          </li>
        </ul>

        <NavItems />
      </nav>
    </div>
  )

  function NavItems() {
    if (dexpenseSessionToken) {
      return OnLoggedIn()
    } else {
      return OnPublic()
    }
  }

  function OnLoggedIn() {
    return(
      <ul className="navbar-nav ml-auto">
        <li className="nav-item" id="nav-items-1">
          <button className="btn btn-sm btn-outline-light mr-2" disabled><i className="fa fa-users"></i> group :</button>
        </li>

        <li className="nav-item dropdown show" id="nav-items-2">
          <a className="btn btn-sm btn-primary mr-2" data-toggle="dropdown" href="/#" aria-expanded="false" id="nav-items-2-1">{groupsActive.name}</a>
          <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right" style={{left: "inherit", right: "0px"}}>
            {groups.map((v, k) => (
              <div key={k}>
                <button className="dropdown-item" onClick={(e) => {handleSelectActiveGroups(v.id); window.location.reload();}}>
                  <div className="media">
                    <div className="media-body">
                      <h3 className="dropdown-item-title"><i className="fa fa-angle-double-right"></i> {v.name}</h3>
                      <p className="text-sm">ID: {v.id}</p>
                    </div>
                  </div>
                </button>
                <div className="dropdown-divider"></div>
              </div>
            ))}
          </div>
        </li>

        <li className="nav-item" id="nav-items-3">
          <button className="btn btn-sm btn-danger" onClick={() => handleLogout()}><i className="fa fa-sign-out-alt"></i> logout</button>
        </li>
      </ul>
    )
  }

  function OnPublic() {
    return(
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link to="/sign_up" className="btn btn-sm btn-outline-light mr-2"><i className="fa fa-user-plus"></i> Sign Up</Link>
        </li>
        <li className="nav-item">
          <Link to="/login" className="btn btn-sm btn-primary text-white"><i className="fa fa-sign-in-alt"></i> Login</Link>
        </li>
      </ul>
    )
  }
}

export default Navbar
