// import mongoose from "mongoose";

// const taskSchema = new mongoose.Schema(
//   {
//     title: String,
//     description: String,
//     estimatedTime: Number,
//     startDate: Date,
//     endDate: Date,
//     comment: String,
//     taskCategory: String,
//     assignees: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
//     priority: String,
//     checklist: [
//       {
//         text: String,
//         status: String,
//       },
//       { _id: false },
//     ],
//     isExpired: {
//       type: Boolean,
//       default: false,
//     },
//   },
//   { timestamps: true }
// );

// const Task = mongoose.model("Task", taskSchema);
// export default Task;

import mongoose from "mongoose";

const checklistItemSchema = new mongoose.Schema({
  text: String,
  status: String,
});

// Set _id to false for the fields in the checklistItemSchema
checklistItemSchema.set("_id", false);

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
    checklist: [checklistItemSchema], // Use the checklistItemSchema here
    isExpired: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);
export default Task;
