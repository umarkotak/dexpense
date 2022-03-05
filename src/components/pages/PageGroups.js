import React, {useState, useEffect} from "react"
import {Link} from "react-router-dom"
import {useAlert} from 'react-alert'

import dexpenseApi from "../apis/DexpenseApi"

function PageGroups() {
  const alert = useAlert()

  const [groupList, setGroupList] = useState(
    [{"group_wallets": [], "accounts": []}]
  )

  useEffect(() => {
    fetcGroupsData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function fetcGroupsData() {
    try {
      const response = await dexpenseApi.GroupsIndex(localStorage.getItem("DEXPENSE_SESSION_TOKEN"))
      const status = response.status
      const body = await response.json()

      if (status === 200) {
        setGroupList(body.data)
      } else {
        alert.error(`There is some error: ${body.error}`)
      }
    } catch (e) {
      alert.error(`There is some error: ${e.message}`)
    }
  }

  async function handleRemoveMember(groupID, username) {
    if (!window.confirm("Apakah anda yakin ingin mengeluarkan anggota ini?")) {return}

    try {
      const response = await dexpenseApi.GroupsMemberRemove(localStorage.getItem("DEXPENSE_SESSION_TOKEN"), {id: groupID, username: username})
      const status = response.status
      const body = await response.json()

      if (status === 200) {
        alert.success(`Removing member success`)
        fetcGroupsData()
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
                <h1>Groups</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item active"><Link to="/groups">Groups</Link></li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        <section className="content">
          <div className="row">
            <div className="col-12">
              <div className="card card-primary card-outline">
                <div className="card-header">
                  <h3 className="card-title">List</h3>
                  <div className="card-tools">
                    <button type="button" className="btn btn-primary btn-xs" data-card-widget="collapse">
                      <i className="fas fa-minus"></i>
                    </button>
                  </div>
                </div>

                <div className="card-body px-2">
                  <div className="row">
                    <div className="col-12 col-lg-12">
                      {groupList.map((group, k) => (
                        <div className="row my-1 border border-primary rounded" key={k}>
                          <div className="col-4">
                            Nama Group
                          </div>
                          <div className="col-8 my-1">
                            <b>{group.name}</b>
                            <Link to={`/groups/${group.id}`} className="btn btn-xs btn-primary rounded float-right">edit</Link>
                          </div>
                          <div className="col-4">
                            <hr className="my-1" />
                            Daftar Dompet
                            <Link to={`/groups/${group.id}/wallets/create`} className="btn btn-xs btn-primary rounded float-right mr-1"><i className="fa fa-plus-circle"></i></Link>
                          </div>
                          <div className="col-8">
                            <hr className="my-1" />
                            {group["group_wallets"].map((group_wallet, k) => (
                              <div className="my-1" key={k}>
                                <i className="fa fa-caret-right"></i>  {group_wallet.name}
                                <Link to={`/groups/${group.id}/wallets/${group_wallet.id}/edit`} className="btn btn-xs btn-primary rounded float-right">edit</Link>
                              </div>
                            ))}
                          </div>
                          <div className="col-4">
                            <hr className="my-1" />
                            Anggota
                            <Link to={`/groups/${group.id}/members/invite`} className="btn btn-xs btn-primary rounded float-right mr-1"><i className="fa fa-plus-circle"></i></Link>
                          </div>
                          <div className="col-8">
                            <hr className="my-1" />
                            {group["accounts"].map((account, k) => (
                              <div className="my-1" key={k}>
                                <i className="fa fa-caret-right"></i>  {account.username}
                                <button className="btn btn-xs btn-danger rounded float-right" onClick={(e) => {handleRemoveMember(group.id, account.username)}}>hapus</button>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="col-12 col-lg-12">
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Link
        to="/groups/create"
        className="bg-primary"
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
        <i className="fa fa-plus my-float" style={{marginTop:"17px"}}></i>
      </Link>
    </div>
  )
}

export default PageGroups
