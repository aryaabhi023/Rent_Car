import { Router } from "express";
import { upload } from "../middleware/multer.middleware.js";
import { uploadCar,getCars,deleteCar,getCar } from "../controller/car.controller.js";

const router=Router();

router.route("/uploadCar").post(upload.single("image"),uploadCar);
router.route("/getCars").get(getCars);
router.route("/getCar").post(getCar);
router.route("/deleteCar/:carName").delete(deleteCar);

export {router};

