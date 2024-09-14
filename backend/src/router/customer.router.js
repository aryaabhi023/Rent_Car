import { Router } from "express";
import { newCustomer,getAllCustomers,deleteCustomer,sendEmail } from "../controller/customer.controller.js";
const router = Router();

router.route("/newCustomer").post(newCustomer);
router.route("/getAllCustomers").post(getAllCustomers);
router.route("/sendEmail").post(sendEmail);
router.route("/deleteCustomer/:id").delete(deleteCustomer);

export { router };
