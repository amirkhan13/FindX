import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import { Claim } from "../models/Claim.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Item } from "../models/Item.model.js";
import { User } from "../models/user.model.js";



const getAdminStats = async (req, res, next) => {
    try {
      const totalUsers = await User.countDocuments();
      const totalItems = await Item.countDocuments();
      const totalClaims = await Claim.countDocuments();
      const pendingClaims = await Claim.countDocuments({ status: 'pending' });
     

  
      return res.status(200).json(
        new ApiResponse(200, {
          totalUsers,
          totalItems,
          totalClaims,
          pendingClaims,
        }, "Dashboard stats fetched successfully")
      );
      
    } catch (error) {
      return next(new ApiError(500, "Failed to fetch dashboard stats"));
    }
  };

const getAllUsers = asyncHandler(async (req, res, next) => {
    try {
      const users = await User.find().select("username email role course Year"); 
  
      return res.status(200).json(
        new ApiResponse(200, { users }, "Users fetched successfully")
      );
    } catch (error) {
      return next(new ApiError(500, "Failed to fetch users"));
    }
  });

  const deleteUserById = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
  
    const deletedUser = await User.findByIdAndDelete(id);
  
    if (!deletedUser) {
      return next(new ApiError(404, "User not found"));
    }
  
    return res.status(200).json(
      new ApiResponse(200, null, "User deleted successfully")
    );
  });
  
  

  export{
    getAdminStats,
    getAllUsers,
    deleteUserById
  }