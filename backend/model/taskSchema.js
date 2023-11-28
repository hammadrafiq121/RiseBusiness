import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    estimatedTime: Number,
    startDate: Date,
    endDate: Date,
    comments: [String],
    taskCategory: String,
    assignee: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    priority: String,
    checklist: [{ text: String, status: String }],
    isExpired: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);
export default Task;
