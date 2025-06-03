const ITaskRepository = require('../../contracts/repositories/interface.task.repository')

class TaskRepositoryMongoose extends ITaskRepository {
  constructor (taskModel) {
    super()
    this.taskModel = taskModel
  }

  async create (data) {
    const task = await this.taskModel.create(data)
    return task
  }

  async findAll () {
    return await this.taskModel.find()
  }

  async findByName (name) {
    return await this.taskModel.findOne({ name })
  }

  async deleteByName (name) {
    return await this.taskModel.findOneAndDelete({ name })
  }
}

module.exports = TaskRepositoryMongoose
