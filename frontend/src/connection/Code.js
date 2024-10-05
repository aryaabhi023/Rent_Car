import axios from "axios";

const api='http://13.201.21.154/api/v1/code';

export const getCodes=async()=>{
    try {
        const {data}=await axios.get(api+'/getCodes');
        return data;
    } catch (error) {
        console.log(error.message);
        return error.message;
    }
}

export const updateCode=async(navcode)=>{
    try {
        const {data}=await axios.post(api+'/updateCode',{navcode});
        return data;
    } catch (error) {
        console.log(error.message);
        return error.message;
    }
}
