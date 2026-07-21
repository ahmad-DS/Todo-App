import { Router } from "express";
import TodoController from "../controllers/todo.controller.js";

const router = Router();

router.get("/", TodoController.getUserTodos);
router.post("/create", TodoController.createUserTodo);
router.patch("/:todoId", TodoController.updateTodoById);
router.delete("/:todoId", TodoController.deleteTodoById);

export default router;