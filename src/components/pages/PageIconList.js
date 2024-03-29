import React from "react"
import {Link} from "react-router-dom"

function PageDummy() {
  var imageUrls = [
    "https://static.moneylover.me/img/icon/icon.png",
    "https://static.moneylover.me/img/icon/icon_1.png",
    "https://static.moneylover.me/img/icon/icon_2.png",
    "https://static.moneylover.me/img/icon/icon_3.png",
    "https://static.moneylover.me/img/icon/icon_4.png",
    "https://static.moneylover.me/img/icon/icon_5.png",
    "https://static.moneylover.me/img/icon/icon_6.png",
    "https://static.moneylover.me/img/icon/icon_7.png",
    "https://static.moneylover.me/img/icon/icon_8.png",
    "https://static.moneylover.me/img/icon/icon_9.png",
    "https://static.moneylover.me/img/icon/icon_10.png",
    "https://static.moneylover.me/img/icon/icon_11.png",
    "https://static.moneylover.me/img/icon/icon_12.png",
    "https://static.moneylover.me/img/icon/icon_13.png",
    "https://static.moneylover.me/img/icon/icon_14.png",
    "https://static.moneylover.me/img/icon/icon_15.png",
    "https://static.moneylover.me/img/icon/icon_16.png",
    "https://static.moneylover.me/img/icon/icon_17.png",
    "https://static.moneylover.me/img/icon/icon_18.png",
    "https://static.moneylover.me/img/icon/icon_19.png",
    "https://static.moneylover.me/img/icon/icon_20.png",
    "https://static.moneylover.me/img/icon/icon_21.png",
    "https://static.moneylover.me/img/icon/icon_22.png",
    "https://static.moneylover.me/img/icon/icon_23.png",
    "https://static.moneylover.me/img/icon/icon_24.png",
    "https://static.moneylover.me/img/icon/icon_25.png",
    "https://static.moneylover.me/img/icon/icon_26.png",
    "https://static.moneylover.me/img/icon/icon_27.png",
    "https://static.moneylover.me/img/icon/icon_28.png",
    "https://static.moneylover.me/img/icon/icon_29.png",
    "https://static.moneylover.me/img/icon/icon_30.png",
    "https://static.moneylover.me/img/icon/icon_31.png",
    "https://static.moneylover.me/img/icon/icon_32.png",
    "https://static.moneylover.me/img/icon/icon_33.png",
    "https://static.moneylover.me/img/icon/icon_34.png",
    "https://static.moneylover.me/img/icon/icon_35.png",
    "https://static.moneylover.me/img/icon/icon_36.png",
    "https://static.moneylover.me/img/icon/icon_37.png",
    "https://static.moneylover.me/img/icon/icon_38.png",
    "https://static.moneylover.me/img/icon/icon_39.png",
    "https://static.moneylover.me/img/icon/icon_40.png",
    "https://static.moneylover.me/img/icon/icon_41.png",
    "https://static.moneylover.me/img/icon/icon_42.png",
    "https://static.moneylover.me/img/icon/icon_43.png",
    "https://static.moneylover.me/img/icon/icon_44.png",
    "https://static.moneylover.me/img/icon/icon_45.png",
    "https://static.moneylover.me/img/icon/icon_46.png",
    "https://static.moneylover.me/img/icon/icon_47.png",
    "https://static.moneylover.me/img/icon/icon_48.png",
    "https://static.moneylover.me/img/icon/icon_49.png",
    "https://static.moneylover.me/img/icon/icon_50.png",
    "https://static.moneylover.me/img/icon/icon_51.png",
    "https://static.moneylover.me/img/icon/icon_52.png",
    "https://static.moneylover.me/img/icon/icon_53.png",
    "https://static.moneylover.me/img/icon/icon_54.png",
    "https://static.moneylover.me/img/icon/icon_55.png",
    "https://static.moneylover.me/img/icon/icon_56.png",
    "https://static.moneylover.me/img/icon/icon_57.png",
    "https://static.moneylover.me/img/icon/icon_58.png",
    "https://static.moneylover.me/img/icon/icon_59.png",
    "https://static.moneylover.me/img/icon/icon_60.png",
    "https://static.moneylover.me/img/icon/icon_61.png",
    "https://static.moneylover.me/img/icon/icon_62.png",
    "https://static.moneylover.me/img/icon/icon_63.png",
    "https://static.moneylover.me/img/icon/icon_64.png",
    "https://static.moneylover.me/img/icon/icon_65.png",
    "https://static.moneylover.me/img/icon/icon_66.png",
    "https://static.moneylover.me/img/icon/icon_67.png",
    "https://static.moneylover.me/img/icon/icon_68.png",
    "https://static.moneylover.me/img/icon/icon_69.png",
    "https://static.moneylover.me/img/icon/icon_70.png",
    "https://static.moneylover.me/img/icon/icon_71.png",
    "https://static.moneylover.me/img/icon/icon_72.png",
    "https://static.moneylover.me/img/icon/icon_73.png",
    "https://static.moneylover.me/img/icon/icon_74.png",
    "https://static.moneylover.me/img/icon/icon_75.png",
    "https://static.moneylover.me/img/icon/icon_76.png",
    "https://static.moneylover.me/img/icon/icon_77.png",
    "https://static.moneylover.me/img/icon/icon_78.png",
    "https://static.moneylover.me/img/icon/icon_79.png",
    "https://static.moneylover.me/img/icon/icon_80.png",
    "https://static.moneylover.me/img/icon/icon_81.png",
    "https://static.moneylover.me/img/icon/icon_82.png",
    "https://static.moneylover.me/img/icon/icon_83.png",
    "https://static.moneylover.me/img/icon/icon_84.png",
    "https://static.moneylover.me/img/icon/icon_85.png",
    "https://static.moneylover.me/img/icon/icon_86.png",
    "https://static.moneylover.me/img/icon/icon_87.png",
    "https://static.moneylover.me/img/icon/icon_88.png",
    "https://static.moneylover.me/img/icon/icon_89.png",
    "https://static.moneylover.me/img/icon/icon_90.png",
    "https://static.moneylover.me/img/icon/icon_91.png",
    "https://static.moneylover.me/img/icon/icon_92.png",
    "https://static.moneylover.me/img/icon/icon_93.png",
    "https://static.moneylover.me/img/icon/icon_94.png",
    "https://static.moneylover.me/img/icon/icon_95.png",
    "https://static.moneylover.me/img/icon/icon_96.png",
    "https://static.moneylover.me/img/icon/icon_97.png",
    "https://static.moneylover.me/img/icon/icon_98.png",
    "https://static.moneylover.me/img/icon/icon_99.png",
    "https://static.moneylover.me/img/icon/icon_100.png",
    "https://static.moneylover.me/img/icon/icon_101.png",
    "https://static.moneylover.me/img/icon/icon_102.png",
    "https://static.moneylover.me/img/icon/icon_103.png",
    "https://static.moneylover.me/img/icon/icon_104.png",
    "https://static.moneylover.me/img/icon/icon_105.png",
    "https://static.moneylover.me/img/icon/icon_106.png",
    "https://static.moneylover.me/img/icon/icon_107.png",
    "https://static.moneylover.me/img/icon/icon_108.png",
    "https://static.moneylover.me/img/icon/icon_109.png",
    "https://static.moneylover.me/img/icon/icon_110.png",
    "https://static.moneylover.me/img/icon/icon_111.png",
    "https://static.moneylover.me/img/icon/icon_112.png",
    "https://static.moneylover.me/img/icon/icon_113.png",
    "https://static.moneylover.me/img/icon/icon_114.png",
    "https://static.moneylover.me/img/icon/icon_115.png",
    "https://static.moneylover.me/img/icon/icon_116.png",
    "https://static.moneylover.me/img/icon/icon_117.png",
    "https://static.moneylover.me/img/icon/icon_118.png",
    "https://static.moneylover.me/img/icon/icon_119.png",
    "https://static.moneylover.me/img/icon/icon_120.png",
    "https://static.moneylover.me/img/icon/icon_121.png",
    "https://static.moneylover.me/img/icon/icon_122.png",
    "https://static.moneylover.me/img/icon/icon_123.png",
    "https://static.moneylover.me/img/icon/icon_124.png",
    "https://static.moneylover.me/img/icon/icon_125.png",
    "https://static.moneylover.me/img/icon/icon_126.png",
    "https://static.moneylover.me/img/icon/icon_127.png",
    "https://static.moneylover.me/img/icon/icon_128.png",
    "https://static.moneylover.me/img/icon/icon_129.png",
    "https://static.moneylover.me/img/icon/icon_130.png",
    "https://static.moneylover.me/img/icon/icon_131.png",
    "https://static.moneylover.me/img/icon/icon_132.png",
    "https://static.moneylover.me/img/icon/icon_133.png",
    "https://static.moneylover.me/img/icon/icon_134.png",
    "https://static.moneylover.me/img/icon/icon_135.png",
    "https://static.moneylover.me/img/icon/icon_136.png",
    "https://static.moneylover.me/img/icon/icon_137.png",
    "https://static.moneylover.me/img/icon/icon_138.png",
    "https://static.moneylover.me/img/icon/icon_139.png",
    "https://static.moneylover.me/img/icon/icon_142.png",
    "https://static.moneylover.me/img/icon/icon_143.png",
  ]

  return (
    <div>
      <div className="content-wrapper" style={{
        backgroundColor: "#E3EDF2",
      }}>
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Dummy</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item active"><Link to="/dummy">Dummy</Link></li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        <section className="content">
          <div className="row">
            <div className="col-12 mb-4">
              <div className="row mt-2">
                {imageUrls.map((v,idx)=>(
                  <div className="col-2" key={idx}>
                    <img src={v} alt="icon-img"></img>
                    <code>{v}</code>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default PageDummy
