const CreateTaskUseCase = require('../../../useCase/task.usecase.create')
const TaskRepositoryMock = require('../../../utils/task.repository.mock')
const TaskRepository = require('../../../repositories/mongoose/task.repository.mongoose')

describe('CreateTaskUseCase', () => {
    let sut
    beforeEach(() => {
        sut = new CreateTaskUseCase(TaskRepositoryMock)
    })
    test('should create a task', async () => {
        const data = { name: 'Task 1', status: 'pendente'}
        const task = await sut.execute(data)
        expect(task).toEqual({ name: 'Task 1', status: 'pendente' })
    })
    test('should throw an error if task already exists', async () => {
        const data = { name: 'Task 1', status: 'pendente' }
        TaskRepositoryMock.findByName.mockResolvedValue(data);
        await expect(sut.execute(data)).rejects.toThrow('Tarefa já existe');
    })
})