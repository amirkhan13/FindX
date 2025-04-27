import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import { Claim } from "../models/Claim.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Item } from "../models/Item.model.js";

const createClaim = asyncHandler(async(req ,res)=>{
    const {itemId} = req.params
    const{answerGiven} = req.body

    if(!answerGiven){
        throw new ApiError(400,"Answer to the security question is required");

    }
    const item = await Item.findById(itemId);

    if(!item){
        throw new ApiError(404,"Item not Found");
    }

    if(item.reportedBy.toString()== req.user.id){
        throw new ApiError(400,"You Cannot Claim your own item");
    }
    const existingClaim = await Claim.findOne({
        itemId,
        claimantId:req.user.id,
    })

    if(existingClaim){
        throw new ApiError(400,"You have already submitted a claim for this item")
    }

    const claim = await Claim.create({
        itemId,
        claimantId:req.user.id,
        answerGiven,
    })

    res
    .status(201)
    .json(new ApiResponse(
        201,
        claim,
        "Claim Submitted Successfully"
    ))

})


const getUserClaims = asyncHandler(async(req,res)=>{
    const claims =await Claim.find({
        claimantId:req.user.id,

    }).populate('itemId' ,'itemName description location').sort({
        createdAt:-1
    });

    res
    .status(200)
    .json(new ApiResponse(
        200,claims,"User claims retrieved succesfully!"
    ))
});
const getAllClaims = async (req, res) => {
  try {
    
    const items = await Item.find({ type: "found" })
      .populate({
        path: "reportedBy",
        select: "name email",
      })
      .lean();

    
    const itemIds = items.map((item) => item._id);

   
    const claims = await Claim.find({ itemId: { $in: itemIds } })
      .populate({
        path: "claimantId",
        select: "name email course Year",
      })
      .lean();

    
    const itemsWithClaims = items.map((item) => {
      const itemClaims = claims.filter(
        (claim) => claim.itemId.toString() === item._id.toString()
      );
      return { ...item, claims: itemClaims };
    });

    
    res.status(200).json({ success: true, data: itemsWithClaims });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};



const getReportedItems = async (req, res) => {
  try {
    const items = await Item.find({ reportedBy: req.user.id, type: "found" })
      .populate({
        path: "reportedBy",
        select: "name email ",
      })
      .lean();

    const itemIds = items.map((item) => item._id);

    const claims = await Claim.find({ itemId: { $in: itemIds } })
      .populate({
        path: "claimantId",
        select: "name email course Year",
      })
      .lean();

    const itemsWithClaims = items.map((item) => {
      const itemClaims = claims.filter(
        (claim) => claim.itemId.toString() === item._id.toString()
      );
      return { ...item, claims: itemClaims };
    });

    res.status(200).json({ success: true, data: itemsWithClaims });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};




const updateClaimStatus = async (req, res) => {
  const { claimId } = req.params;
  const { status } = req.body;

  if (!["approved", "rejected"].includes(status)) {
    return res.status(400).json({ success: false, message: "Invalid status" });
  }

  try {
    const claim = await Claim.findById(claimId).populate("itemId");

    if (!claim) {
      return res.status(404).json({ success: false, message: "Claim not found" });
    }

    if (claim.itemId.reportedBy.toString() !== req.user.id && req.user.role !== "admin") {

      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    claim.status = status;
    claim.reviewedBy = req.user.id;
    await claim.save();

    res.status(200).json({ success: true, message: `Claim ${status} successfully` });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
  
  

export{
    createClaim,
    getUserClaims,
    updateClaimStatus,
    getReportedItems,
    getAllClaims
    
}