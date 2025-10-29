import { Router } from "express";

import { deleteUserById, getAdminStats, getAllUsers } from "../controllers/admin.controller.js";

import { authorizeRole } from "../middlewares/authorizeRole.middleware.js";


const router = Router()

router.route("/get-stats").get(

    authorizeRole('admin'),
    getAdminStats
)
router.route("/all-users").get(

    authorizeRole('admin'),
    getAllUsers
)
router.route("/delete-users/:id").delete(

    authorizeRole('admin'),
    deleteUserById
)


export default router