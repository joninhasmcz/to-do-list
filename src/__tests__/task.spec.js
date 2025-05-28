
class Task {
}

class TaskRouter {
    constructor(controller) {
        this.taskController = controller;
    }
}

class TaskController {
    constructor(useCase) {
        this.taskUseCase= useCase;
    }
}

class TaskUseCase{
    constructor(repository) {
        this.taskRepository = repository;
    }
}

class TaskRepository {
    constructor(task) {
        this.task = task;
    }
}

describe('Create a Task Router', () => {
    test('Test if Task is exist', () => {
        const task = new Task();
        expect(task).toBeInstanceOf(Task);
    })
    test('Test if TaskRouter is exist', () => {
        const taskRouter = new TaskRouter();
        expect(taskRouter).toBeInstanceOf(TaskRouter);
    })
    test('Test if TaskController is exist', () => {
        const taskController = new TaskController();
        expect(taskController).toBeInstanceOf(TaskController);
    })
    test('Test if TaskUseCase is exist', () => {
        const taskUseCase = new TaskUseCase();
        expect(taskUseCase).toBeInstanceOf(TaskUseCase);
    })
    test('Test if TaskRepository is exist', () => {
        const taskRepository = new TaskRepository();
        expect(taskRepository).toBeInstanceOf(TaskRepository);
    })
    test('Test if TaskRepository have Task', () => {
        const task = new Task();
        const taskRepository = new TaskRepository(task);

        expect(taskRepository.task).toBeInstanceOf(Task);
    })

    test('Test if TaskUseCase have TaskRepository', () => {
        const taskRepository = new TaskRepository();
        const taskUseCase = new TaskUseCase(taskRepository);

        expect(taskUseCase.taskRepository).toBeInstanceOf(TaskRepository);
    })

    test('Test if TaskController have TaskUseCase', () => {
        const taskUseCase = new TaskUseCase();
        const taskController = new TaskController(taskUseCase);

        expect(taskController.taskUseCase).toBeInstanceOf(TaskUseCase);
    })
    test('Test if TaskRouter have TaskController', () => {
        const taskController = new TaskController();
        const taskRouter = new TaskRouter(taskController);

        expect(taskRouter.taskController).toBeInstanceOf(TaskController);
    })


})