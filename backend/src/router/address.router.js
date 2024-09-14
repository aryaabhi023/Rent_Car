import { Router } from "express";
import { getAllAddress,createAddress,deleteAddress} from "../controller/address.controller.js";

const router = Router();
router.route("/getAllAddress").get(getAllAddress);
router.route("/createAddress").post(createAddress);
router.route("deleteAddress/:id").delete(deleteAddress);

export { router };