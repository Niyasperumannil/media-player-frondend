import React, { useEffect, useState } from 'react'
import Vediocard from './Vediocard'
import { addVideoToCategoryApi, getvideosApi } from '../services/allAPI'


function Allvideo({addVideoStatus,setVideoStatus}) {


  const [allvideos , setAllvideos] = useState([])
  const [deleteVideoStatus ,setDeleteVideoStatus] = useState({})
  
   /*side effect */
  const getAllvideo = async()=>{
    const result = await getvideosApi()
    /*console.log(result);*/
    setAllvideos(result.data)
    
    
  }
  console.log(allvideos);
  
 /*to handle sideffect */
 const ondrop = (e)=>{
  e.preventDefault()
 }
const videoDrop = async (e)=>{
  const {category ,video} =JSON.parse(e.dataTransfer.getData("datashare"))
  console.log(category ,video);

  const newArray= category.Allvideo.filter(item => item.id != video.id)
  const newCategory ={
    category:category.category,
    Allvideo:newArray,
    id:category.id
  }
  const result=await addVideoToCategoryApi(category.id, newCategory)
    console.log(result);
    if(result.status>=200 && result.status<300){
      alert('success')
    setVideoStatus(result.data)
    
  }

  
}

  useState(()=>{
    getAllvideo()
  },[addVideoStatus ,deleteVideoStatus])/*[] use effect is called when the component render to thr browser */
  return (
    <div droppable onDragOver={(e)=>ondrop(e)} onDrop={(e)=>videoDrop(e)}>
       
      
        <h4 className='px-5'>All Videos</h4>
        {/*added video */}

     { allvideos.length>0?
      <div className="container">
          <div className="row">
              {allvideos.map((item)=>(
                <div className="col-md-3 p-2">
                  <Vediocard video={item} setDeleteVideoStatus={setDeleteVideoStatus}/>
                  </div>
              ))
            }
              
              
          </div>
      </div>
        :
      <div className="container-fluid">
          <div className="row mt-2">
              <div className="col-md-4">
              </div>
              <div className="col-md-4">
                  <img src="https://yt3.googleusercontent.com/ytc/AIdro_nRr4G2hGChYeLGYVoJTAk3hxH8cZK8e9TqKWo2C42a-g=s900-c-k-c0x00ffffff-no-rj" className='rounded-5 w-100' alt="" />
                  <h4 className='text-center text-warning'>No Videos yet</h4>
              </div>
              <div className="col-md-4"></div>
          </div>
      </div>}
      
    
    </div>
  )
}

export default Allvideo
