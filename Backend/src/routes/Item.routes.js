import {Router} from "express";
import { 
    createItem,
    deleteItem,
    getAllItems,
    getItemById,
    updateItem,
    updateItemStatus,
    searchItems,
    getReportedItems

 } from "../controllers/item.controller.js";
import {upload} from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { authorizeRole } from "../middlewares/authorizeRole.middleware.js";


const router = Router()

router.route("/report-item").post(
    verifyJWT,
    authorizeRole('user','admin'),
    upload.fields([
        {
            
            name:"imageURL",
            maxCount :1
        },
    ]),
    createItem
)

router.route("/getAllItems").get(
    verifyJWT,
     authorizeRole('user' , 'admin'),
    getAllItems
)

router.route("/search").get(
    verifyJWT,
    searchItems
)
router.route("/reportedItems").get(
    verifyJWT,
    authorizeRole('user' , 'admin'),
    getReportedItems
)
router.route("/:itemId").get(
    verifyJWT,
    getItemById
)

router.route("/update-item/:itemId").put(

    verifyJWT,
    authorizeRole('user' , 'admin'),
    upload.fields([
        {
            
            name:"imageURL",
            maxCount :1
        },
    ]),
    updateItem
)

router.route("/delete-item/:itemId").delete(
    verifyJWT,
     authorizeRole('admin'),
    deleteItem
)


router.route("/update-item-status/:itemId").put(
    verifyJWT,
    authorizeRole('user' , 'admin'),
    updateItemStatus
)










export default router

