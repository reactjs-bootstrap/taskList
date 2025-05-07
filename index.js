const express = require("express");
const mongoose = require("mongoose");
const Tasks = require("./models/Tasks");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

// const url = process.env.mongodbConnection;
// "mongodb+srv://bhargavkachhadiya1988:12345@bhargav.cmoi6kt.mongodb.net/taskList?retryWrites=true&w=majority&appName=bhargav";

mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.mongodbConnection)
  .then(() => {
    console.log("Connected Successfully");
  })
  .catch((err) => console.log(err));

app.get("/", async (req, res) => {
  const task = await Tasks.find();
  res.send(task);
});

app.get("/:id", async (req, res) => {
  const reqId = req.params.id;
  const task = await Tasks.findOne({ _id: reqId });
  res.send(task);
});

app.post("/", async (req, res) => {
  const task = await Tasks.create(req.body);
  res.send(task);
});

app.put("/:id", async (req, res) => {
  const reqId = req.params.id;
  const task = await Tasks.findOneAndUpdate(
    { _id: reqId },
    { taskName: req.body.task, status: req.body.status }
  );
  res.send(task);
});

app.delete("/:id", async (req, res) => {
  const reqId = req.params.id;
  const task = await Tasks.findByIdAndDelete({ _id: reqId });
  res.send(task);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on PORT NO : ${PORT}`);
});
