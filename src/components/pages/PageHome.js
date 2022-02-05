import React from "react"
import {Link} from "react-router-dom"

function PageHome() {
  return (
    <div>
      <div className="content-wrapper">
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Home</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item active"><Link to="/home">Home</Link></li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        <section className="content">
          <div className="row" style={{maxHeight: "200px"}}>
            <div className="col-8 col-md-6 pr-0">
              <div className="border rounded p-4 bg-olive">
                <h1><b className="bg-white rounded p-1"><span className="text-teal">BUKUKAS</span></b>KITA</h1>
                <br/>
                <h2><b>Group</b> Budgetting</h2>
                <h2>On The Go, <b>Anywhere!</b></h2>
                <br/>
                <br/>
                <h4><Link to="/sign_up" className="btn btn-light rounded">Sign Up Now!</Link> It's Free!</h4>
              </div>
            </div>
            <div className="col-4 col-md-6 pl-0">
              <div className="border rounded" style={
                {
                  backgroundImage: `url(/images/home-background.jpeg)`,
                  backgroundSize: "cover",
                  height: "100%"
                }
              }>
              </div>
            </div>
            <div className="col-12 mt-2">
              <div className="bg-light border rounded p-2">
                <h3>Features</h3>
                <ul>
                  <li>Pencatatan transaksi harian dan bulanan.</li>
                  <li>Dompet dengan pencatatan saldo.</li>
                  <li>Manajemen user, group, dan wallet.</li>
                  <li>Grafik statistik pengeluaran dan pertumbuhan harta.</li>
                  <li>[WIP] Download report dalam bentuk excel</li>
                  <li>[WIP] Budgeting bulanan. (create, update, delete, index)</li>
                  <li>[WIP] Simulasi investasi dengan Emas dan platform Alami.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default PageHome