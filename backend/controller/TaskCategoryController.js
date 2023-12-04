import TaskCategory from "../model/taskCategorySchema.js";

export const getTaskCategories = async (req, res) => {
  try {
    const taskCategories = await TaskCategory.find();
    return res.json(taskCategories);
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

export const addTaskCategory = async (req, res) => {
  const { taskCategory } = req.body;

  try {
    const existingTaskCategory = await TaskCategory.findOne({
      taskCategory: taskCategory,
    });
    if (existingTaskCategory) {
      return res.status(400).json({ error: "Task Category already exists" });
    }
    const newTaskCategory = await TaskCategory.create({
      taskCategory,
    });
    await newTaskCategory.save();
    return res.status(200).json(newTaskCategory);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getTaskCategory = async (req, res) => {
  try {
    const taskCategoryId = req.params.id;
    const taskCategory = await TaskCategory.findById(taskCategoryId);
    return res.status(200).json(taskCategory);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const updateTaskCategory = async (request, response) => {
  try {
    const taskCategoryId = request.params.id;
    const updatedTaskCategory = await TaskCategory.findOneAndUpdate(
      { _id: taskCategoryId },
      request.body,
      {
        new: true,
      }
    );
    if (updatedTaskCategory) {
      return response.status(200).json(updatedTaskCategory);
    } else {
      return response.status(404).json({ error: "TaskCategory not updated" });
    }
  } catch (error) {
    return response
      .status(500)
      .json({ error: "Failed to update TaskCategory" });
  }
};

export const deleteTaskCategory = async (request, response) => {
  try {
    const taskCategoryId = request.params.id;
    const deletedTaskCategory = await TaskCategory.findByIdAndDelete(
      taskCategoryId
    );
    return response.status(200).json(deletedTaskCategory);
  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
};
