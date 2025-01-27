const Task = require("../model/Task");


exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find().populate("employee", "empId fullName");
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks", error });
  }
};


exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const { status, review } = req.body;

  try {  const task = await Task.findById(id, { status, review }, { new: true });
    console.log(task);
   
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    
    task.status = status;
    task.review = review;
    await task.save(); 

    res.status(200).json({ message: "Task updated successfully", task });
  } catch (error) {
    res.status(500).json({ message: "Error updating task", error });
  }
};



exports.deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findByIdAndDelete(id);

    if (!task) return res.status(404).json({ message: "Task not found" });

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting task", error });
  }
};
