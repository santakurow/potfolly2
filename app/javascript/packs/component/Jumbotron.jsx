import React from "react"

const Jumbotron = () => {
  return (
      <div className="jumbotron jumbotron-fluid img-fluid bg-img">
        <div className="overlay">
          <div className="container text-center jumbo-title">
            <div className="row">
              <h1 className="display-4 font-weight-bold text-white col-lg-12">Potfolly</h1>
              <p className="text-white col-lg-12" style={{ fontSize: "1.5rem" }}>すべてのクリエイターたちのためのポートフォリオサイト</p>
              <p className="lead text-white mt-4 col-lg-12">PotfollyはWebアプリ、モバイルアプリ、データサイエンス、ゲーム開発、デザイン、グラフィックなど</p>
              <p className="lead text-white mt-4 col-lg-12">様々なジャンルの作品を閲覧、公開できるポートフォリオ共有サイトです。</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Jumbotron;