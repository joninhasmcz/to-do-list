const Task = require('../../../models/sequelize/Task')
const {sequelize} = require("../../../config/sequelize.db.config");
const TaskRepository = require('../../../repositories/sequelize/task.repository.sequelize')

describe('TaskRepository', () => {
    let sut;

    beforeAll(async () => {
        await sequelize.authenticate();
        await sequelize.sync();
        sut = new TaskRepository(Task);
    })

    afterAll(async () => {
        await sequelize.close();
    })

    beforeEach(async () => {
        await Task.destroy({ where: {} });
    })

    test('Should create a task', async () => {
        const task = await sut.create({ name: 'Task 1' });
        expect(task.name).toBe('Task 1');
        expect(task.status).toBe('pendente');
        expect(task.created_at).toBeInstanceOf(Date);
    })
    test('Should return all tasks', async () => {
        const task1 = { name: 'Task 1' };
        const task2 = { name: 'Task 2' };
        await sut.create(task1);
        await sut.create(task2);
        const tasks = await sut.findAll();
        expect(tasks.length).toBe(2);
        expect(tasks.map(t => t.name)).toEqual(expect.arrayContaining([task1.name, task2.name]));
    })
    test('Should find a task by name', async () => {
        const task1 = { name: 'Task 1' };
        await sut.create(task1);
        const task = await sut.findByName('Task 1');
        expect(task).toBeDefined();
        expect(task.name).toBe('Task 1');
        expect(task.status).toBe('pendente');
        expect(task.created_at).toBeInstanceOf(Date);
    })
})