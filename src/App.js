import React from "react"

import Navbar from "./components/Navbar"
import Sidebar from "./components/Sidebar"
import Footer from "./components/Footer"

function App() {
  return (
    <div className="hold-transition sidebar-mini layout-fixed">
      <div className="wrapper">
        <Navbar />

        <Sidebar />
      
        <div className="content-wrapper">
          <div className="content-header">

          </div>

          <section className="content">

          </section>
        </div>

        <Footer />
      </div>
    </div>
  )
}

export default App;
