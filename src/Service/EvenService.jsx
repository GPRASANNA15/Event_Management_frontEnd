import axios from "axios";
const BASE_URL="https://eventmanagement-production-2b1d.up.railway.app/events";
const token=localStorage.getItem("token");
export const addEvent=async(data)=>{
    return axios.post(`${BASE_URL}/add`,data,{
        headers:{
            'Content-Type':'application/json',
               'Authorization':`Bearer ${token}`
        }
    });
}

export const getAllEvents=async()=>{
    return axios.get(`${BASE_URL}`,{
        headers:{
               'Authorization':`Bearer ${token}`
        }
    });
}
export const getEventById=async(id)=>{
    return axios.get(`${BASE_URL}/${id}`,{
        headers:{
               'Authorization':`Bearer ${token}`
        }
    });
}
export const updateEvent=async(id,data)=>{
    return axios.patch(`${BASE_URL}/${id}`,data,{
        headers:{
            'Content-Type':'application/json',
               'Authorization':`Bearer ${token}`
        }
    });
}
export const deleteEvent=async(id)=>{
    return axios.delete(`${BASE_URL}/${id}`,{
        headers:{
               'Authorization':`Bearer ${token}`
        }
    });
}

export const getByEvent=async(data)=>{
    return axios.get(`${BASE_URL}/event/${data}`,{
        headers:{
               'Authorization':`Bearer ${token}`
        }
    });
}
export const getByCategory=async(data)=>{
    return axios.get(`${BASE_URL}/category/${data}`,{
        headers:{
               'Authorization':`Bearer ${token}`
        }
    });
}
export const getByVenue=async(data)=>{
    return axios.get(`${BASE_URL}/venue/${data}`,{
        headers:{
               'Authorization':`Bearer ${token}`
        }
    });
}