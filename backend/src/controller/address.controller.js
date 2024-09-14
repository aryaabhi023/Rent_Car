import Address from "../models/address.model.js";
import { asyncHandler,ApiError,ApiResponse } from "are_package";

export const createAddress=asyncHandler(async(req,res)=>{
    const {locationName,address,phone}=req.body;
    if(!locationName || !address || !phone){
        throw new ApiError(400,"All fields are required")
    }
    const newAddress=new Address({
        locationName,
        address,
        phone
    })
    await newAddress.save();

    res.status(201).json(new ApiResponse(201, newAddress,"Address created successfully"));
})

export const getAllAddress=asyncHandler(async(req,res)=>{
    const address=await Address.find();
    res.status(200).json(new ApiResponse(200,address,"All address"));
})

export const deleteAddress=asyncHandler(async(req,res)=>{
    const {id}=req.params;
    const address=await Address.findByIdAndDelete(id);
    if(!address){
        throw new ApiError(404,"Address not found");
    }
    res.status(200).json(new ApiResponse(200,address,"Address deleted successfully"));
})