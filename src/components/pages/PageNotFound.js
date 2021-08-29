import React from "react"
import {Link} from "react-router-dom"
import {useAlert} from 'react-alert'

function PageNotFound() {
  const alert = useAlert()

  return (
    <div>
      <div className="content-wrapper">
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>404 Error Page</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item active"><Link to="/not_found">Not Found</Link></li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        <section className="content">
          <div className="error-page">
            <h2 className="headline text-warning"> 404</h2>

            <div className="error-content">
              <h3><i className="fas fa-exclamation-triangle text-warning"></i> Maaf halaman yang anda cari tidak ditemukan</h3>

              <p>
                Kita ga nemu nih halaman yang kamu cari.
                Jadi... kamu bisa coba balik ke <Link to="/home">halaman Home</Link> atau coba halaman lain yang ada di menu.
              </p>

              <div className="search-form">
                <div className="input-group">
                  <input type="text" name="search" className="form-control" placeholder="Search" />

                  <div className="input-group-append">
                    <button type="submit" name="submit" className="btn btn-warning" onClick={() => alert.error("Fiturnya belom dibikin. Cari aja yang di menu gan!")}>
                      <i className="fas fa-search"></i>
                    </button>
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

export default PageNotFound
