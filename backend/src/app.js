import express from "express";
import cors from "cors";
import {ApiError} from "are_package";
import {router as carRouter} from "./router/car.router.js";
import {router as customerRouter} from "./router/customer.router.js";

const app = express();

const corsOptions = {
    origin: "http://localhost:5173",
    methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials: true,
  };
  
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("Hello World!");
});


app.use("/api/v1/car", carRouter);
app.use("/api/v1/customer", customerRouter);


// Error handling middleware
app.use((err, req, res, next) => {
    if (err instanceof ApiError) {
        res.status(err.statusCode).json({
            success: false,
            message: err.message,
            errors: err.errors,
        });
    } else {
        res.status(500).json({
            success: false,
            message: "Internal Server Error "+err.message,
        });
    }
  });

export default app;