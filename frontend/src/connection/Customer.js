import axios from "axios";

const api='http://localhost:7010/api/v1/customer';

export const newCustomer=async(formData)=>{
    try {
        const {data}=await axios.post(api+'/newCustomer',formData);
        return data;
    } catch (error) {
        console.log(error.message);
        return null;
    }
}

export const getAllCustomers=async()=>{
    try {
        const {data}=await axios.get(api+'/getAllCustomers');
        return data;
    } catch (error) {
        console.log(error.message);
        return null;
    }
}

export const deleteCustomer=async(id)=>{
    try {
        const {data}=await axios.delete(api+'/deleteCustomer/'+id);
        return data;
    } catch (error) {
        console.log(error.message);
        return null;
    }
}

