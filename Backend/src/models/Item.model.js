import mongoose, { Schema } from "mongoose";

const ItemSchema = new Schema({
  type: {
    type: String,
    enum: ["lost", "found"],
    required: true
  },
  itemName: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  imageURL: {
    type: String
  },
  location: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ["open", "claimed", "archived"],
    default: "open"
  },
  reportedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  securityQuestion: {
    type: String
  },
  
}, { timestamps: true });

export const Item = mongoose.model("Item", ItemSchema);
