const TodosModel = require("../Models/todos.model");

const findByUserId = async (userId) => {
  return TodosModel.find({ userId });
};

const countByUserId = async (userId) => {
  return TodosModel.countDocuments({ userId });
};

const create = async (todoData) => {
  return TodosModel.create(todoData);
};

const update = async (todoId, userId, todoData) => {
  return TodosModel.findOneAndUpdate(
    {
      _id: todoId,
      userId,
    },
    {
      $set: todoData,
    },
    {
      new: true,
    },
  );
};

const remove = async (todoId, userId) => {
  return TodosModel.findOneAndDelete({
    _id: todoId,
    userId,
  });
};

module.exports = {
  findByUserId,
  countByUserId,
  create,
  update,
  remove,
};
