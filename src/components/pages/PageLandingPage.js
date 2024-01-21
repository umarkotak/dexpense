import React from "react"
import {Link} from "react-router-dom"

// import MiniTips from "../components/MiniTips"
// import BlogPost from "../components/BlogPost"

function PageLandingPage() {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <header className="fixed w-full z-30 transition duration-300 ease-in-out bg-slate-50">
        <div className="max-w-6xl mx-auto px-5 sm:px-6">
          <div className="flex items-center justify-between h-16 md:h-20">
            <Link to="/">
              <div className="flex items-center">
                <img className="flex-none w-10 h-10 rounded-full mr-2" src="/images/new_logo.png" alt="bukukaskita"></img>
                <span className="text-green-500 text-bold flex-none">BUKUKAS</span>
                <span className="text-black text-bold">KITA</span>
              </div>
            </Link>
            <div className="flex">
              <a
                className="font-medium text-gray-600 hover:text-gray-900 px-5 py-3 flex items-center transition duration-150 ease-in-out"
                href="/login"
              >
                Sign In
              </a>
              <a className="btn-sm text-gray-200 bg-gray-900 hover:bg-gray-1000 ml-3" href="/signup">
                <span>Sign up</span>
              </a>
            </div>
          </div>
        </div>
      </header>
    </div>
  )
}

export default PageLandingPage
