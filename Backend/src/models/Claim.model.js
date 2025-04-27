import mongoose, {Schema} from "mongoose";

const ClaimSchema = new Schema({
    itemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item",
        required: true
      },
      claimantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
      },
      answerGiven: {
        type: String,
        required: true   
      },
      status: {
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "pending"
      },
      reviewedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"   
      }
},{timestamps:true});

export const Claim = mongoose.model("Claim" ,ClaimSchema);