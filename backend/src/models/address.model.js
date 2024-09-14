import mongoose from 'mongoose';
const addressSchema = mongoose.Schema({
    locationName: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true
    }
});

const Address = mongoose.model('Address', addressSchema);
export default Address;