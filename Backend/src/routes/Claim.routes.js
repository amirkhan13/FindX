import {Router} from "express";

import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createClaim, getAllClaims, updateClaimStatus, getReportedItems,getUserClaims } from "../controllers/claim.controller.js";
import { authorizeRole } from "../middlewares/authorizeRole.middleware.js";




const router = Router()


router.route("/:itemId/create-claim").post(
    verifyJWT,
    authorizeRole('user' , 'admin'),
    createClaim
)



router.route("/All-claims").get(
    verifyJWT,
    authorizeRole('admin'),
    getAllClaims
)

router.route("/user-claims").get(
    verifyJWT,
    authorizeRole('user','admin'),
    getUserClaims
    
)

router.route("/Item-Claims").get(
    verifyJWT,
    authorizeRole('user','admin'),
    getReportedItems
)


router.route("/:claimId/status").patch(
    verifyJWT,
    authorizeRole('user','admin'),
    updateClaimStatus
)













export default router

