import Code from "../models/code.model.js";
import {ApiError,ApiResponse,asyncHandler} from "are_package";

export const createCode=asyncHandler(async(req,res)=>{
    const {navcode,admincode}=req.body;
    if(!navcode || !admincode){
        throw new ApiError(400,"All fields are required");
    }
    const code=new Code({
        navcode,
        admincode
    });
    code.save();
    return res.status(201).json(new ApiResponse(201,code,"Code created successfully"));
})

export const getCodes=asyncHandler(async(req,res)=>{
    const codes=await Code.find();
    return res.status(200).json(new ApiResponse(200,codes,"Codes fetched successfully"));
});

export const updateCode=asyncHandler(async(req,res)=>{
    const id='66df5e879ea137589c03dcec';
    const code=await Code.findById(id);
    if(!code){
        throw new ApiError(400,"Code not found");
    }
    
    const {navcode}=req.body;
    if(!navcode){
        throw new ApiError(400,"All fields are required");
    }
    code.navcode=navcode;
    code.save({validateBeforeSave:false});
    return res.status(200).json(new ApiResponse(200,code,"Code updated successfully"));
});