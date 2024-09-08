import mongoose from "mongoose";

const carSchema = new mongoose.Schema({
    model:{
        type: String,
        required: true,
    },
    rating:{
        type: Number,
        required: true,
    },
    carName:{
        type: String,  
        unique: true,
        required: true,
    },
    imgUrl:{
        type: String,
        required: true,
    },
    type:{
        type: String,
        required: true,
    },
    price:{
        type: String,
        required: true,
    },
    speed:{
        type: String,
        required: true,
    },
    seats:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    }
},{
    timestamps: true,
}
);

const Car = mongoose.model("Car", carSchema);

export default Car;