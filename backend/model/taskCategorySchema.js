import mongoose from "mongoose";

const taskCategorySchema = new mongoose.Schema(
  {
    taskCategory: {
      type: String,
      unique: true,
      required: true,
    },
  },
  { timestamps: false }
);

const TaskCategory = mongoose.model("TaskCategory", taskCategorySchema);

export default TaskCategory;
