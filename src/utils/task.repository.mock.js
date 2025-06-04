TaskRepository = {
    create: jest.fn().mockResolvedValue({ name: 'Task 1', status: 'pendente' }),
    findByName: jest.fn().mockResolvedValue(null),
    findAll: jest.fn().mockResolvedValue([{ name: 'Task 1', status: 'pendente' }, { name: 'Task 2', status: 'pendente' }]),
}
module.exports = TaskRepository