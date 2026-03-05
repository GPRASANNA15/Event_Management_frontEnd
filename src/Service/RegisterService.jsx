import axios from "axios";
const token=localStorage.getItem("token");
const BASE_URL="http://localhost:8080/register";
export const addRegistration=async(data)=>{
    return axios.post(`${BASE_URL}/add`,data,{
        headers:{
            'Content-Type':'application/json',
             'Authorization':`Bearer ${token}`
       }
    });
}

export const getAllRegistrations=async()=>{
    return axios.get(`${BASE_URL}`,{
        headers:{
             'Authorization':`Bearer ${token}`
        }
    });
}

export const getRegistrationById=async(id)=>{
    return axios.get(`${BASE_URL}/${id}`,{
        headers:{
             'Authorization':`Bearer ${token}`
        }
    });
}
export const CancelRegistration=async(id)=>{
    return axios.delete(`${BASE_URL}/${id}`,{
        headers:{
            'Content-Type':'application/json',
             'Authorization':`Bearer ${token}`
        }
    });
}
export const getRegistrationByUser=async(id)=>{
    return axios.get(`${BASE_URL}/user/${id}`,{
        headers:{
             'Authorization':`Bearer ${token}`
        }
    });
}