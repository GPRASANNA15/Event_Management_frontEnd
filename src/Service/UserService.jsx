import axios from "axios";
const BASE_URL="http://localhost:8080/users";
const token=localStorage.getItem("token");
export const loginUser=async(data)=>{
   return axios.post(`${BASE_URL}/auth`,data,{
    headers:{
        'Content-Type':'application/json'
    }
   });
}
export const registerUser=async(data)=>{
    return axios.post(`${BASE_URL}/add`,data,{
        'Content-Type':'application/json'
    })
}
export const getAllUsers=async()=>{
    return axios.get(`${BASE_URL}`,{
        headers:{
            'Authorization':`Bearer ${token}`
        }
    });
}

export const getUserById=async(id)=>{
    return axios.get(`${BASE_URL}/${id}`,{
        headers:{
            'Authorization':`Bearer ${token}`
        }
    });
}

export const updateUser=async(id,data)=>{
    return axios.patch(`${BASE_URL}/${id}`,data,{
        headers:{
            'Content-Type':'application/json',
               'Authorization':`Bearer ${token}`
        }
    });
}

export const deleteUser=async(id)=>{
    return axios.delete(`${BASE_URL}/${id}`,{
        headers:{
            'Authorization':`Bearer ${token}` 
        }
    });
}
