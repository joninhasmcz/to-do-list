const knex = require('../../../config/knex.db.config');
const TaskRepository = require('../../../repositories/knex/task.repository.knex');



describe('TaskRepository (Knex)', () => {
    let repo;

    beforeAll(async () => {
        // Limpa antes dos testes começarem
        await knex('tasks').del();
        repo = new TaskRepository();
    });

    afterAll(async () => {
        // Fecha as conexões do knex no fim dos testes
        await knex.destroy();
    });

    beforeEach(async () => {
        // Limpa antes de cada teste para isolar os resultados
        await knex('tasks').del();
    });

    test('deve criar uma task', async () => {
        const data = { name: 'Task 1', status: 'pendente', description: 'Desc 1' };
        const task = await repo.create(data);

        expect(task).toMatchObject({
            name: 'Task 1',
            status: 'pendente',
            description: 'Desc 1'
        });
        expect(task).toHaveProperty('id');
        expect(task).toHaveProperty('created_at');
    });

    test('deve retornar todas as tasks', async () => {
        await repo.create({ name: 'A', status: 'pendente' });
        await repo.create({ name: 'B', status: 'pendente' });

        const tasks = await repo.findAll();
        expect(tasks.length).toBe(2);
        expect(tasks.map(t => t.name)).toEqual(expect.arrayContaining(['A', 'B']));
    });

    test('deve retornar task pelo nome', async () => {
        await repo.create({ name: 'Z', status: 'pendente' });
        const task = await repo.findByName('Z');
        expect(task).toBeDefined();
        expect(task.name).toBe('Z');
    });

    test('deve deletar pelo nome', async () => {
        await repo.create({ name: 'W', status: 'pendente' });
        const deleted = await repo.deleteByName('W');
        expect(deleted.name).toBe('W');
        const task = await repo.findByName('W');
        expect(task).toBeUndefined();
    });
});
