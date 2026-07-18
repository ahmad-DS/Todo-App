const TodosModel = require("../Models/todos.model");
const TodoService = require("../services/todo.service");

const getUserTodos = async (req, res) => {
  try {
    const todos = await TodoService.getUserTodos(req.body.userId);

    res.status(200).json({
      data: todos,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const createUserTodo = async (req, res) => {
  try {
    const todo = await TodoService.createUserTodo(req.body);

    res.status(201).json({
      message: "Todo created successfully",
      data: todo,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const updateTodoById = async (req, res) => {
  try {
    console.log("[controller] body", req.body, typeof req.body)
    const updatedTodo = await TodoService.updateUserTodo(
      req.params.todoId,
      req.body,
    );

    res.status(200).json({
      message: "Todo updated successfully",
      data: updatedTodo,
    });
  } catch (err) {
    res.status(404).json({
      message: err.message,
    });
  }
};

const deleteTodoById = async (req, res) => {
  try {
    const todoId = req.params.todoId;
    const { userId } = req.body;
    await TodoService.deleteUserTodo(todoId, userId);

    res.status(200).json({
      message: "Todo deleted succesfully",
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

module.exports = {
  getUserTodos,
  createUserTodo,
  updateTodoById,
  deleteTodoById,
};
