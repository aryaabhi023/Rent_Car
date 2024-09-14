import Blockeduser from '../models/block.model.js';
import {ApiError,ApiResponse,asyncHandler} from "are_package";

export const createdBlockedUser=asyncHandler(async(req,res)=>{
    const {name,phone,email}=req.body;
    if(!name || !phone || !email){
        throw new ApiError(400,"Name and phone number are required");
    }
    const blockeduser=new Blockeduser({name,phone,email});
    await blockeduser.save();

    res.status(201).json(new ApiResponse(201, blockeduser,"Blocked user created successfully"));
});

export const getAllBlockedUsers=asyncHandler(async(req,res)=>{
    const blockedusers=await Blockeduser.find().sort({createdAt:-1});
    res.status(200).json(new ApiResponse(200, blockedusers,"Blocked users fetched successfully"));
});

export const deleteBlockedUser=asyncHandler(async(req,res)=>{
    const {id}=req.params;
    const blockeduser=await Blockeduser.findByIdAndDelete(id);
    if(!blockeduser){
        throw new ApiError(404,"Blocked user not found");
    }
    res.status(200).json(new ApiResponse(200, blockeduser,"Blocked user deleted successfully"));
});

export const findBlockedUser=asyncHandler(async(req,res)=>{
    const {name="",phone="",email=""}=req.body;
    const blockeduser=await Blockeduser.findOne({$or:[{name},{phone},{email}]});
    if(!blockeduser){
        return res.status(200).json(new ApiResponse(200, false,"Blocked user found successfully")); 
    }
    return res.status(200).json(new ApiResponse(200, true,"Blocked user found successfully"));
});
