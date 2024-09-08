import mongoose from "mongoose";

// name,contact no.,pick date and pick time, drop date and drop time

const CustomerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    contact: {
        type: String,
        required: true,
    },
    pickupDate: {
        type: String,
        required: true,
    },
    pickupAddress: {
        type: String,
        required: true,
    },
    dropoffDate: {
        type: String,
        required: true,
    },
    dropoffAddress: {
        type: String,
        required: true,
    },
    carName: {
        type: String,
    },
}, {
    timestamps: true,
});

const Customer = mongoose.model("Customer", CustomerSchema);

export default Customer;