import React from "react"
import {Link} from "react-router-dom"

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
                  <li className="breadcrumb-item active"><Link to="/home">Home</Link></li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        <section className="content">
          <div className="row" style={{maxHeight: "200px"}}>
            <div className="col-8 col-md-6 pr-0">
              <div className="border rounded p-4 bg-olive">
                <h1><b>DEX</b>PENSE</h1>
                <br/>
                <h2><b>Group</b> Budgetting</h2>
                <h2>On The Go <b>Anywhere!</b></h2>
                <br/>
                <br/>
                <h4><Link to="/sign_up" className="btn btn-light rounded">Try Now!</Link> It's Free!</h4>
              </div>
            </div>
            <div className="col-4 col-md-6 pl-0">
              <div className="border rounded" style={
                {
                  backgroundImage: `url(/images/home-background.jpeg)`,
                  backgroundSize: "cover",
                  height: "100%"
                }
              }>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default PageHome