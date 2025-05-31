const TaskController = require('../../../controllers/TaskController')
const httpResponse = require('../../../utils/helpers/http-response')


describe('Create a Task Controller', () => {
    beforeEach(() => {
        mockUseCase = {
            execute: jest.fn()
        }
        sut = new TaskController(mockUseCase)
        mockReq = {
            body: {
                name: 'Task 1',
            }
        }
        mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
    })
    test('Should return 201 if task is created', async () => {
        const createdTask = {
            name: 'Task 1',
        }
        mockUseCase.execute.mockResolvedValue(createdTask)

        await sut.create(mockReq, mockRes)

        expect(mockUseCase.execute).toHaveBeenCalledWith(
            mockReq.body
        )
        expect(mockRes.status).toHaveBeenCalledWith(201)
        expect(mockRes.json).toHaveBeenCalledWith(
            httpResponse.created(createdTask)
        )
    })
    test('Should return 400 if task is not created', async () => {
        const error = new Error('Task already exists')
        mockUseCase.execute.mockRejectedValue(error)
    })

})