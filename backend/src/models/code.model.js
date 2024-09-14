import mongoose from "mongoose";

const codeSchema = new mongoose.Schema({
    navcode:{
        type:String,
        required:true
    },
    admincode:{
        type:String,
        required:true
    }
},
{
    timestamps:true
});

const Code = mongoose.model("Code",codeSchema);

export default Code;
