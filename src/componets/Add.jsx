import { faCloudArrowUp, faFilm } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { AddVideoApi } from "../services/allAPI";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


faCloudArrowUp


function add({setAddVideoStatus}) {        /*useing procs */
    const [VideoDetails, setvideoDetails] = useState({
        caption: "",
        imageUrl: "",
        emdedLink: ""
    }


    )

    const [show, setShow] = useState(false);
    console.log(VideoDetails);

    const handleClose = () => {
        setShow(false);
        handleCancel()
    }
    const handleShow = () => setShow(true);
    const handleCancel = () => {
        setvideoDetails({
            caption: "",
            imageUrl: "",
            emdedLink: ""
        })
    }


    const handleAdd = async () => {
        const { caption, imageUrl, emdedLink } = VideoDetails
        if (!caption || !imageUrl || !emdedLink) {
            toast.info('please fill the form completly')
        }
        else {

            if (VideoDetails.emdedLink.startsWith('https://youtu.be/')) {
                const embedL = `https://www.youtube.com/embed/${VideoDetails.emdedLink.slice(17, 28)}`
                /* setvideoDetails({ ...VideoDetails, emdedLink: embedL }) */
                const result = await AddVideoApi({ ...VideoDetails, emdedLink: embedL })
                console.log(result);
                if (result.status >= 200 && result.status < 300) {
                    toast.success('Video Uploaded Succesfully')
                    handleClose()
                    setAddVideoStatus(result.data)
                    
                } else {
                    toast.error('Something Went Wrong')
                    handleClose()
                }
            } else {
                const embedL = `https://www.youtube.com/embed/${VideoDetails.emdedLink.slice(-11)}`
              /*   setvideoDetails({ ...VideoDetails, emdedLink: embedL }) */
                const result = await AddVideoApi({ ...VideoDetails, emdedLink: embedL })
                console.log(result);
                if (result.status >= 200 && result.status < 300) {
                    toast.success('Video Uploaded Succesfully')
                    handleClose()
                    setAddVideoStatus(result.data)
                } else {
                    toast.error('Something Went Wrong')
                    handleClose()
                }
            }
        }
    }
    /*https://youtu.be/6G75yTBzBUA?si=fm1ZFQ8C9BSBySPs */
    /*https://www.youtube.com/watch?v=6G75yTBzBUA */
    /*https://www.youtube.com/embed/6G75yTBzBUA */

    /*<iframe width="914" height="514" src="https://www.youtube.com/embed/6G75yTBzBUA" title="Mini Maharani Video Song  | Premalu | Naslen | Mamitha | Girish AD | Vishnu Vijay | Suhail Koya" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe> */


    return (
        <>
            <div className='d-flex align-items-center'>
                <h5 className=' d-none d-md-inline'>Upload New Video</h5>
                <button className='btn' onClick={handleShow}><FontAwesomeIcon icon={faCloudArrowUp} className='fs-5' /></button>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title className='text-warning'> <FontAwesomeIcon icon={faFilm} /> Upload Videos</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Please fill the following details</p>
                    <div className='border border-dark p-3 mt-3 rounded-3'>
                        <form action="" className='p-1'>
                            <div className="mb-3"><input type="text" value={VideoDetails.caption} className='form-control ' placeholder='Video caption' onChange={(e) => setvideoDetails({ ...VideoDetails, caption: e.target.value })} /></div>
                            <div className="mb-3"><input type="text" value={VideoDetails.imageUrl} className='form-control mt-3' placeholder='Video Image' onChange={(e) => setvideoDetails({ ...VideoDetails, imageUrl: e.target.value })} /></div>
                            <div className="mb-3"> <input type="text" value={VideoDetails.emdedLink} className='form-control mt-3' placeholder='Video Url' onChange={(e) => setvideoDetails({ ...VideoDetails, emdedLink: e.target.value })} /></div>
                        </form>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCancel}>
                        Cancel
                    </Button>
                    <Button variant="warning" type="Button" onClick={handleAdd}>
                        Upload
                    </Button>
                </Modal.Footer>
            </Modal>
            <ToastContainer position='top-center' autoClose={2000} theme="colored"></ToastContainer>

        </>
    )
}

export default add
