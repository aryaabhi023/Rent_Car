import mongoose from 'mongoose';

const BlockedUserSchema=new mongoose.Schema({
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