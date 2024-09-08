import { Router } from "express";
import { newCustomer,getAllCustomers,deleteCustomer } from "../controller/customer.controller.js";
const router = Router();

router.route("/newCustomer").post(newCustomer);
router.route("/getAllCustomers").get(getAllCustomers);
router.route("/deleteCustomer/:id").delete(deleteCustomer);

export { router };
