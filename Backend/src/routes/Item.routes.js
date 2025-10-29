import { Router } from "express";
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
import { upload } from "../middlewares/multer.middleware.js"

import { authorizeRole } from "../middlewares/authorizeRole.middleware.js";


const router = Router()

router.route("/report-item").post(

    authorizeRole('user', 'admin'),
    upload.fields([
        {

            name: "imageURL",
            maxCount: 1
        },
    ]),
    createItem
)

router.route("/getAllItems").get(

    authorizeRole('user', 'admin'),
    getAllItems
)

router.route("/search").get(

    searchItems
)
router.route("/reportedItems").get(

    authorizeRole('user', 'admin'),
    getReportedItems
)
router.route("/:itemId").get(

    getItemById
)

router.route("/update-item/:itemId").put(


    authorizeRole('user', 'admin'),
    upload.fields([
        {

            name: "imageURL",
            maxCount: 1
        },
    ]),
    updateItem
)

router.route("/delete-item/:itemId").delete(

    authorizeRole('admin'),
    deleteItem
)


router.route("/update-item-status/:itemId").put(

    authorizeRole('user', 'admin'),
    updateItemStatus
)










export default router

