import axios from "axios";

const api='http://13.201.21.154/api/v1/blockeduser';

export const createBlockedUser=async(formData)=>{
    try {
        const {data}=await axios.post(api+'/createBlockedUser',formData);
        return data;
    } catch (error) {
        console.log(error.message);
        return error.message;
    }
}

export const getBlockedUsers=async()=>{
    try {
        const {data}=await axios.get(api+'/getAllBlockedUsers');
        return data;
    } catch (error) {
        console.log(error.message);
        return error.message;
    }
}

export const deleteBlockedUser=async(id)=>{
    try {
        const {data}=await axios.delete(api+'/deleteBlockedUser/'+id);
        return data;
    } catch (error) {
        console.log(error.message);
        return error.message;
    }
}

export const findBlockedUser=async(formData)=>{
    try {
        const {data}=await axios.post(api+'/findBlockedUser',formData);
        return data;
    } catch (error) {
        console.log(error.message);
        return error.message;
    }
}