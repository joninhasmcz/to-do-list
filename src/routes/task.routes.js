const express = require('express')
const router = express.Router()

const TaskController = require('../controllers/TaskController')
const CreateTaskUseCase = require('../useCase/CreateTaskUseCase')
const TaskRepository = require('../repositories/mongoose/task.repository.mongoose')
const Task = require('../models/mongoose/Task')

const taskRepository = new TaskRepository(Task)
const createTaskUseCase = new CreateTaskUseCase(taskRepository)
const taskController = new TaskController(createTaskUseCase)

router.post('/', (req, res) => taskController.create(req, res))
module.exports = router