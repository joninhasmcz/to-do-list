const CreateTaskUseCase = require('../../../useCase/task.usecase.create')

describe('CreateTaskUseCase', () => {
    let sut
    let taskRepository

    beforeEach(() => {
        taskRepository = {
            create: jest.fn().mockResolvedValue({ name: 'Task 1', status: 'pendente' }),
            findByName: jest.fn().mockResolvedValue(null),
            findAll: jest.fn().mockResolvedValue([]),
        }
        sut = new CreateTaskUseCase(taskRepository)
    })
    test('should create a task', async () => {
        const data = { name: 'Task 1', status: 'pendente'}
        const taskFinded = await taskRepository.findByName(data.name)

        expect(taskFinded).toBeNull()

        const task = await sut.execute(data)
        expect(task).toEqual({ name: 'Task 1', status: 'pendente' })
    })
    test('should throw an error if task already exists', async () => {
        const data = { name: 'Task 1', status: 'pendente' }
        taskRepository.findByName.mockResolvedValueOnce({ name: 'Task 1' })

        await expect(sut.execute(data)).rejects.toThrow('Tarefa já existe')
        expect(taskRepository.create).not.toHaveBeenCalled()
    })
})