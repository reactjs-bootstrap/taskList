const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  taskName: String,
  status: String,
});
const TaskModel = mongoose.models.tasks || mongoose.model("tasks", TaskSchema);
module.exports = TaskModel;
