const httpResponse = require('../utils/helpers/http-response')

module.exports = class TaskController {
    constructor(createTaskUseCase) {
        this.createTaskUseCase = createTaskUseCase;
    }

    async create(req, res) {
        try {
            const task = await this.createTaskUseCase.execute(req.body);
            res.status(201).json(
                httpResponse.created(task)
            );

        } catch(err) {
            res.status(400).json(
                httpResponse.badRequest(err.message)
            )
        }
    }
}