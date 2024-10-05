import axios from "axios";

const api='http://13.201.21.154/api/v1/address';

export const getAllAddress=async()=>{
    try {
        const {data}=await axios.get(api+'/getAllAddress');
        return data;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const createAddress=async(address)=>{
    try {
        const {data}=await axios.post(api+'/createAddress',address);
        return data;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const deleteAddress=async(id)=>{
    try {
        const {data}=await axios.delete(api+'/deleteAddress/'+id);
        return data;
    } catch (error) {
        console.log(error);
        return null;
    }
}