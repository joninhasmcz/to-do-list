const TaskRepositoryMock = require('../../../utils/task.repository.mock')

class ListTaskUseCase {
    constructor(taskRepository) {
        this.taskRepository = taskRepository
    }
    async execute() {
        return await this.taskRepository.findAll()
    }
}

describe('Task Usecase List', () => {
    let sut

    beforeEach(() => {
        sut = new ListTaskUseCase(TaskRepositoryMock)
    })
    test('ListTaskUseCase returns all items if taskRepository is provided', async () => {
        const response = await sut.execute()
        expect(response).toStrictEqual([{ name: 'Task 1', status: 'pendente' }, { name: 'Task 2', status: 'pendente' }])
    })

})