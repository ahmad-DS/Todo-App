export interface IRepository {
  findByUserId(userId: string): Promise<any[]>;

  countByUserId(userId: string): Promise<number>;

  create(todoData: any): Promise<any>;

  update(
    todoId: string,
    userId: string,
    todoData: any
  ): Promise<any>;

  remove(
    todoId: string,
    userId: string
  ): Promise<any>;
}