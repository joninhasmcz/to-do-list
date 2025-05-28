const Task = require('../../models/Task');

describe('Task model - Unit Test', () => {
    test('should create a task with correct fields', () => {
        const sut = new Task({ name: 'Estudar Clean Architecture' });

        expect(sut.name).toBe('Estudar Clean Architecture');
        expect(sut.status).toBe('pendente');
        expect(sut.createdAt).toBeInstanceOf(Date);
    });
    test('should throw validation error if name is missing', async () => {
        const sut = new Task({});

        try {
            await sut.validate();
        } catch (error) {
            expect(error).toBeInstanceOf(mongoose.Error.ValidationError);
            expect(error.errors.name).toBeDefined();
            expect(error.errors.name.kind).toBe('required');
        }
    });

})