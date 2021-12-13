import mongoose from "mongoose";
const { Schema, model } = mongoose;
const todoSchema = new Schema({
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },

  status: {
    type: Boolean,
    default: false,
    require: true,
  },
  date_time: {
    type: String,
    require: true,
  },
});

const Todo = model("Todo ", todoSchema);
export { Todo };
