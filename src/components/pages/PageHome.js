import React from "react"
import {Link} from "react-router-dom"

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
              <HomeRightSide />
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
          <div className="flex items-center">
            <Link to="/transactions/create" className="rounded-2xl shadow-md w-16 overflow-hidden hover:bg-gray-100 mx-1 py-1 border">
              <div className="flex flex-col items-center">
                <i className="fas fa-plus mt-2"></i>
                <small className="text-xs">Tambah</small>
              </div>
            </Link>
              <Link to="/transactions/daily" className="rounded-2xl shadow-md w-16 overflow-hidden hover:bg-gray-100 mx-1 py-1 border">
                <div className="flex flex-col items-center">
                  <i className="fas fa-hand-holding-usd mt-2"></i>
                  <small className="text-xs">Transaksi</small>
                </div>
              </Link>
              <Link to="/budgets" className="rounded-2xl shadow-md w-16 overflow-hidden hover:bg-gray-100 mx-1 py-1 border">
                <div className="flex flex-col items-center">
                  <i className="fas fa-list-ul mt-2"></i>
                  <small className="text-xs">Budget</small>
                </div>
              </Link>
              <Link to="/wealth_assets" className="rounded-2xl shadow-md w-16 overflow-hidden hover:bg-gray-100 mx-1 py-1 border">
                <div className="flex flex-col items-center">
                  <i className="fa fa-building-columns mt-2"></i>
                  <small className="text-xs">Asset</small>
                </div>
              </Link>
          </div>
        </div>
      </>
    )
  }

  function HomeContent() {
    return(<>
      <BlogPost />
    </>)
  }

  function HomeRightSide() {
    return(<div className="w-full flex justify-center">
      <div className="w-full rounded-xl bg-white p-2 max-w-md">
        <span>Welcome!</span>
      </div>
    </div>)
  }
}

export default PageHome
