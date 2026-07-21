class TodoService {
    constructor(repository) {
        this.repository = repository;
    }
    async getUserTodos(userId) {
        const todos = await this.repository.findByUserId(userId);
        return todos;
    }
    async createUserTodo(todoData) {
        const totalTodos = await this.repository.countByUserId(todoData.userId);
        if (totalTodos >= 10) {
            throw new Error("Todo limit exceeded!");
        }
        return await this.repository.create(todoData);
    }
    async updateUserTodo(todoId, todoData) {
        const updatedTodo = await this.repository.update(todoId, todoData.userId, todoData);
        if (!updatedTodo) {
            throw new Error("Todo not found");
        }
        return updatedTodo;
    }
    async deleteUserTodo(todoId, userId) {
        const deletedTodo = await this.repository.remove(todoId, userId);
        if (!deletedTodo) {
            throw new Error("Todo not found");
        }
        return deletedTodo;
    }
}
export default TodoService;
