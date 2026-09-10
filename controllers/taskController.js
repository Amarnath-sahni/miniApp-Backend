const Task = require("../models/Task");

const formatTask = (task) => ({
  id: task._id.toString(),
  title: task.title,
  status: task.status,
  created_at: task.created_at.toISOString(),
});

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ created_at: -1 });

    res.status(200).json(tasks.map(formatTask));
  } catch (error) {
    console.error("Get tasks error:", error);

    res.status(500).json({
      message: "Failed to fetch tasks",
    });
  }
};

const createTask = async (req, res) => {
  try {
    const { title, status } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({
        message: "Task title is required",
      });
    }

    const task = await Task.create({
      title: title.trim(),
      status: status || "todo",
    });

    res.status(201).json(formatTask(task));
  } catch (error) {
    console.error("Create task error:", error);

    res.status(500).json({
      message: "Failed to create task",
    });
  }
};

const updateTaskStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["todo", "in-progress", "done"].includes(status)) {
      return res.status(400).json({
        message: "Invalid status",
      });
    }

    const task = await Task.findByIdAndUpdate(
      id,
      { status },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.status(200).json(formatTask(task));
  } catch (error) {
    console.error("Update task error:", error);

    res.status(500).json({
      message: "Failed to update task",
    });
  }
};

module.exports = {
  getTasks,
  createTask,
  updateTaskStatus,
};
