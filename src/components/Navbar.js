import React, {useState, useEffect} from "react"
import {Link, useHistory} from "react-router-dom"
import {useAlert} from 'react-alert'

import dexpenseApi from "./apis/DexpenseApi"

function Navbar() {
  const alert = useAlert()
  const history = useHistory()

  var activeName = localStorage.getItem("DEXPENSE_SESSION_USERNAME") || "Guest"

  useEffect(() => {
    checkProfile()
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
    localStorage.removeItem("DEXPENSE_SESSION_USER")
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
        localStorage.setItem("DEXPENSE_SESSION_USER", JSON.stringify(body.data))
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

  async function checkProfile() {
    try {
      if (!localStorage.getItem("DEXPENSE_SESSION_TOKEN")) { return }

      const response = await dexpenseApi.AccountProfile(localStorage.getItem("DEXPENSE_SESSION_TOKEN"), {})
      const status = response.status
      const body = await response.json()

      if (status === 200) {
        return
      } else if (status === 401) {
        handleLogout()
        history.push("/login")
      } else {
        alert.error(`There is some error: ${body.error}`)
      }
    } catch (e) {
      alert.error(`There is some error: ${e.message}`)
    }
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
        <li className="nav-item dropdown">
          <a className="nav-link" data-toggle="dropdown" href="." aria-expanded="false">
            Hello, <b>{activeName}</b> <i className="fa-solid fa-angle-down"></i>
          </a>

          <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right" style={{left: "inherit", right: "0px"}}>
            <Link to="#">
                <span className="dropdown-item">
                    <div className="flex items-center">
                        <img src="/default_avatar.png" className="img-size-50 py-1 img-circle mr-3" alt="User" />
                        <div className="media-body">
                            <h3 className="dropdown-item-title">Hello, <b>{activeName}</b>!</h3>
                            <p className="text-sm">Aktif Grup: <b>{groupsActive.name} ({groupsActive.id})</b></p>
                        </div>
                    </div>
                </span>
            </Link>
            <div className="dropdown-divider"></div>

            <Link to="/dashboard">
              <span className="dropdown-item dropdown-footer">
                <h3 className="dropdown-item-title">Profile</h3>
              </span>
            </Link>
            <div className="dropdown-divider"></div>

            <Link to="/groups">
              <span className="dropdown-item dropdown-footer">
                  <h3 className="dropdown-item-title">Atur Grup</h3>
              </span>
            </Link>
            <div className="dropdown-divider"></div>

            <div>
              <span className="dropdown-item dropdown-footer">
                  <h3 className="dropdown-item-title">Pilih Grup:</h3>
              </span>
            </div>
            {groups.map((v, k) => (
              <div
                key={k}
                className={`flex dropdown-item dropdown-footer justify-center items-center ${`${v.id}` === `${groupsActive.id}` ? "bg-green-100" : ""}`}
                onClick={(e) => {handleSelectActiveGroups(v.id); window.location.reload();}}
              >
                <i className="fa fa-angle-double-right mr-2"></i> {v.name} ({v.id})
              </div>
            ))}
            <div className="dropdown-divider"></div>

            <Link to="/daily_ibadah">
                <span className="dropdown-item dropdown-footer">
                    <h3 className="dropdown-item-title">Ibadah Harian</h3>
                </span>
            </Link>
            <div className="dropdown-divider"></div>

            <button className="dropdown-item dropdown-footer bg-danger text-white" onClick={() => handleLogout()}><i className="fa fa-sign-out-alt"></i> logout</button>
          </div>
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
