import React, {useState,useEffect} from "react"
import utils from "../helper/Utils"
// import {Link} from "react-router-dom"
import dexpenseApi from "../apis/DexpenseApi"
import ReactHtmlParser from 'react-html-parser'
import HomeTransactionBar from "./HomeTransactionBar"

var timeNow = new Date()
var beginOfMonth, endOfMonth
function RecalculateBeginAndEndOfMonth(timeObj) {
  beginOfMonth = new Date(timeObj.getFullYear(), timeObj.getMonth(), 1)
  endOfMonth = new Date(timeObj.getFullYear(), timeObj.getMonth() + 1, 1)
  beginOfMonth.setHours(beginOfMonth.getHours() - (-new Date().getTimezoneOffset()/60))
  endOfMonth.setHours(endOfMonth.getHours() - (-new Date().getTimezoneOffset()/60))
}
RecalculateBeginAndEndOfMonth(timeNow)

function BlogPost(props) {
  var welcomePosts = [
    {
      id: -1,
      username: "Admin",
      post_sub_title: `Selamat datang!`,
      post_content: `
<h1><b className="bg-white rounded"><span className="text-teal">BUKUKAS</span></b> KITA</h1>
<h5>Group and Familly budgetting anywhere</h5>
<a href="/sign_up" className="">Sign Up Now!</a> It's Free!
      `,
    },
    {
      id: -2,
      username: "Admin",
      post_sub_title: `Fitur nya bukukas kita`,
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
      id: -3,
      username: "Admin",
      post_sub_title: `Kenapa bukukaskita dibuat?`,
      post_content: `
<span style="font-size:14px;">
Pernah ga sih, untuk temen - temen yang baru kerja dan sudah ngerasain gaji pertamanya.

kemudian ngerasain gaji kedua, ketida, dan seterusnya. kemudian kalian mulai membeli barang ini dan itu


</span>
      `,
    },
  ]


  var blogPosts = [
    {
      id: -1,
      username: "Admin",
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

  // var storyPosts = []

  const[activePosts, setActivePost] = useState([])

  useEffect(() => {
    setActivePost([])
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  var queryParams = {
    limit: 1000,
    offset: 0,
    min_date: utils.FormatDateInput(beginOfMonth),
    max_date: utils.FormatDateInput(endOfMonth),
    group_id: parseInt(localStorage.getItem("DEXPENSE_SESSION_GROUPS_ACTIVE_ID")),
    "category": "all",
    "group_wallet_id": 0,
    "direction_type": "all"
  }
  const[grouppedTransactions, setGroupedTransactions] = useState({groupped_transactions: [{transactions: []}]})
  async function fetchTransactionsDaily() {
    try {
      const response = await dexpenseApi.TransactionsListDaily(localStorage.getItem("DEXPENSE_SESSION_TOKEN"), queryParams)
      const status = response.status
      const body = await response.json()
      // console.log(body)

      if (status === 200) {
        setGroupedTransactions(body.data)
      }
    } catch (e) {}
  }
  useEffect(() => {
    fetchTransactionsDaily()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return(
    <>
      <ul className="nav nav-pills">
        <li className="nav-item">
          <a className="nav-link p-2 mr-1 active text-xs" href="#change" data-toggle="tab" onClick={() => setActivePost([])}>Transaksi</a>
        </li>
        <li className="nav-item">
          <a className="nav-link p-2 mr-1 text-xs" href="#change" data-toggle="tab" onClick={() => setActivePost(welcomePosts)}>Welcome</a>
        </li>
        <li className="nav-item">
          <a className="nav-link p-2 mr-1 text-xs" href="#change" data-toggle="tab" onClick={() => setActivePost(blogPosts)}>Latest News!</a>
        </li>
        {/* <li className="nav-item">
          <a className="nav-link p-2" href="#change" data-toggle="tab" onClick={() => setActivePost(storyPosts)}>Story</a>
        </li> */}
      </ul>

      <div className="">
        <div className="card-body px-1 pt-1 pb-1">
          {activePosts.map(activePost => (
            <div className="post bg-white px-2 pt-2 pb-2" key={activePost.id}>
              <div className="user-block bg-white mb-1">
                <img className="img-circle img-bordered-sm" src="/images/new_logo.png" alt="User Avatar" />
                <span className="username">
                  {/* <a href="/">Admin</a> */}
                  <span className="text-info">{activePost.post_sub_title}</span>
                </span>
                <span className="description">By {activePost.username}</span>
              </div>
              {ReactHtmlParser(activePost.post_content)}
              <p className="mb-1 mt-2">
                <span href="/" className="link-black text-sm mr-2"><i className="fas fa-share mr-1"></i> Share</span>
                <span className="float-right">
                  <a href={`/tips/${activePost.id}`} className="link-black text-sm">⋯ Read More</a>
                </span>
              </p>
            </div>
          ))}

          <MiniTransactionsDaily />
        </div>
      </div>
    </>
  )

  function MiniTransactionsDaily() {
    if (activePosts.length !== 0) { return(<div></div>) }

    return(
      <div className="">
        <div className="ml-2 text-bold">{`${utils.months[timeNow.getMonth()]} ${timeNow.getFullYear()}`}</div>
        {grouppedTransactions.groupped_transactions.map((val, k) => (
          <div className="mt-2" key={`1-${k}`}>
            <HomeTransactionBar grouppedTransaction={val} />
          </div>
        ))}
      </div>
    )
  }
}

export default BlogPost
