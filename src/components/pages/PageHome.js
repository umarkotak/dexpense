import React from "react"

function PageHome() {
  return (
    <div>
      <div className="content-wrapper">
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Home</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item active"><a href="">Home</a></li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        <section className="content">
        </section>
      </div>
    </div>
  )
}

export default PageHome