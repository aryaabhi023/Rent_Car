import { Router } from "express";
import { createdBlockedUser, deleteBlockedUser, getAllBlockedUsers,findBlockedUser } from "../controller/blockeduser.controller.js";

const router=Router();
router.route("/createBlockedUser").post(createdBlockedUser);
router.route("/getAllBlockedUsers").get(getAllBlockedUsers);
router.route("/deleteBlockedUser/:id").delete(deleteBlockedUser);
router.route("/findBlockedUser").post(findBlockedUser);

export { router };