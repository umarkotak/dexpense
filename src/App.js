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
      
        <div class="content-wrapper">
          <div class="content-header">

          </div>

          <section class="content">

          </section>
        </div>

        <Footer />
      </div>
    </div>
  )
}

export default App;
