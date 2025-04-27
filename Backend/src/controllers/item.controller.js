import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import { Item } from "../models/Item.model.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";



const createItem = asyncHandler(async(req,res)=>{
    const{
          type,
         itemName,
          category,
          description,
          location,
          date,
          status,
          reportedBy,
          securityQuestion
        } = req.body
       
        
        if (
            [
                 type,
                itemName,
                 category,
                 description,
                 location,
                 date, 
                 ].some((field) => field?.trim() === "")
        ) {
            throw new ApiError(400, "All fields are required")
        }

        const imgURL = req.files?.imageURL[0]?.path

        if (!imgURL) {
            throw new ApiError(400, "Image file is required")
        }

        const img = await uploadOnCloudinary(imgURL)
        if(!img){
            throw new ApiError (400, "Image file is required");
        }

        

        if(type==="found" && !securityQuestion?.trim()){
            throw new ApiError(400, "Security question is required for the found items")
        }

        const newItem = await Item.create({
            type,
            itemName,
            category,
            description,
            imageURL:img.url,
            location,
            date,
            status,
            reportedBy:req.user.id,
            securityQuestion:type==="found" ?securityQuestion: null,

        });

        return res.status(201)
        .json(
            new ApiResponse(200,newItem,"item reported successfully")
        )






})

const getAllItems = asyncHandler(async(req,res)=>{
    const {type ,category,status,search} =req.query

    const query={}
    if(type) query.type =type;
    if(category) query.category =category;
    if(status) query.status =status;
    if (search) {
        query.itemName = { $regex: search, $options: "i" };
      }

      const items = await Item.find(query).populate("reportedBy", "name email");

      res.status(200).json(new ApiResponse(200, items, "Items fetched successfully"));

})
const getReportedItems = asyncHandler(async (req, res) => {
    const userId = req.user.id;
     
    const items = await Item.find({ reportedBy: userId }).populate("reportedBy", "name email");

    if (!items) {
        return res.status(404).json({ message: "No reported items found" });
    }

    res.status(200).json({ items });
});


const getItemById=asyncHandler(async(req,res)=>{
    const {itemId} = req.params;
    const item = await Item.findById(itemId).populate("reportedBy", "name email");
    
    if(!item){
        throw new ApiError(404,"Item not found");
    }
    res.status(200)
    .json(
        new ApiResponse(
            200,item,"Item fetched Successfully"
        )
    )
})


const updateItem = asyncHandler(async(req,res)=>{
    const {itemId} =req.params
    const updates =req.body

    const item =await Item.findById(itemId);

    if(!item){
        throw new ApiError(404,"Item not Found to update")

    }
    if(item.reportedBy.toString() !==req.user.id){
        throw new ApiError(403,"Unauthorized to Update the item")
    }

    Object.assign(item , updates)
    await item.save();

    res.status(200)
    .json(
        new ApiResponse(
            200,item,"Item Updated Successfully"
        )
    )
});

const deleteItem = asyncHandler(async(req,res)=>{
    const {itemId} = req.params;

    const item = await Item.findById(itemId);

    if(!item){
        throw new ApiError(404,"Item not found")
    }
    if(req.user.role !=="admin"){
        throw new ApiError(403,"Unauthorized to delete the item")
    }
   
  await item.deleteOne();


    res.
    status(200)
    .json(
        new ApiResponse(
            200, null,"Item removed Successfully!"
        )
    )
})

const updateItemStatus = asyncHandler(async (req, res) => {
    const { itemId } = req.params;
    const { status } = req.body;
   
  
    const validStatuses = ["open", "claimed", "archived"];
    if (!validStatuses.includes(status)) {
      throw new ApiError(400, "Invalid status value");
    }
  
    const item = await Item.findById(itemId);
  
    if (!item) {
      throw new ApiError(404, "Item not found");
    }
  
    if ( req.user.role !== 'admin') {
      throw new ApiError(403, "Unauthorized to update this item");
    }
  
    item.status = status;
    await item.save();
  
    res.status(200).json(new ApiResponse(200, item, "Item status updated successfully"));
  });

  const searchItems = asyncHandler(async (req, res) => {
    const { query } = req.query;
  
    if (!query) {
      throw new ApiError(400, "Search query is required");
    }
  
    const items = await Item.find({
      $or: [
        { itemName: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
        { location: { $regex: query, $options: "i" } },
      ],
    }).populate("reportedBy", "name email");
  
    res.status(200).json(new ApiResponse(200, items, "Search results"));
  });
  
  

export{
    createItem,
    getAllItems,
    getItemById,
    updateItem,
    deleteItem,
    updateItemStatus,
    searchItems,
    getReportedItems
    
}