import { createSlice } from "@reduxjs/toolkit";

const initialState={
    id:localStorage.getItem("id"),
    role:localStorage.getItem("role"),
    token:localStorage.getItem("token")
}
const UserSlice=createSlice({
 name:"User",
 initialState,
 reducers:{
    setId:(state,action)=>{
        state.id=action.payload;
        localStorage.setItem("id",action.payload);
    },
    setRole:(state,action)=>{
        state.role=action.payload;
        localStorage.setItem("role",action.payload);
    },
    setToken:(state,action)=>{
        state.token=action.payload;
        localStorage.setItem("token",action.payload);
    }
 }
});
export const {setRole,setToken,setId}=UserSlice.actions;
export default UserSlice.reducer;