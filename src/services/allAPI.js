import { commenApi } from "./commenApi";
import { serverUrl } from "./serverUrl";

//add video
export const AddVideoApi = async(reqBody)=>{
    return await commenApi('POST',`${serverUrl}/videos`,reqBody)
}
//get the all videos
export const getvideosApi = async()=>{
    return await commenApi('GET',`${serverUrl}/videos`)
}
//add video history
export const AddVideoHistoryApi = async(reqBody)=>{
    return await commenApi('POST',`${serverUrl}/history`,reqBody)
}

export const getAllvideohistoryApi = async()=>{
    return await commenApi('GET',`${serverUrl}/history`)
}

export const deleteVideoApi = async(id)=>{
    return await commenApi('DELETE',`${serverUrl}/videos/${id}`)


}
 export const deleteHistoryVideoApi = async(id)=>{  //id:-path parameter
    return await commenApi('DELETE',`${serverUrl}/history/${id}`)
 }
//api add category
 export const addCategoryApi = async(reqbody)=>{
    return await commenApi('POST',`${serverUrl}/category/`,reqbody)
 }
 //api to get category
export const getAllCategoryApi = async()=>{
    return await commenApi('GET',`${serverUrl}/category`)
} 

//api delete category

export const deleteCategoryApi = async(id)=>{
    return await commenApi('DELETE',`${serverUrl}/category/${id}`)
}

//api to add video details to a category

export const addVideoToCategoryApi = async(id, reqBody)=>{
    return await commenApi('PUT',`${serverUrl}/category/${id}`,reqBody)
}