import Task from "../model/taskSchema.js";
import User from "../model/userSchema.js";

export const createTask = async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: "Error creating task" });
  }
};

export const getAllTasks = async (req, res) => {
  try {
    let tasks;
    if (req.user.userRole === "admin") {
      tasks = await Task.find().sort({ createdAt: -1 });
    }
    if (req.user.userRole === "manager") {
      const agentIds = await User.find({
        manager: { $in: req.user.id },
      }).select("_id");
      tasks = await Task.find({
        $or: [{ assignee: { $in: agentIds } }, { assignee: req.user.id }],
      }).sort({ createdAt: -1 });
      // OR
      // await agentIds.push({ _id: req.user.id });
      // tasks = await Task.find({
      //   assignee: { $in: agentIds },
      // }).sort({ createdAt: -1 });
    }
    if (req.user.userRole === "agent") {
      tasks = await Task.find({
        assignee: req.user.id,
      }).sort({ createdAt: -1 });
    }
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: "Error fetching task" });
  }
};

export const updateTask = async (request, response) => {
  try {
    const taskId = request.params.id;
    const { assignee } = request.body;
    const userId = request.user._id;
    if (
      request.user.userRole === "admin" ||
      request.user.userRole === "manager" ||
      userId.equals(assignee)
    ) {
      const updatedTask = await Task.findOneAndUpdate(
        { _id: taskId },
        { ...request.body },
        {
          new: true,
        }
      );
      if (updatedTask) {
        return response.status(200).json(updatedTask);
      }
    } else {
      return response.status(404).json({ error: "Task not updated" });
    }
  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const task = await Task.findByIdAndDelete(taskId);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting task" });
  }
};
