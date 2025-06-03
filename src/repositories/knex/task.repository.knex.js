const ITaskRepository = require("../../contracts/repositories/interface.task.repository");
const knex = require("../../config/knex.db.config");

module.exports = class TaskRepository extends ITaskRepository {
    constructor() {
        super();
        this.table = 'tasks';
    }

    async create(data) {
        // Retorna o objeto criado, já que Knex retorna array com o registro
        const [task] = await knex(this.table)
            .insert(data)
            .returning(['id', 'name', 'status', 'description', 'created_at']);
        return task;
    }

    async findAll() {
        return await knex(this.table).select('*');
    }

    async findByName(name) {
        return await knex(this.table).where({ name }).first();
    }

    async deleteByName(name) {
        // Retorna o item deletado
        const deleted = await knex(this.table)
            .where({ name })
            .del()
            .returning(['id', 'name', 'status', 'description', 'created_at']);
        return deleted[0] || null;
    }
}
