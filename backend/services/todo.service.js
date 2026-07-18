const TodosModel = require("../Models/todos.model");
const TodoRepository = require("../repositories/todo.repository");

const getUserTodos = async (userId) => {
  const todos = await TodoRepository.findByUserId(userId);
  //   const todos = await TodosModel.find({ userId });

  return todos;
};

const createUserTodo = async (todoData) => {
  const totalTodos = await TodoRepository.countByUserId(todoData.userId);
  if (totalTodos >= 10) {
    throw new Error("Todo limit exceeded!");
  }

  return await TodoRepository.create(todoData);
};

const updateUserTodo = async (todoId, todoData) => {
  const updatedTodo = await TodoRepository.update(todoId, todoData.userId, todoData)

  if (!updatedTodo) {
    throw new Error("Todo not found");
  }

  return updatedTodo;
};

const deleteUserTodo = async (todoId, userId) => {
  const deletedTodo = await TodoRepository.remove(todoId, userId)
  if (!deletedTodo) {
    throw new Error("Todo not found");
  }

  return deletedTodo;
};

module.exports = {
  getUserTodos,
  createUserTodo,
  updateUserTodo,
  deleteUserTodo,
};
