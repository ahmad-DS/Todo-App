import TodosModel from "../Models/todos.model.js";
export class MongoRepository {
    async findByUserId(userId) {
        return TodosModel.find({ userId });
    }
    async countByUserId(userId) {
        return TodosModel.countDocuments({ userId });
    }
    async create(todoData) {
        return TodosModel.create(todoData);
    }
    async update(todoId, userId, todoData) {
        return TodosModel.findOneAndUpdate({
            _id: todoId,
            userId,
        }, {
            $set: todoData,
        }, {
            new: true,
        });
    }
    async remove(todoId, userId) {
        return TodosModel.findOneAndDelete({
            _id: todoId,
            userId,
        });
    }
}
