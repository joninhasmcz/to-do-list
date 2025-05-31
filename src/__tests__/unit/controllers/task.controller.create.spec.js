
class TaskController {
    constructor(createTaskUseCase) {
        this.createTaskUseCase = createTaskUseCase;
    }

    async create(req, res) {
        try {
            const task = await this.createTaskUseCase.execute(req.body);
            res.status(201).json(task);
        } catch(err) {
            res.status(400).json({
                error: err.message
            })
        }
    }
}

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
            createdTask
        )
    })
    test('Should return 400 if task is not created', async () => {
        const error = new Error('Task already exists')
        mockUseCase.execute.mockRejectedValue(error)
    })

})