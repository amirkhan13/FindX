import { Router } from "express";


import { createClaim, getAllClaims, updateClaimStatus, getReportedItems, getUserClaims } from "../controllers/claim.controller.js";
import { authorizeRole } from "../middlewares/authorizeRole.middleware.js";




const router = Router()


router.route("/:itemId/create-claim").post(

    authorizeRole('user', 'admin'),
    createClaim
)



router.route("/All-claims").get(

    authorizeRole('admin'),
    getAllClaims
)

router.route("/user-claims").get(

    authorizeRole('user', 'admin'),
    getUserClaims

)

router.route("/Item-Claims").get(

    authorizeRole('user', 'admin'),
    getReportedItems
)


router.route("/:claimId/status").patch(

    authorizeRole('user', 'admin'),
    updateClaimStatus
)













export default router

