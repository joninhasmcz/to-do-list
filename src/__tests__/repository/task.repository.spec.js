class Task {
    constructor(name) {
        this.name = name;
    }
}

class TaskRepository {
    constructor() {
        this.tasks = []; // Simula o banco
    }

    create(task) {
        this.tasks.push(task);
        return task;
    }

    findAll() {
        return this.tasks;
    }

    findByName(name) {
        return this.tasks.find(task => task.name === name);
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
   let sut;

   beforeEach(() => {
       sut = new TaskRepository();
   })
    test('Should create a new task and return it', () => {
        const task = new Task('Task 1');
        const result = sut.create(task);

        expect(result).toBe(task);
        expect(sut.findAll()).toContain(task);
    })
    test('Should return all tasks', () => {
        const task1 = new Task('Task 1');
        const task2 = new Task('Task 2');
        const task3 = new Task('Task 3');

        sut.create(task1);
        sut.create(task2);
        sut.create(task3);

        const tasks = sut.findAll();
        expect(tasks.length).toBe(3);
        expect(tasks).toContain(task1);
        expect(tasks).toContain(task2);
        expect(tasks).toContain(task3);
    })
    test('Should find a task by name', () => {
        const task1 = new Task('Task 1');

        sut.create(task1);

        const found = sut.findByName('Task 1');
        expect(found).toBe(task1);
    })
    test('should return undefined when task not found by name', () => {
        const result = sut.findByName('Inexistente');
        expect(result).toBeUndefined();
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
