import React, {useState,useEffect} from "react"
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'

function BlogPost(props) {
  var welcomePosts = [
    {
      id: -1,
      post_sub_title: `Welcome`,
      post_content: `
<h1><b className="bg-white rounded"><span className="text-teal">BUKUKAS</span></b> KITA</h1>
<h5>Group and Familly budgetting anywhere</h5>
<a href="/sign_up" className="">Sign Up Now!</a> It's Free!
      `,
    },
    {
      id: -1,
      post_sub_title: `Features`,
      post_content: `
<h4>Fitur:</h4>
<pre >
<b>Pencatatan transaksi harian,</b>
  <small>catat dan lihat laporan transaksi dalam bentuk yang mudah</small>
  <small>saldo pada dompet akan terupdate secara otomatis</small>
  <small>download laporan keuangan dalam bentuk excel</small>
<b>Atur anggota grup dan keluarga anda,</b>
  <small>setiap grup akan memiliki dompet masing - masing. pencatatan menjadi lebih sederhana</small>
<b>Statistik pertumbuhan harta,</b>
  <small>lihat secara detail pengeluaran dan rencanakan dengan lebih baik</small>
<b>Budgeting bulanan,</b>
  <small>menghitung budget saving, investing, pengeluaran lainnya lebih mudah dan cepat</small>
<b>Tabungan dan investasi,</b>
  <small>simulasi penghitungan investasi dengan grafik yang mudah dimengerti</small>
  <small>harga emas realtime dan perkiraan akumulasi nilai emas</small>
<b>[WIP] Pencatatan asset,</b>
  <small>catat asset mu untuk mempermudah perencanaan kedepan</small>
</pre>
      `,
    },
    {
      id: -1,
      post_sub_title: `Good Reading About Investing`,
      post_content: `

      `,
    },
  ]


  var blogPosts = [
    {
      id: -1,
      post_sub_title: `Cerita tentang 5 sahabat`,
      post_content: `
<span style="font-size:14px;">
Why most of us won't achieve early financial independence (F.I).

A story of five friends (Adeline, Adam, Natasha, Curtis and Wei Foo) and how they failed at achieving financial independence early.

When they graduated, everyone had a dream and career to pursue as they were obsessed for early financial independence. They made a pact to meet back after 10 years. And they would all have retired early; attained financial independence and retire early (F.I.R.E).

10 years later, they all failed. Now, let me address how each of them failed.

continue: <a href="https://www.linkedin.com/feed/update/urn:li:activity:6937784089110274048/" target=_blank >source</a>
</span>
      `,
    },
  ]

  var storyPosts = []

  const[activePosts, setActivePost] = useState([])

  useEffect(() => {
    setActivePost(welcomePosts)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return(
    <>
      <ul class="nav nav-pills">
        <li class="nav-item">
          <a class="nav-link p-2 mr-1 active" href="#change" data-toggle="tab" onClick={() => setActivePost(welcomePosts)}>Welcome</a>
        </li>
        <li class="nav-item">
          <a class="nav-link p-2 mr-1" href="#change" data-toggle="tab" onClick={() => setActivePost(blogPosts)}>Blog</a>
        </li>
        <li class="nav-item">
          <a class="nav-link p-2" href="#change" data-toggle="tab" onClick={() => setActivePost(storyPosts)}>Story</a>
          </li>
      </ul>

      <div className="card card-primary shadow mb-5">
        <div className="card-body bg-white px-1 pt-1 pb-1">
          {activePosts.map(activePost => (
            <div className="post bg-white px-2 pt-2 pb-2" key={activePost.id}>
              <div className="user-block bg-white mb-1">
                <img className="img-circle img-bordered-sm" src="/images/new_logo.png" alt="User Avatar" />
                <span className="username">
                  {/* <a href="/">Admin</a> */}
                  <span className="text-info">Admin</span>
                </span>
                <span className="description">{activePost.post_sub_title}</span>
              </div>
              <ReactMarkdown rehypePlugins={[rehypeRaw]} children={activePost.post_content} />
              <p className="mb-1 mt-2">
                <span href="/" className="link-black text-sm mr-2"><i className="fas fa-share mr-1"></i> Share</span>
                <span className="float-right">
                  <a href={`/tips/${activePost.id}`} className="link-black text-sm">⋯ Read More</a>
                </span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default BlogPost
