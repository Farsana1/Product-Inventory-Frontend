
import { commonApi } from "./commonApi"
import { serverUrl } from "./serverUrl"

// add a post
export const addApi = async(reqBody)=>{
    return await commonApi('POST',`${serverUrl}/products`,reqBody)
}

// get a post
export const getApi = async()=>{
    return await commonApi('GET',`${serverUrl}/products`,'')
}

//delete a post
export const deleteApi = async(id)=>{
    return await commonApi('DELETE',`${serverUrl}/products/${id}`,{})
} 

//update a post
export const updateApi = async (id,reqBody) =>{
    return await commonApi('PUT',`${serverUrl}/products/${id}`,reqBody)
}