import Customer from "../models/customer.model.js";
import { asyncHandler,ApiResponse,ApiError } from "are_package";

export const newCustomer=asyncHandler(async(req,res)=>{
    const {name,contact,pickupDate,pickupAddress,dropoffDate,dropoffAddress,carName}=req.body;
    
    if (
        [name,contact,pickupDate,pickupAddress,dropoffDate,dropoffAddress].some(
          (field) => field?.trim() === "" || field === undefined
        )
      ) {
        throw new ApiError(400, "All fields are required");
      }

    const newCustomer=new Customer({
        name,
        contact,
        pickupDate,
        pickupAddress,
        dropoffDate,
        dropoffAddress,
        carName,
    });

    const savedCustomer=await newCustomer.save();

    res.status(201).json(new ApiResponse(201,savedCustomer,"Customer created successfully"));
});

export const getAllCustomers=asyncHandler(async(req,res)=>{
    const customers=await Customer.find().sort({createdAt:-1});
    res.status(200).json(new ApiResponse(200,customers,"Customers fetched successfully"));
});

export const deleteCustomer=asyncHandler(async(req,res)=>{
    const {id}=req.params;
    const deletedCustomer=await Customer.findByIdAndDelete(id);
    res.status(200).json(new ApiResponse(200,deletedCustomer,"Customer deleted successfully"));
});