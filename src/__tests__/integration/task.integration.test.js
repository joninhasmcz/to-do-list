
class Task {
}
class TaskRepository {
    constructor(task) {
        this.task = task;
    }
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



describe('Create a Task Router', () => {
    test('Test if Task is exist', () => {
        const sut = new Task();
        expect(sut).toBeInstanceOf(Task);
    })
    test('Test if TaskRouter is exist', () => {
        const sut = new TaskRouter();
        expect(sut).toBeInstanceOf(TaskRouter);
    })
    test('Test if TaskController is exist', () => {
        const sut = new TaskController();
        expect(sut).toBeInstanceOf(TaskController);
    })
    test('Test if TaskUseCase is exist', () => {
        const sut = new TaskUseCase();
        expect(sut).toBeInstanceOf(TaskUseCase);
    })
    test('Test if TaskRepository is exist', () => {
        const sut = new TaskRepository();
        expect(sut).toBeInstanceOf(TaskRepository);
    })
    test('Test if TaskRepository have Task', () => {
        const task = new Task();
        const sut = new TaskRepository(task);

        expect(sut.task).toBeInstanceOf(Task);
    })

    test('Test if TaskUseCase have TaskRepository', () => {
        const taskRepository = new TaskRepository();
        const sut = new TaskUseCase(taskRepository);

        expect(sut.taskRepository).toBeInstanceOf(TaskRepository);
    })

    test('Test if TaskController have TaskUseCase', () => {
        const taskUseCase = new TaskUseCase();
        const sut = new TaskController(taskUseCase);

        expect(sut.taskUseCase).toBeInstanceOf(TaskUseCase);
    })
    test('Test if TaskRouter have TaskController', () => {
        const taskController = new TaskController();
        const taskRouter = new TaskRouter(taskController);

        expect(taskRouter.taskController).toBeInstanceOf(TaskController);
    })


})