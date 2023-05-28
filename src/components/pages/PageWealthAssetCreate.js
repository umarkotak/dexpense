import React, {useState, useEffect} from "react"
import {useHistory, Link} from "react-router-dom"
import {useAlert} from 'react-alert'
import Select from 'react-select'
import NumberFormat from 'react-number-format'

import dexpenseApi from "../apis/DexpenseApi"
import utils from "../helper/Utils"
// import MiniTips from "../components/MiniTips"

function PageWealthAssetCreate() {
  const alert = useAlert()
  const history = useHistory()
  var now = new Date()
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset())

  const [categories, setCategories] = useState([])
  const [subCategories, setSubCategories] = useState([])
  const [assetsCreateParams, setAssetsCreateParams] = useState({
    "group_id": parseInt(localStorage.getItem("DEXPENSE_SESSION_GROUPS_ACTIVE_ID")),
    "name": "",
    "description": "",
    "sub_description": "",
    "amount": 0,
    "amount_unit": "",
    "quantity": 1,
    "price": null,
    "category": "",
    "sub_category": "",
    "transaction_at": "",
    "for_sale": "",
    "sell_price": "",
    "cod_only": "",
    "cod_place": "",
    "cod_place_description": "",
  })
  const [subCategoriesObj, setSubCategoriesObj] = useState(null)
  function handleAssetsParamsChanges(e) {
    try {
      const { name, value } = e.target
      setAssetsCreateParams(assetsCreateParams => ({...assetsCreateParams, [name]: value}))
    } catch (err) {
      setAssetsCreateParams(assetsCreateParams => ({...assetsCreateParams, [e.name]: e.value}))
      if (e.name === "category") {
        setSubCategories(e.sub_categories_map)
        setSubCategoriesObj(null)
        if (e.sub_categories_map.length === 1) {
          setSubCategoriesObj(e.sub_categories_map[0])
        }
        setAssetsCreateParams(assetsCreateParams => ({...assetsCreateParams, "sub_category": e.sub_categories_map[0].value}))
      } else if (e.name === "sub_category") {
        setSubCategoriesObj(e)
      }
    }
  }

  async function handleAssetSubmit() {
    try {
      var tempAssetsCreateParams = assetsCreateParams
      var transactionAtUTC = utils.ConvertLocalTimeToUTC(tempAssetsCreateParams["transaction_at"])
      tempAssetsCreateParams["transaction_at"] = utils.FormatDateInput(transactionAtUTC)

      console.log(tempAssetsCreateParams)

      const response = await dexpenseApi.AssetsCreate(localStorage.getItem("DEXPENSE_SESSION_TOKEN"), tempAssetsCreateParams)
      const status = response.status
      const body = await response.json()

      if (status === 200) {
        alert.info("Add new asset success!")
        history.push("/wealth_assets")
      } else {
        alert.error(`There is some error: ${body.error}`)
      }
    } catch (e) {
      alert.error(`There is some error: ${e.message}`)
    }
  }

  async function fetchCategories() {
    try {
      const response = await dexpenseApi.AssetsCategoryList(
        localStorage.getItem("DEXPENSE_SESSION_TOKEN"), {}
      )
      const status = response.status
      const body = await response.json()

      if (status === 200) {
        setCategories(body.data)
      } else {
        alert.error(`There is some error: ${body.error}`)
      }
    } catch (e) {
      alert.error(`There is some error: ${e.message}`)
    }
  }
  useEffect(() => {
    fetchCategories()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <div className="content-wrapper" style={{
        backgroundColor: "#E3EDF2",
      }}>
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Asset</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item"><Link to="/wealth_assets">Asset</Link></li>
                  <li className="breadcrumb-item active"><Link to="/wealth_assets/create">New</Link></li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        <section className="content">
          <div className="row">
            <div className="col-12 col-lg-6 col-xl-9 mb-4">
              <div className="card card-primary card-outline">
                <div className="card-header">
                  <div className="card-tools">
                    <button type="button" className="btn btn-primary btn-sm" data-card-widget="collapse">
                      <i className="fas fa-minus"></i>
                    </button>
                  </div>
                </div>

                <div className="card-body">
                  <div className="form-group">
                    <label>Nama</label> <small className="text-danger"><b>*</b></small>
                    <input type="text" className="form-control form-control-sm" name="name"
                      onChange={(e) => handleAssetsParamsChanges(e)} value={assetsCreateParams["name"]}/>
                  </div>
                  <div className="form-group">
                    <label>Deskripsi</label>
                    <input type="text" className="form-control form-control-sm" name="description"
                      onChange={(e) => handleAssetsParamsChanges(e)} value={assetsCreateParams["description"]}/>
                  </div>
                  <div className="form-group" data-select2-id="29">
                    <label>Kategori</label> <small className="text-danger"><b>*</b></small>
                    <Select
                      name="category"
                      options={categories}
                      onChange={(e) => handleAssetsParamsChanges(e)}
                      formatOptionLabel={oneCategory => (
                        <div className="">
                          <img src={oneCategory.icon_url} height="30px" width="30px" alt="category-icon" />
                          <span className="ml-2">{oneCategory.label}</span>
                        </div>
                      )}
                    />
                  </div>
                  <div className="form-group" data-select2-id="29">
                    <label>Sub Kategori</label> <small className="text-danger"><b>*</b></small>
                    <Select
                      name="category"
                      options={subCategories}
                      onChange={(e) => handleAssetsParamsChanges(e)}
                      value={subCategoriesObj}
                    />
                  </div>
                  <div className="form-group">
                    <label>Harga</label> <small className="text-danger"><b>*</b></small>
                    <NumberFormat
                      name="price"
                      className="form-control form-control-sm"
                      value={assetsCreateParams["price"]}
                      thousandSeparator={true}
                      prefix={'Rp.'}
                      onValueChange={(values) => setAssetsCreateParams({...assetsCreateParams,"price": values.value})}
                    />
                  </div>
                  <div className="form-group">
                    <label>Jumlah</label> <small className="text-danger"><b>*</b></small>
                    <input type="number" className="form-control form-control-sm" name="quantity"
                      onChange={(e) => handleAssetsParamsChanges(e)} value={assetsCreateParams["quantity"]}
                    />
                  </div>
                  <div className="form-group">
                    <label>Catatan</label>
                    <textarea className="form-control" rows="2" name="sub_description" onChange={(e) => handleAssetsParamsChanges(e)}></textarea>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 col-lg-3 col-xl-3">
              {/* <MiniTips /> */}
            </div>
          </div>
        </section>
      </div>

      <Link
        to="/wealth_assets/create"
        className="bg-primary"
        onClick={() => handleAssetSubmit()}
        style={{
          position:"fixed",
          width:"50px",
          height:"50px",
          bottom:"70px",
          right:"30px",
          color:"#FFF",
          borderRadius:"50px",
          textAlign:"center",
          boxShadow:" 2px 2px 2px #999"
        }}
      >
        <i className="fa fa-save my-float" style={{marginTop:"17px"}}></i>
      </Link>
    </div>
  )
}

export default PageWealthAssetCreate
