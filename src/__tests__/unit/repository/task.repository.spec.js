const Task = require('../../../models/Task');
const {MongoMemoryServer} = require("mongodb-memory-server");
const mongoose = require("mongoose");


class TaskRepository {
    constructor(taskModel) {
        this.taskModel = taskModel;
    }

    async create(data) {
        const task = await this.taskModel.create(data);
        return task;
    }

    async findAll() {
        return await this.taskModel.find();
    }

    async findByName(name) {
        return await this.taskModel.findOne({ name })
    }

    deleteByName(name) {
        const index = this.tasks.findIndex(task => task.name === name);
        if (index > -1) {
            return this.tasks.splice(index, 1)[0];
        }
        return null;
    }
}

describe('Create a Task Repository unit test', () => {

    let mongoServer;
    let sut;

    beforeAll(async () => {
        mongoServer = await MongoMemoryServer.create();
        const uri = mongoServer.getUri();
        await mongoose.connect(uri);
    })
    afterAll(async () => {
        await mongoose.disconnect();
        await mongoServer.stop();
    })
    beforeEach(async () => {
        sut = new TaskRepository(Task);
        await Task.deleteMany({});
    })
    test('Should create a new task and return it', async () => {
        const data = { name: 'Task 1'}
        const result = await sut.create(data);

        expect(result).toBeDefined();
        expect(result.name).toBe('Task 1');
        expect(result.status).toBe('pendente');
        expect(result.created_at).toBeInstanceOf(Date);
    })
    test('Should return all tasks', async () => {
        const task1 = {name: 'Task 1'};
        const task2 = {name: 'Task 2'};

        await sut.create(task1);
        await sut.create(task2);

        const tasks = await sut.findAll();

        expect(tasks.length).toBe(2);
        expect(tasks.map(t => t.name)).toEqual(expect.arrayContaining([task1.name, task2.name]))
    })
    test('Should find a task by name', async () => {
        const task1 = {name: 'Task 1'};

        await sut.create(task1);

        const task = await sut.findByName('Task 1');

        expect(task).toBeDefined();
        expect(task.name).toBe('Task 1');
        expect(task.status).toBe('pendente');
        expect(task.created_at).toBeInstanceOf(Date);
    })
    test('should return undefined when task not found by name', () => {
        const result = sut.findByName('Inexistente');
        expect(result).toBeNull();
    });

    test('should delete a task by name', () => {
        const task = new Task('Apagar');
        sut.create(task);

        const deleted = sut.deleteByName('Apagar');
        expect(deleted).toBe(task);
        expect(sut.findAll()).not.toContain(task);
    });

    test('should return null when trying to delete non-existing task', () => {
        const deleted = sut.deleteByName('Nada');
        expect(deleted).toBeNull();
    });
})
