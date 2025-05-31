const request = require('supertest')
const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')
const app = require('../../app')
const Task = require('../../models/mongoose/Task')

let mongoServer

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create()
    await mongoose.connect(mongoServer.getUri(), {
    })
})

afterAll(async () => {
    await mongoose.disconnect()
    await mongoServer.stop()
})

beforeEach(async () => {
    await Task.deleteMany({})
})

describe('Task routes', () => {
    test('Should create a new task with POST /api/tasks', async () => {
        const data = { name: 'Task 1' }
        const res = await request(app)
            .post('/api/tasks')
            .send(data)

        expect(res.statusCode).toBe(201)
        expect(res.body.data).toMatchObject({
            name: 'Task 1',
            status: 'pendente',
        })
    })
    test('Should return error if miss data', async () => {
        const res = await request(app)
            .post('/api/tasks')
            .send({})
        expect(res.statusCode).toBe(400)
    })

})