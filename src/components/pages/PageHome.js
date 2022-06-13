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
            <div className="col-12 col-xl-9 mb-4">
              <MainMenu />
              <div className="mb-2"></div>
              <HomeContent />
            </div>
            <div className="col-12 col-xl-3">
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
        <div className="shadow-sm bg-white rounded p-2">
          <div className="d-flex flex-row align-items-center justify-content-start">
            <div className="" style={{width: "70px"}}>
              <div className="border border-primary p-1 text-center" style={{borderRadius: "10%"}}>
                <Link to="/transactions/daily" style={{color: "#FF844B"}}>
                  <div className="flex">
                    <i className="fas fa-hand-holding-usd" style={{fontSize: "22px"}}></i>
                    <small className="text-primary">Transaksi</small>
                  </div>
                </Link>
              </div>
            </div>
            <div className="ml-2" style={{width: "70px"}}>
              <div className="border border-primary p-1 text-center" style={{borderRadius: "10%"}}>
                <Link to="/budgets" style={{color: "#FF844B"}}>
                  <div>
                    <i className="fas fa-list-ul" style={{fontSize: "22px"}}></i>
                    <br/>
                    <small className="text-primary">Budget</small>
                  </div>
                </Link>
              </div>
            </div>
            <div className="ml-2" style={{width: "70px"}}>
              <div className="border border-primary p-1 text-center" style={{borderRadius: "10%"}}>
                <Link to="/wealth_assets" style={{color: "#FF844B"}}>
                  <div>
                    <i className="fa fa-building-columns" style={{fontSize: "22px"}}></i>
                    <br/>
                    <small className="text-primary">Asset</small>
                  </div>
                </Link>
              </div>
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