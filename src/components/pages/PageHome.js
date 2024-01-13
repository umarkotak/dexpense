import React from "react"
import {Link} from "react-router-dom"

import MiniTips from "../components/MiniTips"
import BlogPost from "../components/BlogPost"

function PageHome() {
  return (
    <div>
      <div className="content-wrapper pt-2" style={{
        backgroundColor: "#E3EDF2",
      }}>
        <section className="content">
          <div className="row">
            <div className="col-12 col-xl-9 mb-4 flex justify-center">
              <div className="w-full max-w-md">
                <MainMenu />
                <div className="mb-2"></div>
                <HomeContent />
              </div>
            </div>
            <div className="col-12 col-xl-3 flex justify-center">
              <MiniTips />
            </div>
          </div>
        </section>
      </div>
    </div>
  )

  function MainMenu() {
    return(
      <>
        <div className="shadow-sm bg-white rounded-pill p-2">
          <div className="d-flex flex-row align-items-center justify-content-start">
              <Link to="/transactions/create" style={{color: "#FF844B"}}>
            <div className="btn-outline-primary border border-primary p-1 text-center" style={{width: "60px", height: "60px", borderRadius: "50%"}}>
                <div className="d-flex flex-column align-items-center">
                  <i className="fas fa-plus mt-2" style={{fontSize: "18px"}}></i>
                  <small className="font-weight-bold" style={{fontSize: "10px"}}>Transaksi</small>
                </div>
            </div>
              </Link>
            <div className="btn-outline-primary border border-primary p-1 text-center ml-2" style={{width: "60px", height: "60px", borderRadius: "50%"}}>
              <Link to="/transactions/daily" style={{color: "#FF844B"}}>
                <div className="d-flex flex-column align-items-center">
                  <i className="fas fa-hand-holding-usd mt-2" style={{fontSize: "18px"}}></i>
                  <small className="font-weight-bold" style={{fontSize: "10px"}}>Histori</small>
                </div>
              </Link>
            </div>
            <div className="btn-outline-primary border border-primary p-1 text-center ml-2" style={{width: "60px", height: "60px", borderRadius: "50%"}}>
              <Link to="/budgets" style={{color: "#FF844B"}}>
                <div className="d-flex flex-column align-items-center">
                  <i className="fas fa-list-ul mt-2" style={{fontSize: "18px"}}></i>
                  <small className="font-weight-bold" style={{fontSize: "10px"}}>Budget</small>
                </div>
              </Link>
            </div>
            <div className="btn-outline-primary border border-primary p-1 text-center ml-2" style={{width: "60px", height: "60px", borderRadius: "50%"}}>
              <Link to="/wealth_assets" style={{color: "#FF844B"}}>
                <div className="d-flex flex-column align-items-center">
                  <i className="fa fa-building-columns mt-2" style={{fontSize: "18px"}}></i>
                  <small className="font-weight-bold" style={{fontSize: "10px"}}>Asset</small>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </>
    )
  }

  function HomeContent() {
    return(
      <>
        <BlogPost />
      </>
    )
  }
}

export default PageHome
