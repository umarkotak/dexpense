import React from "react"
import {Link} from "react-router-dom"

function PageDashboard() {
  return (
    <div>
      <div className="content-wrapper">
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Dashboard</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item active"><Link to="/dashboard">Dashboard</Link></li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        <section className="content">
          <div className="row">
            <div className="col-12 col-lg-3">
              <div className="card card-primary card-outline">
                <div className="card-body box-profile">
                  <div className="text-center">
                    <img className="profile-user-img img-fluid img-circle" src="/default_avatar.png" alt="User Profile" />
                  </div>
                  <h3 className="profile-username text-center">{localStorage.getItem("DEXPENSE_SESSION_USERNAME")}</h3>
                </div>
              </div>
              <div className="card card-primary">
                <div className="card-header"><h3 className="card-title">Summary</h3></div>
                <div className="card-body">
                  <div>
                    <strong><i className="fas fa-wallet mr-1"></i> Total Saldo</strong>
                    <p className="text-muted my-1">IDR 995.000</p>
                    <hr className="my-2" />
                  </div>
                  <div>
                    <strong className="text-success"><i className="fas fa-reply mr-1"></i> Total Pemasukan</strong>
                    <p className="text-muted my-1">IDR 1.000.000</p>
                    <hr className="my-2" />
                  </div>
                  <div>
                    <strong className="text-danger"><i className="fas fa-share mr-1"></i> Total Pengeluaran</strong>
                    <p className="text-muted my-1">IDR 5.000</p>
                    <hr className="my-2" />
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 col-lg-9">
              <div className="card card-primary card-outline">
                <div className="card-body">
                  <div className="timeline timeline-inverse">
                    <div className="time-label"><span className="bg-info"><i className="fa fa-caret-right"></i> 2020 Jan 02</span></div>
                    <div>
                      <i className="fas fa-user bg-danger"></i>
                      <div className="timeline-item">
                        <span className="time"><i className="far fa-clock"></i> 2020 Jan 01 - 13:45</span>
                        <h3 className="timeline-header"><Link to="#">Jhone Doe</Link> - Pengeluaran</h3>
                        <div className="timeline-body">
                          <ul className="list-unstyled">
                            <li>Wallet: Gopay</li>
                            <li>Kategori: Food</li>
                            <li>Jumlah: IDR 5.000</li>
                            <li><b>Bakso</b>. Deskripsi. Note</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="time-label"><span className="bg-info"><i className="fa fa-caret-right"></i> 2020 Jan 01</span></div>
                    <div>
                      <i className="fas fa-user bg-success"></i>
                      <div className="timeline-item">
                        <span className="time"><i className="far fa-clock"></i> 2020 Jan 01 - 13:45</span>
                        <h3 className="timeline-header"><Link to="#">Jhone Doe</Link> - Pemasukan</h3>
                        <div className="timeline-body">
                          <ul className="list-unstyled">
                            <li>Wallet: Gopay</li>
                            <li>Kategori: Food</li>
                            <li>Jumlah: IDR 5.000</li>
                            <li><b>Bakso</b>. Deskripsi. Note</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div><i className="far fa-clock bg-gray"></i></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default PageDashboard