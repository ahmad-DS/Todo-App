import TodoRepository from "../repositories/todo.repository.js";

const getUserTodos = async (userId) => {
  const todos = await TodoRepository.findByUserId(userId);
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
  const updatedTodo = await TodoRepository.update(todoId, todoData.userId, todoData);

  if (!updatedTodo) {
    throw new Error("Todo not found");
  }

  return updatedTodo;
};

const deleteUserTodo = async (todoId, userId) => {
  const deletedTodo = await TodoRepository.remove(todoId, userId);
  if (!deletedTodo) {
    throw new Error("Todo not found");
  }

  return deletedTodo;
};

const TodoService = {
  getUserTodos,
  createUserTodo,
  updateUserTodo,
  deleteUserTodo,
};

export default TodoService;
