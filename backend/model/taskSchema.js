import mongoose from "mongoose";

const checklistItemSchema = new mongoose.Schema(
  {
    text: String,
    statuses: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        status: String,
      },
      { _id: false },
    ],
  },
  { _id: false }
);

const taskSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    estimatedTime: Number,
    startDate: Date,
    endDate: Date,
    comment: String,
    taskCategory: String,
    assignees: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    priority: String,
    checklist: [checklistItemSchema],
    isExpired: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);
export default Task;
