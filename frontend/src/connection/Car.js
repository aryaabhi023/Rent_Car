import axios from "axios";

const api='http://localhost:7010/api/v1/car';

export const getCars=async()=>{
    try {
        const  {data}=await axios.get(api+'/getCars');
        return data;
    } catch (error) {
        console.log(error.message);
        return error.message;
    }
}

export const getCar=async(id)=>{
    try {
        const {data}=await axios.post(api+'/getCar',{id});
        return data;
    } catch (error) {
        console.log(error.message);
        return error.message;
    }
}

export const uploadCar=async(formData)=>{
    try {
        const {data}=await axios.post(api+'/uploadCar',formData);
        return data;
    } catch (error) {
        console.log(error.message);
        return error.message; 
    }
}

export const deleteCar=async(id)=>{
    try {
        const {data}=await axios.delete(api+'/deleteCar/'+id);
        return data;
    } catch (error) {
        console.log(error.message);
        return error.message;
    }
}