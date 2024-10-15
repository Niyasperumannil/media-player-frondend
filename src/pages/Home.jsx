import React, { useState } from "react"
import Add from "../componets/add"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClockRotateLeft } from "@fortawesome/free-solid-svg-icons"
import Allvideo from "../componets/Allvideo"
import Category from "../componets/Category"


function Home() {
  const [addVideoStatus, setAddVideoStatus] = useState({})
  const [VideoStatus, setVideoStatus] =useState({})
  return (
    <>
      <div className='d-flex p-md-5 p-3 align-items-center'>
        <Add setAddVideoStatus={setAddVideoStatus} />
        <Link to={'/watchhistory'} className='ms-auto ' style={{ textDecoration: 'none' }}> <h5><span className='d-none d-md-inline'>Watch History</span> <FontAwesomeIcon icon={faClockRotateLeft} className='ms-2' /></h5></Link>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-9">
            <Allvideo addVideoStatus={addVideoStatus} setVideoStatus={setVideoStatus}/>
          </div>
          <div className="col-md-3">
            <Category videoStatus = {VideoStatus} VideoStatus={VideoStatus} />
          </div>
        </div>
      </div>
    </>

  )
}

export default Home