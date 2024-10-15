import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHouse } from "@fortawesome/free-solid-svg-icons/faHouse"
import { faTrashCan } from "@fortawesome/free-solid-svg-icons"
import Button from "react-bootstrap/Button"
import { deleteHistoryVideoApi, getAllvideohistoryApi } from "../services/allAPI"




function Watchhistory() {
  const [allHisVideos, setallHisVideos] = useState([])
  const [deleteStatus, setDeleteStatus] = useState(false)
  const getAllHistoryVideos = async()=>{
    const result = await getAllvideohistoryApi()
    setallHisVideos(result.data);
    
  }
  console.log(allHisVideos);

  const handleDelete = async(id)=>{
    const result = await deleteHistoryVideoApi(id)
    console.log(result);
    if(result.status>=200 && result.status<300){
      setDeleteStatus(true)
    }
    
  }
  
  useEffect(()=>{
    getAllHistoryVideos()
    setDeleteStatus(false)
  },[deleteStatus])
  return (
    <>
       <div className='p-4'>
        <div className='d-flex mt-5 '>
          <h4>Watch History</h4>
          <Link to={'/home'} style={{ textDecoration: 'none' }} className='ms-auto'> <h5> <FontAwesomeIcon icon={faHouse} className='me-2' />Back Home</h5></Link>
        </div>
      </div>
      <div className='container '>
        <div className="row">
          <div className="col-md-1"></div>
          <div className="col-md-10 table-responsive">
           {allHisVideos?.length>0? <table className='table mt-5' >
              <thead>
                <tr>
                  <th>Si.no</th>
                  <th>Caption</th>
                  <th>Url</th>
                  <th>Timestamp</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
             {allHisVideos?.map((item,index)=>(
              
              <tr>
                <td>{index+1}</td>
                <td>{item?.Caption}</td>
                <td>{item?.url}</td>
                <td>{item?.time}</td>
                <td className='text-center'> <Button onClick={()=>handleDelete(item?.id)} variant="danger"><FontAwesomeIcon icon={faTrashCan} /></Button></td>

              </tr>

            
             )) }
             </tbody>
            </table>
            :
            <h3 className='text-warning text-center'>NO watch history</h3>
            }
          </div>
          <div className="col-md-1"></div>
        </div>
      </div>
    </>
  )
}

export default Watchhistory
