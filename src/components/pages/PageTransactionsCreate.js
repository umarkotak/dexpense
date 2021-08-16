import React from "react"

function PageTransactionsCreate() {
  return (
    <div>
      <div className="content-wrapper">
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Transactions Create</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item active"><a href="#">Transactions</a></li>
                  <li className="breadcrumb-item active"><a href="#">Create</a></li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        <section className="content">
          <div className="row">
            <div className="col-12 col-lg-3">
              <div className="card card-primary card-outline">
                <div className="card-header">
                  <button className="btn btn-primary btn-xs"><i className="fas fa-check mr-2"></i> SUBMIT</button>
                  <div class="card-tools">
                    <button type="button" class="btn btn-primary btn-xs" data-card-widget="collapse">
                      <i class="fas fa-minus"></i>
                    </button>
                  </div>
                </div>
                <div className="card-body">
                  <div class="form-group">
                    <label>Category</label>
                    <input type="text" class="form-control form-control-sm" />
                  </div>
                  <div class="form-group">
                    <label>Amount</label>
                    <input type="text" class="form-control form-control-sm" />
                  </div>
                  <div class="form-group">
                    <label>Direction</label>
                    <input type="text" class="form-control form-control-sm" />
                  </div>
                  <div class="form-group">
                    <label>Wallet</label>
                    <input type="text" class="form-control form-control-sm" />
                  </div>
                  <div class="form-group">
                    <label>Name</label>
                    <input type="text" class="form-control form-control-sm" />
                  </div>
                  <div class="form-group">
                    <label>Description</label>
                    <textarea class="form-control" rows="3" ></textarea>
                  </div>
                  <div class="form-group">
                    <label>Notes</label>
                    <textarea class="form-control" rows="2" ></textarea>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-4">

            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default PageTransactionsCreate
