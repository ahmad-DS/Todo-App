const router = require("express").Router();
const TodoController = require("../controllers/todo.controller");

router.get("/", TodoController.getUserTodos);

router.post("/create", TodoController.createUserTodo);

router.patch("/:todoId", TodoController.updateTodoById);

router.delete("/:todoId", TodoController.deleteTodoById);

module.exports = router;