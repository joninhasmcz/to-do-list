class CreateTaskUseCase {
    constructor(taskRepository) {
        this.taskRepository = taskRepository
    }
    async execute(data) {
        const exists = await this.taskRepository.findByName(data.name)
        if (exists) {
            throw new Error('Tarefa já existe')
        }
        return this.taskRepository.create(data)
    }
}

module.exports = CreateTaskUseCase