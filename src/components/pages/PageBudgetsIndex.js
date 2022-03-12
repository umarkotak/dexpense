import React from "react"
import {Link} from "react-router-dom"

function PageBudgetsIndex() {
  return(
    <div>
      <div className="content-wrapper" style={{
        backgroundColor: "#F7F0F5",
      }}>
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Budgeting Bulanan</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item active"><Link to="/budgets">budgets</Link></li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        <section className="content">
          <div className="px-1">
            <div className="row">
              <div className="col-12">
                <div className="d-flex justify-content-between">
                  <span style={{fontSize: "14px"}}>Hi <b>Jhone Doe!</b></span>
                  <span style={{fontSize: "14px"}}>Maret sisa <b>10 Hari Lagi!</b></span>
                </div>
              </div>
            </div>
            <div className="row" style={{marginTop: "24px"}}>
              <div className="col-12">
                <div className="d-flex justify-content-between">
                  <span style={{fontSize: "14px"}}><b>Detail Budgetmu!</b></span>
                </div>
              </div>
            </div>
            <div className="row" style={{marginTop: "24px"}}>
              <div className="col-12">
                {[4,5,6].map((val) => (
                  <div style={{marginBottom: "24px"}}>
                    <div className="d-flex justify-content-between">
                      <span style={{fontSize: "14px"}}><b>Buat Makan</b></span>
                      <span style={{fontSize: "14px"}}>Rp 245.500 / hari</span>
                    </div>
                    <div className="">
                      <div className="progress rounded" style={{height: "26px", backgroundColor: "#EDCBCE"}}>
                        <div className="progress-bar rounded" style={{width: `${val*10}%`, backgroundColor: "#BD0039"}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                      <div className="text-white" style={{textAlign: "center", marginTop: "-26px"}}><small><b>3.750.000 / 5jt</b></small></div>
                      <div className="text-white" style={{textAlign: "left", marginTop: "-24px", marginLeft: "4px"}}><small><b>Icon</b></small></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={{
          }}>
            <div style={{
              marginTop: `24px`,
              height: `255px`,
              backgroundImage: `url('/images/budgeting_bg.png')`,
              backgroundRepeat: `no-repeat`,
              backgroundPosition: `center`,
              backgroundPositionY: `bottom`,
              backgroundSize: `contain`,
            }}></div>
          </div>
        </section>
      </div>

      <Link
        to="/transactions/create"
        className="bg-danger"
        onClick={() => {}}
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

export default PageBudgetsIndex
