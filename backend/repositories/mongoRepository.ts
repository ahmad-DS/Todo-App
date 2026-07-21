import { IRepository } from "./IRepository.js";
import TodosModel from "../Models/todos.model.js";

export class MongoRepository implements IRepository {
  async findByUserId(userId: string) {
    return TodosModel.find({ userId });
  }

  async countByUserId(userId: string) {
    return TodosModel.countDocuments({ userId });
  }

  async create(todoData: any) {
    return TodosModel.create(todoData);
  }

  async update(todoId: string, userId: string, todoData: any) {
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
  }

  async remove(todoId: string, userId: string) {
    return TodosModel.findOneAndDelete({
      _id: todoId,
      userId,
    });
  }
}
