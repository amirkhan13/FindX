import {Router} from "express";

import { deleteUserById, getAdminStats, getAllUsers } from "../controllers/admin.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { authorizeRole } from "../middlewares/authorizeRole.middleware.js";


const router = Router()

router.route("/get-stats").get(
    verifyJWT,
    authorizeRole('admin'),
    getAdminStats
)
router.route("/all-users").get(
    verifyJWT,
    authorizeRole('admin'),
    getAllUsers
)
router.route("/delete-users/:id").delete(
    verifyJWT,
    authorizeRole('admin'),
    deleteUserById
)


export default router