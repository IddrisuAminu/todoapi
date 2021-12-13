import express from "express";
import doetnv from "dotenv";
import { connectDB } from "./db/connectdb.js";
import { Todo } from "./schema/todoSchema.js";
import cors from "cors";
doetnv.config();

const app = express();
const Port = process.env.PORT || 600;
app.use (cors())
connectDB();
//home route
app.get("/", (req, res) => {
  res.send("<h1> THIS IS  MY TODO APP</H1>");
});
app.use(express.json());

// post data
app.post("/todos", async (req, res) => {
  const { title, discription, date_time } = req.body;

  const todo = await Todo.create({
    title,
    discription,
    date_time,
  });
  if (todo) {
    return res.status(200).json({
      success: true,
      data: todo,
      message: "todo created",
    });
  } else
    return res.status(400).json({
      success: false,
      message: "todo not created",
    });
});

//get rout for retrieving all todo

app.get("/todos", async (req, res) => {
  const todo = await Todo.find();
  if (todo) {
    return res.status(200).json({
      success: true,
      data: todo,
      message: "todo  retrieve ",
    });
  } else
    return res.status(500).json({
      success: false,
      message: "todo not retre",
    });
});
//auppdate the todo

app.patch("/todos", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const todo = await Todo.updateOne({ status }).where({ _id: id });
  if (todo) {
    return res.status(200).json({
      success: true,
      data: todo,
      message: "todo updatete successflly",
    });
  } else
    return res.status(400).json({
      success: false,
      message: "todo not updated",
    });
});

//deleted
app.delete("/todos/:id", async (req, res) => {
  const { id } = req.params;
  await Todo.deleteOne({ _id: id });
  return res.status(200).json({
    success: true,
    message: "todo not deleted",
  });
});
app.listen(Port, () => {
  console.log(`server is runing on port  ${Port}`);
});
