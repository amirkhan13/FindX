import { Router } from "express";
import {
    registerUser,
    loginUser,
    refreshAccessToken,
    logoutUser,
    getCurrentUser

} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";




const router = Router()

router.route("/register").post(
    upload.fields([
        {

            name: "avatar",
            maxCount: 1
        },
    ]),
    registerUser
)

router.route("/login").post(loginUser)

// secured routes
router.route("/logout").post(verifyJWT, logoutUser)
router.route("/profile").get(verifyJWT, getCurrentUser)
router.route("/refresh-token").post(refreshAccessToken)




export default router

