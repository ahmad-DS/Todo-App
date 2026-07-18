import TodosModel from "../Models/todos.model.js";

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

const TodoRepository = {
  findByUserId,
  countByUserId,
  create,
  update,
  remove,
};

export default TodoRepository;
