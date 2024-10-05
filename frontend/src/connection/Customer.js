import axios from "axios";

const api='http://13.201.21.154/api/v1/customer';

export const newCustomer=async(formData)=>{
    try {
        const {data}=await axios.post(api+'/newCustomer',formData);
        return data;
    } catch (error) {
        console.log(error.message);
        return null;
    }
}

export const getAllCustomers=async(formData)=>{
    try {
        const {data}=await axios.post(api+'/getAllCustomers',formData);
        return data.data;
    } catch (error) {
        console.log(error.message);
        return null;
    }
}

export const sendEmail=async(bookingDetails)=>{
    try {
        const {data}=await axios.post(api+'/sendEmail',bookingDetails);
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

