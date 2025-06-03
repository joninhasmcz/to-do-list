const Task = require('../../../models/mongoose/Task')
const { MongoMemoryServer } = require('mongodb-memory-server')
const mongoose = require('mongoose')
const TaskRepository = require('../../../repositories/mongoose/task.repository.mongoose')

describe('Create a Task Repository unit test', () => {
  let mongoServer
  let sut

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create()
    const uri = mongoServer.getUri()
    await mongoose.connect(uri)
  })
  afterAll(async () => {
    await mongoose.disconnect()
    await mongoServer.stop()
  })
  beforeEach(async () => {
    sut = new TaskRepository(Task)
    await Task.deleteMany({})
  })
  test('Should create a new task and return it', async () => {
    const data = { name: 'Task 1' }
    const result = await sut.create(data)

    expect(result).toBeDefined()
    expect(result.name).toBe('Task 1')
    expect(result.status).toBe('pendente')
    expect(result.created_at).toBeInstanceOf(Date)
  })
  test('Should return all tasks', async () => {
    const task1 = { name: 'Task 1' }
    const task2 = { name: 'Task 2' }

    await sut.create(task1)
    await sut.create(task2)

    const tasks = await sut.findAll()

    expect(tasks.length).toBe(2)
    expect(tasks.map(t => t.name)).toEqual(expect.arrayContaining([task1.name, task2.name]))
  })
  test('Should find a task by name', async () => {
    const task1 = { name: 'Task 1' }

    await sut.create(task1)

    const task = await sut.findByName('Task 1')

    expect(task).toBeDefined()
    expect(task.name).toBe('Task 1')
    expect(task.status).toBe('pendente')
    expect(task.created_at).toBeInstanceOf(Date)
  })
  test('should return undefined when task not found by name', async () => {
    const result = await sut.findByName('Inexistente')
    expect(result).toBeNull()
  })

  test('should delete a task by name', async () => {
    const task1 = { name: 'Task 1' }

    await sut.create(task1)

    const deleted = await sut.deleteByName('Task 1')
    expect(deleted.name).toBe(task1.name)
    expect(await sut.findAll()).not.toContain(task1)
  })

  test('should return null when trying to delete non-existing task', async () => {
    const deleted = await sut.deleteByName('Nada')
    expect(deleted).toBeNull()
  })
})
