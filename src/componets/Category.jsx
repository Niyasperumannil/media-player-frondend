import React, { useEffect } from "react";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Modal } from "react-bootstrap";
import { useState } from "react";
import Vediocard from "./Vediocard";
import Allvideo from "./Allvideo";
import { addCategoryApi, addVideoToCategoryApi, deleteCategoryApi, getAllCategoryApi } from "../services/allAPI";
import { toast } from "react-toastify";



function category({VideoStatus}) {
  const [show, setShow] = useState(false);
  const [category ,setCategory] = useState("")
  const [allCategory, setAllCategory] = useState([])
  const [AddCategoryStatus ,setAddCategoryStatus] = useState({})
  const [deleteStatus, setDeleteStatus] = useState([])
  const [videoCategoryStatus, setvideoCategoryStatus] = useState({})
  console.log(category);
  
  const handleCancel = ()=>{
    setCategory("")
  }

    const handleClose = () =>{ setShow(false);
        handleCancel()
    }
    const handleShow = () => setShow(true);

    const handleAdd = async()=>{
        if(category){
            const reqBody = {
                category: category,
                Allvideo:[]
            }
            const result = await addCategoryApi(reqBody)
            console.log(result);
            if(result.status>=200 && result.status<300){
                toast.success('category added successfuly')
                handleClose()
                setAddCategoryStatus(result.data)
            }
            else{
                toast.error('something went wrong')
                handleClose()
            }
            
        }
        else{
            toast.info('please add a category name')
        }
    }
    const getcategory = async()=>{
        const result = await getAllCategoryApi()
        setAllCategory(result.data);
        
    } 
    console.log(allCategory);
     
    const handledelete = async(id)=>{
        const result = await deleteCategoryApi(id)
        if(result.status>=200 && result.status<300){
         setDeleteStatus(result.data)   
        }
        
    }
    const ondrag = (e)=>{
        e.preventDefault() //prevents the data lose
    }
    const VideoDrop =async (e, categoryDetails)=>{
        console.log(categoryDetails);

        const videoDetails =JSON.parse(e.dataTransfer.getData("videoDetails"))
        console.log(videoDetails);

        if(categoryDetails.Allvideo.find((item)=>item.id==videoDetails.id)){
            toast.error('video already present in the Category')
        }
        else{
            categoryDetails.Allvideo.push(videoDetails)
            console.log(categoryDetails);
        
            const result = await addVideoToCategoryApi(categoryDetails.id, categoryDetails)
    
            if(result.status>=200 && result.status<300){
                toast.success('video added succesfuly')
                setvideoCategoryStatus(result.data)
            }else{
                toast.error('something went wrong')
            }
        }    
        
    }
    const videoDrag =(e, video ,category)=>{
        console.log(video);
        console.log(category);
        
     const dataShare = {
        category,
        video
     }
     e.dataTransfer.setData("datashare",JSON.stringify(dataShare))
        
    }
    
    useEffect((vid) =>{
        getcategory()
    },[AddCategoryStatus,deleteStatus,videoCategoryStatus ,VideoStatus])
  return (
    <>
      <div className='p-2'>
                <h5>Category</h5>
                <button className='btn btn-warning w-100 mt-3' onClick={handleShow}>Add Category</button>
               
               
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='border border-dark p-2 rounded-3'>
                        <form action="">
                            <input type="text" className='form-control' placeholder='Add category'value={category} onChange={(e)=>setCategory(e.target.value)} />
                        </form>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                     Cancel
                    </Button>
                    <Button variant="warning" onClick={handleAdd}>
                        ADD
                    </Button>
                </Modal.Footer>
            </Modal>
            { allCategory?.length>0 &&

                allCategory.map((item)=>(
                    <div className='border border-dark  p-2 mt-2 rounded-3' droppable onDragOver={(e)=>ondrag(e)} onDrop={(e)=>VideoDrop(e ,item)} >
                    <div className='d-flex justify-content-between'>
                        <p>{item?.category}</p>
                        <Button variant="danger" onClick={()=>handledelete(item?.id)}><FontAwesomeIcon icon={faTrashCan} /></Button>
                        
                    </div>
                    <div>
                        {item?.Allvideo?.length>0  && 
                        item?.Allvideo?.map((video)=>(

                            <div draggable onDragStart={(e)=>videoDrag(e,video ,item)}><Vediocard video={video} ispresent={true}/></div> 
                        ))}
                       
                        
                    </div>
                    <form action="">
                        <input type="text" className='form-control w-100 bg-secondary mt-4' />
                    </form>
                </div>

                ))
                
      }
    </>
  )
}

export default category
