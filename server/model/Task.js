const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  },
  taskDescription: { type: String, required: true },
  startDate: { type: Date, required: true },
  dueDate: { type: Date, required: true },
  status: { type: String, enum: ["Pending", "In Progress", "Completed"], default: "Pending" },
  review: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Task", taskSchema);


