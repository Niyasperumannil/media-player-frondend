import axios from "axios";



export const commenApi = async(httpmethod,url,reqbody)=>{
    const reqConfiq ={
        method:httpmethod,
        url,
        data:reqbody,
        headers:{"Content-Type":"application/json"}
    }
    return await axios(reqConfiq).then((result)=>{
        return result
    }).catch((error)=>{
        return error
    })
}