import React from "react"

import MiniTips from "../components/MiniTips"
import BlogPost from "../components/BlogPost"

function PageHome() {
  return (
    <div>
      <div className="content-wrapper mt-2">
        <section className="content">
          <div className="row">
            <div className="col-12 col-xl-9 mb-4">
              <HomeContent />
            </div>
            <div className="col-12 col-xl-3">
              <MiniTips />
            </div>
          </div>
        </section>
      </div>
    </div>
  )

  function HomeContent() {
    return(
      <>
        <BlogPost />
      </>
    )
  }
}

export default PageHome