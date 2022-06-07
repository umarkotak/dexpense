import React from "react"
// import {Link} from "react-router-dom"
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'

function MiniTips(props) {
  var miniTips = [
    {
      id: 1,
      tip_content: `
<small><b>6 Tips Investasi: Mudah Kelola Risiko, Optimalkan Imbal Hasil</b></small><br>
<small>1 Tentukan Dulu Tujuan Investasi</small><br>
<small>2 Cari Tahu Underlying Assets</small><br>
<small>3 Lebih Mengutamakan Cash Flow atau Capital Gain</small><br>
<small>4 Tetap Tenang dan Tidak Panik saat Nilai Investasi Menurun</small><br>
<small>5 Temukan Rumus Ideal Kelola Finansial untuk Investasi</small><br>
<small>6 Mulai dari sekarang</small>
      `,
    },
    {
      id: 2,
      tip_content: `
<small><b>Cara Mengatur Gaji Bulanan Agar Bisa Menabung</b></small><br>
<small>1 Menyusun anggaran bulanan</small><br>
<small>2 Membuat persentase pembagian gaji bulanan</small><br>
<small>3 Mengontrol setiap pengeluaran</small><br>
      `,
    },
    {
      id: 3,
      tip_content: `
<small><b>Rekomendasi akun instagram tentang mengatur keuangan</b></small><br>
<small><a href="https://www.instagram.com/mommenkeu/" target="_blank" >@mommenkeu</a></small><br>
<small><a href="https://www.instagram.com/kelas.financial/" target="_blank" >@kelas.financial</a></small><br>
      `,
    },
    {
      id: 4,
      tip_content: `
<small><b>Rekomendasi platform investasi syariah</b></small><br>
<small><a href="https://alamisharia.co.id/id/" target="_blank" >alamisharia</a></small><br>
<small>Raih Tujuanmu Dengan P2P Lending Syariah Terbaik.</small><br>
<small>Mempertemukan Pendana dengan Penerima Pendanaan dalam proyek pembiayaan syariah yang adil dan transparan.</small><br>
      `,
    },
  ]

  return(
    <>
      <div className="card card-primary card-outline mb-5">
        <div className="card-header pl-2 py-1">
          <h3 className="card-title text-primary"><i className="fa fa-lightbulb"></i> <a href="/?panelbear_enable">Quick</a> <a href="/?panelbear_disable">Tips</a></h3>
          <div className="card-tools">
            <button type="button" className="btn btn-primary btn-xs" data-card-widget="collapse">
              <i className="fas fa-minus"></i>
            </button>
          </div>
        </div>

        <div className="card-body p-2">
          {miniTips.map(miniTip => (
            <div className="post mb-2 pb-1" key={miniTip.id}>
              {/* <div className="user-block">
                <img className="img-circle img-bordered-sm" src="/images/new_logo.png" alt="User Avatar" />
                <span className="username">
                  <a href="/">BukuKas Admin</a>
                  <span className="text-primary">BukuKas Admin</span>
                  <a href="#" className="float-right btn-tool"><i className="fas fa-times"></i></a>
                </span>
                <span className="description">Tips - 2020/01/01 At 17:00</span>
              </div> */}
              <ReactMarkdown rehypePlugins={[rehypeRaw]} children={miniTip.tip_content} />
              {/* <p>
                <span href="/" className="link-black text-sm mr-2"><i className="fas fa-share mr-1"></i> Share</span>
                <span href="/" className="link-black text-sm"><i className="far fa-thumbs-up mr-1"></i> Like</span>
                <span className="float-right">
                  <a href={`/tips/${miniTip.id}`} className="link-black text-sm">⋯ Read More</a>
                </span>
              </p> */}
              {/* <input className="form-control form-control-sm" type="text" placeholder="Type a comment" /> */}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default MiniTips
