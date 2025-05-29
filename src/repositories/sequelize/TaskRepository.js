const ITaskRepository = require("../../contracts/repositories/ITaskRepository");

class TaskRepository extends ITaskRepository {
    constructor(taskModel) {
        super();
        this.taskModel = taskModel;
    }

    async create(data) {
        return await this.taskModel.create(data);
    }

    async findAll() {
        return await this.taskModel.findAll();
    }

    async findByName(name) {
        return await this.taskModel.findOne({where: {name}});
    }

    async deleteByName(name) {
        const task = await this.taskModel.findByName(name);
        if (!task) return null;
        await task.destroy();
        return task;
    }
}

module.exports = TaskRepository;