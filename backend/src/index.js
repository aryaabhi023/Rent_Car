import mongoose from "mongoose";
import {config} from "dotenv";
import app from "./app.js";

config();

const port = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
        console.log(`Server listening on port ${port}`);
    });
}).catch((err) => {
    console.log(err.message);
});