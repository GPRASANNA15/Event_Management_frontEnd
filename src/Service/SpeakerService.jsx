import axios from "axios";
const token=localStorage.getItem("token");
const BASE_URL="https://eventmanagement-production-2b1d.up.railway.app/speaker"
export const addSpeaker=async(data)=>{
    return axios.post(`${BASE_URL}/add`,data,{
        headers:{
            'Content-Type':'multipart/form-data',
             'Authorization':`Bearer ${token}`
        }
    });
}

export const getSpeakers=async()=>{
    return axios.get(`${BASE_URL}`,{
        headers:{
             'Authorization':`Bearer ${token}`
        }
    });
}
export const getSpeakerById=async(id)=>{
    return axios.get(`${BASE_URL}/${id}`,{
        headers:{
             'Authorization':`Bearer ${token}`
        }
    });
}
export const updateSpeaker=async(id,data)=>{
    return axios.patch(`${BASE_URL}/${id}`,data,{
        headers:{
            'Content-Type':'multipart/form-data',
             'Authorization':`Bearer ${token}`
        }
    });
}
export const deleteSpeaker=async(id)=>{
    return axios.delete(`${BASE_URL}/${id}`,{
        headers:{
             'Authorization':`Bearer ${token}`
        }
    });
}
export const getSpeakerbyEvent=async(id)=>{
    return axios.get(`${BASE_URL}/${id}`,{
        headers:{
             'Authorization':`Bearer ${token}`
        }
    });
}