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
        <div className="bg-white rounded-2xl p-2">
          <div className="flex items-center justify-content-between">
            <Link to="/transactions/create" className="rounded-2xl shadow-md flex-auto w-full overflow-hidden hover:bg-gray-100 mx-1 py-1">
              <div className="flex flex-col items-center">
                <i className="fas fa-plus mt-2"></i>
                <small className="font-weight-bold">Tambah</small>
              </div>
            </Link>
              <Link to="/transactions/daily" className="rounded-2xl shadow-md flex-auto w-full overflow-hidden hover:bg-gray-100 mx-1 py-1">
                <div className="flex flex-col items-center">
                  <i className="fas fa-hand-holding-usd mt-2"></i>
                  <small className="font-weight-bold">Transaksi</small>
                </div>
              </Link>
              <Link to="/budgets" className="rounded-2xl shadow-md flex-auto w-full overflow-hidden hover:bg-gray-100 mx-1 py-1">
                <div className="flex flex-col items-center">
                  <i className="fas fa-list-ul mt-2"></i>
                  <small className="font-weight-bold">Budget</small>
                </div>
              </Link>
              <Link to="/wealth_assets" className="rounded-2xl shadow-md flex-auto w-full overflow-hidden hover:bg-gray-100 mx-1 py-1">
                <div className="flex flex-col items-center">
                  <i className="fa fa-building-columns mt-2"></i>
                  <small className="font-weight-bold">Asset</small>
                </div>
              </Link>
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
