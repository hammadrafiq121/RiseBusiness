import mongoose from "mongoose";

const statusSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      unique: true,
      required: true,
    },
    belongsTo: {
      type: String,
      required: true,
      enum: ["customers", "leads"],
    },
  },
  { timestamps: false }
);
const Status = mongoose.model("Status", statusSchema);
export default Status;
