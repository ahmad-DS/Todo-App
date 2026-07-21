import TodoService from "../services/todo.service.js";
import { MongoRepository } from "../repositories/mongoRepository.js";

const todoRepository = new MongoRepository();

const todoService = new TodoService(todoRepository);

export { todoService };