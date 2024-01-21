import React, {useState, useEffect} from "react"
import {Link, useHistory} from "react-router-dom"

function PageLandingPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const history = useHistory()

  useEffect(() => {
    if (localStorage.getItem("DEXPENSE_SESSION_TOKEN")) {
      setIsLoggedIn(true)
      history.push("/home")
    }
    // eslint-disable-next-line
  }, [])

  function handleLogout() {
    localStorage.removeItem("DEXPENSE_SESSION_TOKEN")
    localStorage.removeItem("DEXPENSE_SESSION_USERNAME")
    localStorage.removeItem("DEXPENSE_SESSION_USER")
    localStorage.removeItem("DEXPENSE_SESSION_GROUPS")
    localStorage.removeItem("DEXPENSE_SESSION_GROUPS_ACTIVE_ID")
    history.push("/")
  }

  return (
    <div className="flex flex-col min-h-screen overflow-hidden bg-slate-100">
      <header className="fixed w-full z-50 transition duration-300 ease-in-out bg-slate-50 shadow-sm bg-opacity-60 backdrop-blur">
        <div className="mx-auto max-w-6xl px-2">
          <div className="flex items-center justify-between h-16 md:h-20">
            <Link to="/">
              <div className="flex items-center">
                <img className="flex-none w-10 h-10 rounded-full mr-2" src="/images/new_logo.png" alt="bukukaskita"></img>
                <span className="text-green-500 text-bold flex-none">BUKUKAS</span>
                <span className="text-black text-bold">KITA</span>
              </div>
            </Link>
            <div className="flex">
              {isLoggedIn ? <>
                <a
                  className="bg-gray-200 hover:bg-gray-300 px-2 py-2 flex items-center shadow-sm rounded-xl text-sm mr-2"
                  href="/home"
                >
                  Dashboard
                </a>
                <button
                  className="hover:text-red-700 px-2 py-2 flex items-center rounded-xl text-sm text-red-500"
                  onClick={()=>{handleLogout()}}
                >
                  <span>Logout</span>
                </button>
              </> : <>
                <a
                  className="bg-blue-200 hover:bg-blue-300 px-2 py-2 flex items-center shadow-sm rounded-xl mr-2 text-sm"
                  href="/login"
                >
                  Sign In
                </a>
                <a
                  className="hover:bg-gray-300 px-2 py-2 flex items-center shadow-sm rounded-xl text-sm"
                  href="/sign_up"
                >
                  <span>Sign up</span>
                </a>
              </>}
            </div>
          </div>
        </div>
      </header>

      {/* <div style={{backgroundImage: "url(/images/bg.jpg)"}} className="w-full h-screen absolute z-0">

      </div> */}

      <div
        className="flex flex-col justify-center w-full mx-auto max-w-6xl px-2 mt-32 z-10"
      >
        <div className="text-center w-full p-6">
          <div className="text-4xl lg:text-6xl">
            BUKUKAS KITA
          </div>
          <div className="text-md">
            aplikasi manajemen keuangan<br/>
            untuk bersama
          </div>
        </div>

        <div className="text-xs mt-8 text-center w-full p-6">
          berbagai fitur keuangan berada dalam satu aplikasi.<br/>
          pencatatan harian, budgeting bulanan, pencatatan asset, dan lainnya<br/>
          dapat anda dapatkan di bukukas kita - gratis!.
        </div>

        <div className="flex justify-center">
          <a
            className="bg-blue-200 hover:bg-blue-300 px-2 py-2 flex items-center shadow-sm rounded-xl mr-2 text-sm border"
            href="/login"
          >
            Masuk
          </a>
          <a
            className="hover:bg-gray-300 px-2 py-2 flex items-center shadow-sm rounded-xl text-sm border"
            href="/sign_up"
          >
            <span>Daftar Baru</span>
          </a>
        </div>
      </div>
    </div>
  )
}

export default PageLandingPage
