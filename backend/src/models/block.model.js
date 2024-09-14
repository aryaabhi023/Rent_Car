import mongoose from 'mongoose';

const BlockedUserSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    email:{
        type:String,
    }
},{timestamps:true});

const Blockeduser=mongoose.model('Blockeduser',BlockedUserSchema);

export default Blockeduser;