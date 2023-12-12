import mongoose from "mongoose";

const checklistItemSchema = new mongoose.Schema(
  {
    text: String,
    status: String,
    //   statuses: [
    //     {
    //       userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    //       status: String,
    //     },
    //     { _id: false },
    //   ],
  },
  { _id: false }
);

const commentSchema = new mongoose.Schema(
  {
    text: {
      type: String,
    },
    time: {
      type: Date,
      default: new Date(),
    },
  },
  {
    _id: false, // Disable automatic creation of _id for each comment
  }
);

const taskSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    estimatedTime: Number,
    startDate: Date,
    endDate: Date,
    comments: [commentSchema],
    // taskCategory:String,
    taskCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TaskCategory",
    },
    assignee: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    // assignee: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    priority: String,
    checklist: [checklistItemSchema],
    // isExpired: {
    //   type: Boolean,
    //   default: false,
    // },
    createdBy: {
      name: String,
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    },
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);
export default Task;
