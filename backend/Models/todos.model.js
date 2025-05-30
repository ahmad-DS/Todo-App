const mongoose = require("mongoose");

const noteSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    status: { type: Boolean, default: false },
    userId: { type: String, required: true },
    isUrgent: { type: Boolean, default: false },
    isImportant: { type: Boolean, default: false },
    description: { type: String },
    dueDate: { type: Date },
  },
  {
    versionKey: false,
  }
);

const TodosModel = mongoose.model("note", noteSchema);

module.exports = TodosModel;