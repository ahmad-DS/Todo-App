import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    status: { type: Boolean, default: false },
    userId: { type: String, required: true },
  },
  {
    versionKey: false,
  },
);

const TodosModel = mongoose.model("note", noteSchema);

export default TodosModel;