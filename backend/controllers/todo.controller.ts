import { Request, Response } from "express";
import { todoService } from "../container/container.js";

export const getUserTodos = async (req: Request, res: Response) => {
  try {
    const todos = await todoService.getUserTodos(req.body.userId);

    res.status(200).json({
      data: todos,
    });
  } catch (err: any) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const createUserTodo = async (req: Request, res: Response) => {
  try {
    const todo = await todoService.createUserTodo(req.body);

    res.status(201).json({
      message: "Todo created successfully",
      data: todo,
    });
  } catch (err: any) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const updateTodoById = async (req: Request, res: Response) => {
  try {
    const updatedTodo = await todoService.updateUserTodo(req.params.todoId as string, req.body);

    res.status(200).json({
      message: "Todo updated successfully",
      data: updatedTodo,
    });
  } catch (err: any) {
    res.status(404).json({
      message: err.message,
    });
  }
};

export const deleteTodoById = async (req: Request, res: Response) => {
  try {
    const todoId = req.params.todoId;
    const { userId } = req.body;
    await todoService.deleteUserTodo(todoId as string, userId);

    res.status(200).json({
      message: "Todo deleted succesfully",
    });
  } catch (error: any) {
    res.status(404).json({
      message: error.message,
    });
  }
};

const TodoController = {
  getUserTodos,
  createUserTodo,
  updateTodoById,
  deleteTodoById,
};

export default TodoController;
