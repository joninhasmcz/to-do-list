const {sequelize} = require('../../../config/sequelize.db.config');
const Task = require('../../../models/sequelize/Task');


describe('TaskModel - Sequelize', () => {
    beforeAll(async () => {
        await sequelize.authenticate();
        await sequelize.sync();
    });

    afterAll(async () => {
        await sequelize.close();
    });

    test('deve criar uma tarefa com sucesso', async () => {
        const task = await Task.create({ name: 'Tarefa Sequelize' });

        expect(task.name).toBe('Tarefa Sequelize');
        expect(task.status).toBe('pendente');
        expect(task.created_at).toBeInstanceOf(Date);
    });

    test('deve falhar se o nome for nulo', async () => {
        try {
            await Task.create({});
        } catch (error) {
            expect(error.name).toBe('SequelizeValidationError');
        }
    });
});
