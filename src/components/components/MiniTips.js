import React from "react"
// import {Link} from "react-router-dom"

function MiniTips(props) {
  var miniTips = [
    {
      id: 1,
      tip_content: `Lorem ipsum represents a long-held tradition for designers, typographers and the like. Some people hate it and argue for its demise, but others ignore the hate as they create awesome tools to help create filler text for everyone from bacon lovers to Charlie Sheen fans.`,
    },
    {
      id: 2,
      tip_content: `Lorem ipsum represents a long-held tradition for designers, typographers and the like. Some people hate it and argue for its demise, but others ignore the hate as they create awesome tools to help create filler text for everyone from bacon lovers to Charlie Sheen fans.`,
    },
    {
      id: 3,
      tip_content: `Lorem ipsum represents a long-held tradition for designers, typographers and the like. Some people hate it and argue for its demise, but others ignore the hate as they create awesome tools to help create filler text for everyone from bacon lovers to Charlie Sheen fans.`,
    },
  ]

  return(
    <>
      <div className="card card-primary card-outline mb-5">
        <div className="card-header pl-2 py-1">
          <h3 className="card-title"><i className="fa fa-lightbulb"></i> Tips</h3>
          <div className="card-tools">
            <button type="button" className="btn btn-primary btn-xs" data-card-widget="collapse">
              <i className="fas fa-minus"></i>
            </button>
          </div>
        </div>

        <div className="card-body">
          {miniTips.map(miniTip => (
            <div class="post" key={miniTip.id}>
              <div class="user-block">
                <img class="img-circle img-bordered-sm" src="/images/new_logo.png" alt="User Avatar" />
                <span class="username">
                  {/* <a href="/">BukuKas Admin</a> */}
                  <span className="text-primary">BukuKas Admin</span>
                  {/* <a href="#" class="float-right btn-tool"><i class="fas fa-times"></i></a> */}
                </span>
                <span class="description">Tips - 2020/01/01 At 17:00</span>
              </div>
              <p>{miniTip.tip_content}</p>
              <p>
                <span href="/" class="link-black text-sm mr-2"><i class="fas fa-share mr-1"></i> Share</span>
                <span href="/" class="link-black text-sm"><i class="far fa-thumbs-up mr-1"></i> Like</span>
                <span class="float-right">
                  <a href={`/tips/${miniTip.id}`} class="link-black text-sm">⋯ Read More</a>
                </span>
              </p>
              {/* <input class="form-control form-control-sm" type="text" placeholder="Type a comment" /> */}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default MiniTips
